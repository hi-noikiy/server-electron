const redis = require('redis');
class RedisCache {
    constructor(options){
        this.url = options.url;
        this.option = options.option || {};
        this.client  = null; 
    }
    connect() {
        this.client = redis.createClient(this.url,this.option);
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
                if (err) {
                    reject(err);
                } else {
                    try { 
                        const data = rest ? JSON.parse(rest) : {};
                        const _data = data.value ||{}
                         resolve(_data);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        })  
    }
    hdels(key, field) {
        this.client.hdel(key, field)
    }

    mutli(conmand) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(conmand)) reject('the conmand must be Array');
            this.client.multi(conmand).exec((err, replies)=> {
                if (err) reject(err);
                else resolve(replies)
            });
        })
    }

    lpush(key, value) {
        return new Promise((resolve, reject)=>{
            if (!key || !value) reject('miss value');
            if (typeof value != 'string') {
                try {
                
                   value = JSON.stringify(value);
                }catch(e){}
            }
            this.client.lpush(key, value, (err, result) => {
                if (err) reject(err)
                else resolve(result);
            })
        })
    }
    rpop(key) {
        return new Promise((resolve, reject) => {
            this.client.rpop(key, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    if (typeof result == 'string') {
                        try {
                            result = JSON.parse(result)
                        }catch(e){}
                    }
                    resolve(result);
                }
            })
        })
    }
}

module.exports = RedisCache
