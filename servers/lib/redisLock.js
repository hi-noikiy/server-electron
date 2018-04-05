var _Redlock = require('redlock');
const _ = require('lodash');
const EventEmitter = require('events');
const configs = require('./../configs');

module.exports = class Redlock extends EventEmitter{ 
  constructor(redisClient) {
    super();
    this.redisClient = redisClient;
    this.clients = [];

    this.clients.push(redisClient.client);

    this.redlock = new _Redlock(
      this.clients,
      {
        driftFactor: 0.01, // time in ms
        retryCount: 10,
        retryDelay: 200, // time in ms
        retryJitter: 200 // time in ms
      }
    );
  }

  async sub(tabname, key) {
    var resoure = "locks:" + tabname + ':' + key;
    // 分布式锁
    return new Promise((resolve,reject) => {
      this.redlock.lock(resoure, 200, async (err, lock) => {
        if (!err) { // 没有拿到资源锁
          resolve(await this.haveLock(tabname, key,lock));
        } else { 
          await this.sub(tabname, key);
        }
      })
    })
  }

  async haveLock(tabname, key, _lock) {
    let result = await this.redisClient.rpop(key);
    if (result) {
      var success = true;
      try {
        await this.saveDb(tabname, result);
      } catch (e) {
        console.log(e)
        // 出错之后回滚
        // await this.rollback(key, result);
        success = false;
      }
      _lock.unlock();
      return {
        success: success
      }
      // 延长时间
      // _lock.extend(200, async (err, lock) => {
      //   if (!err) {
      //     await this.haveLock(tabname, key, lock);
      //   } 
      // })
    } else {
      _lock.unlock();
      return {
        success:false
      }
    }
  }

  async saveDb(tabname, result) {
    let docs = {};
    let tabKey = {
      value: null,
      key:null
    }
    for (let key in result.query) {
      tabKey.key = key
      tabKey.value = result.query[key];
    }
    const key = tabname + '_' + tabKey.key;
    docs = await this.redisClient.hgetVal(key, tabKey.value);
    docs[tabKey.key] = tabKey.value;
    result.param.forEach(item => {
      docs = this['_'+item.operator](item, docs)
    });
    await this.redisClient.hset(key, tabKey.value, docs);
    return {success:true}
  }

  //  出错回滚
  async rollback(key, result) {
    await this.redisClient.lpush(key,result)
  }

  _push(item, docs) {
    return this._arrOperator(item, docs);
  }

  _unshift(item, docs) {
    return this._arrOperator(item, docs);
  }

  _update(item, docs) {
    if (item.param) {
      item.param.forEach(el => {
        docs[el.field] = el.value;
      })
    } else {
      docs[item.field] = item.value;
    }
    return docs;
  }

  _arrOperator(item, docs) {
    if (item.param) {
      item.param.forEach(el => {
        docs[el.field] ? docs[el.field][item.operator](...el.value) : (docs[el.field] = el.value);
      })
    } else {
      docs[item.field] ? docs[item.field][item.operator](...item.value) : (docs[item.field] = item.value);
    }
    return docs;
  }
};