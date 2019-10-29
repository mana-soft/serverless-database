'use strict';

module.exports = ({
    init: (payload, callback) => {
        console.log('Init database conneciton');
        
        payload.knex = require('knex')({
            client: 'mysql',
            connection: {
                host: process.env.DATABASE_HOST_READ_ONLY,
                port: process.env.DATABASE_PORT,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                timezone: 'utc',
            },
            pool: {min: 0, max: 1},
        });
        callback(null, payload);
    },
    release: (payload, callback) => {
        console.log('Release database conneciton');

        payload.knex.destroy(() => {
            callback(null, payload);
        });
    }
});