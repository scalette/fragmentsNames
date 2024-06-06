import { DataSource } from 'typeorm';

const localhostHome = {
  type: 'postgres',
  host: 'localhost',
  port: 5444,
  username: 'admin',
  password: 'admin',
  database: 'default',
  entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
}

const hardcodedLocalHost = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'skrobcotec_admin',
  password: '_jc^gv@5Z?5R',
  database: 'skrobcotec_default',
  entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
}

export const Postgres = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    //@ts-ignore
    const dataSource = new DataSource(hardcodedLocalHost);

    return dataSource.initialize();
  },
}