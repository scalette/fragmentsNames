import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './postgres/postgres.module';
import { dataProviders } from './postgres/dataEntity/data.providers';
import { GraphileModule } from './graphileWorker/graphileWorker.module';
import { ConfigModule } from '@nestjs/config';
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
    PostgresModule,
    GraphileModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...dataProviders],
})
export class AppModule {}
