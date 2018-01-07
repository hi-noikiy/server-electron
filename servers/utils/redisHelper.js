const redis = require('redis');
class RedisCache {
    constructor(options){
        this.url = options.url;
        this.client  = null; 
    }
    connect() {
        this.client = redis.createClient(this.url);
    }
    
    hset(key, field, value) {
        return new Promise((resolve, reject) => {
            if (!key || !field) reject('miss value');
            var data = {
                value: value,
                save: Date.now()
            };
            data = JSON.stringify(data);
            this.client.hset(key, field, data, (err, rest) => {
                if (err) reject(err)
                else resolve(rest)
            });
        })  
    }
    hgetVal(key, field) {
        return new Promise((resolve, reject) => {
            this.client.hget(key, field, (err, rest) => {
                if (err || !rest) {
                    reject(err);
                } else {
                    try {
                        const data = JSON.parse(rest);
                        const _data = data.value ||{}
                        resolve(_data);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        })  
    }
}

module.exports = RedisCache
