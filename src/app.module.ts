import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { dataProviders } from './postgres/dataEntity/data.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from 'nestjs-telegram';
@Module({
  imports: [
    HttpModule,
    TelegramModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async () => ({
          botKey: 'Telegram_API_Key'
        }),
        inject: [ConfigService]
      }),
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...dataProviders],
})
export class AppModule {}
