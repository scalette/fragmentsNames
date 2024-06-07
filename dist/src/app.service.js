"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const node_html_parser_1 = require("node-html-parser");
const typeorm_1 = require("typeorm");
const nestjs_telegram_1 = require("nestjs-telegram");
const googleTrends = require('google-trends-api');
let AppService = class AppService {
    constructor(httpService, telegram, dataRepository) {
        this.httpService = httpService;
        this.telegram = telegram;
        this.dataRepository = dataRepository;
    }
    async getInteresRate(name) {
        console.log(name);
        try {
            const interestData = await googleTrends.interestOverTime({ keyword: name });
            const interestDataParsed = JSON.parse(interestData);
            const timelineData = interestDataParsed.default?.timelineData;
            if (timelineData.length && timelineData.length > 0) {
                return timelineData.reduce((accumulator, currentValue) => accumulator + currentValue.value[0], 0) / timelineData.length;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            console.log(error);
            return 'NaN';
        }
    }
    async getHello() {
        const dataNames = [];
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://fragment.com/?sort=listed&filter=sale')
            .pipe((0, rxjs_1.catchError)((error) => {
            console.log(error.response.data);
            throw 'An error happened!';
        })));
        const parsed = (0, node_html_parser_1.parse)(data);
        const existingNames = await this.dataRepository.find({
            order: {
                id: 'DESC',
            },
            take: 60,
        });
        const fullArrNames = existingNames.flatMap(el => el.stringc.split('|'));
        const res = parsed.querySelectorAll('.thin-last-col > .table-cell').slice(0, 50).map(el => {
            const name = el.rawAttrs.split('/username/')[1].split('"')[0];
            if (fullArrNames.includes(name)) {
                return false;
            }
            else {
                dataNames.push(name);
                return ({
                    name,
                    price: el.childNodes[1].childNodes[0]._rawText,
                    time: el.childNodes[3].childNodes[0].childNodes[0].childNodes[0].childNodes[0].rawAttrs.split('data-relative="')[1].split('"')[0]
                });
            }
        }).filter(Boolean);
        const promises = res.map(async (el) => {
            return {
                ...el,
                interesRate: await this.getInteresRate(el.name)
            };
        });
        const promisedAll = await Promise.all(promises);
        await this.telegram.getMe().toPromise();
        for (const iterator of promisedAll) {
            await this.telegram.sendMessage({ text: `${iterator.name} {price: ${iterator.price.replace(',', '')}, uniqness: ${Math.round(+iterator.interesRate)}}`,
                chat_id: '-1002217726000',
            }).toPromise();
        }
        if (dataNames.length > 0) {
            await this.dataRepository.save({ stringc: dataNames.join('|') });
        }
        return { message: 'success' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('DATA_REPOSITORY')),
    __metadata("design:paramtypes", [axios_1.HttpService,
        nestjs_telegram_1.TelegramService,
        typeorm_1.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map