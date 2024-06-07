"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const postgres_module_1 = require("./postgres/postgres.module");
const data_providers_1 = require("./postgres/dataEntity/data.providers");
const config_1 = require("@nestjs/config");
const nestjs_telegram_1 = require("nestjs-telegram");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            nestjs_telegram_1.TelegramModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    botKey: 'Telegram_API_Key'
                }),
                inject: [config_1.ConfigService]
            }),
            postgres_module_1.PostgresModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...data_providers_1.dataProviders],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map