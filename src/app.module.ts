import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { dataProviders } from './postgres/dataEntity/data.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from 'nestjs-telegram';
import configuration from '../configs/env/EnvironmentVariables';
import { validate } from '../configs/env/EnvironmentVariables.validation';
@Module({
  imports: [
		ConfigModule.forRoot({
			load: [configuration],
			cache: true,
			validate,
		}),
    HttpModule,
    TelegramModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          botKey: configService.get('Telegram_API_Key')
        }),
        inject: [ConfigService]
      }),
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...dataProviders],
})
export class AppModule {}
