const redis = require('redis');

class RedisCache {
    constructor(options){
        this.url = options.url;
        this.client  = null; 
    }
    connect() {
        this.client = redis.createClient(this.url);
    }

}

module.exports = RedisCache
