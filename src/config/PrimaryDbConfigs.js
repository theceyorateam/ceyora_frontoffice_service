const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://avnadmin:AVNS_PXM53wbiwtyf5DfNm5l@ceyora-dev-db-kavindu2477-1a88.h.aivencloud.com:22593/ceyora_db',
    ssl: {
        rejectUnauthorized: false // Good for dev; use proper certs in prod
    }
});

module.exports = pool;
