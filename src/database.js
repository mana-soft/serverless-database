'use strict';

class Db {
    constructor(config) {
        this._config = config;
        this.knex = require('knex')(this._config);
    }

    release(callback) {
        return this.knex.destroy(callback);
    }
}

module.exports = ((config) => {
    return new Db(config);
});