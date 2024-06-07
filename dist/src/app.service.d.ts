import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { TelegramService } from 'nestjs-telegram';
import { Data } from 'src/postgres/dataEntity/data.entity';
export declare class AppService {
    private readonly httpService;
    private readonly telegram;
    private dataRepository;
    constructor(httpService: HttpService, telegram: TelegramService, dataRepository: Repository<Data>);
    getInteresRate(name: string): Promise<any>;
    getHello(): Promise<any>;
}
