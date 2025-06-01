"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: 'postgres://avnadmin:AVNS_PXM53wbiwtyf5DfNm5l@ceyora-dev-db-kavindu2477-1a88.h.aivencloud.com:22593/ceyora_db',
    ssl: {
        rejectUnauthorized: false, // Good for dev; use proper certs in prod
    },
});
exports.default = pool;
