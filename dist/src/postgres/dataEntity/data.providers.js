"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataProviders = void 0;
const data_entity_1 = require("./data.entity");
exports.dataProviders = [
    {
        provide: 'DATA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(data_entity_1.Data),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=data.providers.js.map