import { Module } from '@nestjs/common';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { HelloTaskListeners } from './jobs/hello.listeners';
import { HelloTask, HelloTask2 } from './jobs/hello.task';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getGraphileWorkerConfig } from 'configs/graphileWorker.config';
import { TelegramModule } from 'nestjs-telegram';
import { HttpModule } from '@nestjs/axios';
import { PostgresModule } from 'src/postgres/postgres.module';
import { dataProviders } from 'src/postgres/dataEntity/data.providers';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        PostgresModule,
        TelegramModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              botKey: configService.get('Telegram_API_Key')
            }),
            inject: [ConfigService]
          }),
        GraphileWorkerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getGraphileWorkerConfig,
        }),
    ],
    providers: [HelloTask, HelloTask2, HelloTaskListeners, ...dataProviders]
})
export class GraphileModule { }
