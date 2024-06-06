import { Injectable, Logger, Inject } from '@nestjs/common';
import { Helpers } from 'graphile-worker';
import { Task, TaskHandler } from 'nestjs-graphile-worker';
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs';
import { parse } from 'node-html-parser';
import { Repository } from 'typeorm';
import { TelegramService } from 'nestjs-telegram';
import { Data } from 'src/postgres/dataEntity/data.entity';
const googleTrends = require('google-trends-api')

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly telegram: TelegramService,
    @Inject('DATA_REPOSITORY')
    private dataRepository: Repository<Data>,
  ) {}

  async getInteresRate(name: string): Promise<any> {
    console.log(name)
    try{
      const interestData = await googleTrends.interestOverTime({keyword: name})
      const interestDataParsed = JSON.parse(interestData)
      const timelineData = interestDataParsed.default?.timelineData
      if (timelineData.length && timelineData.length > 0) {
        return timelineData.reduce( (accumulator, currentValue) => accumulator + currentValue.value[0], 0 ) / timelineData.length;
      } else {
        return 0
      }
    } catch (error) {
      console.log(error)
      return 'NaN'
    }
  }

  async getHello(): Promise<any> {
    const dataNames = []
    const { data } = await firstValueFrom(
      this.httpService.get<any>('https://fragment.com/?sort=listed&filter=sale')
        .pipe(
          catchError((error: any) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        )
    );
  
    const parsed = parse(data);
    const existingNames = await this.dataRepository.find({
      order: {
        id: 'DESC',
      },
      take: 60,
    })
    const fullArrNames = existingNames.flatMap(el => el.stringc.split('|'))
    const res = parsed.querySelectorAll('.thin-last-col > .table-cell').slice(0, 50).map(el => {
      const name = el.rawAttrs.split('/username/')[1].split('"')[0]
      if (fullArrNames.includes(name)) {
        return false
      } else {
        dataNames.push(name)
        return ({
            name,
            //@ts-ignore
            price: el.childNodes[1].childNodes[0]._rawText,
            //@ts-ignore
            time: el.childNodes[3].childNodes[0].childNodes[0].childNodes[0].childNodes[0].rawAttrs.split('data-relative="')[1].split('"')[0]
        })
      }}).filter(Boolean);

    const promises = res.map(async el => {
      return {
        ...el,
        //@ts-ignore
        interesRate:  await this.getInteresRate(el.name)
      }
    })
    
    const promisedAll = await Promise.all(promises);
    await this.telegram.getMe().toPromise()
    for (const iterator of promisedAll) {
      await this.telegram.sendMessage({text: `${iterator.name} {price: ${iterator.price.replace(',', '')}, uniqness: ${Math.round(+iterator.interesRate)}}`,
        chat_id: '-1002217726000', 
      }).toPromise()
    }
    if(dataNames.length > 0) {
      this.dataRepository.save({stringc: dataNames.join('|')})
    }
    return {message: 'success'};
  }
}
