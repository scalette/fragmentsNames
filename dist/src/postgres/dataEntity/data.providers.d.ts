import { DataSource } from 'typeorm';
import { Data } from './data.entity';
export declare const dataProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Data>;
    inject: string[];
}[];
