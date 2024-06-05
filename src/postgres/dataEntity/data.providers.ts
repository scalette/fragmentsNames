
import { DataSource } from 'typeorm';
import { Data } from './data.entity';

export const dataProviders = [
  {
    provide: 'DATA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Data),
    inject: ['DATA_SOURCE'],
  },
];