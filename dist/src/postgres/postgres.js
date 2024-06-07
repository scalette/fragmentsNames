"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
const typeorm_1 = require("typeorm");
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
};
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
};
exports.Postgres = {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const dataSource = new typeorm_1.DataSource(hardcodedLocalHost);
        return dataSource.initialize();
    },
};
//# sourceMappingURL=postgres.js.map