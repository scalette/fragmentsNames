import { DataSource } from 'typeorm';
export declare const Postgres: {
    provide: string;
    useFactory: () => Promise<DataSource>;
};
