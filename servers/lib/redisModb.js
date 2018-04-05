const Redlock = require('./redisLock');
const _ = require('lodash');
const configs = require('./../configs');
const Redis = require('./../utils/redisHelper');

module.exports = class RedisMongodb extends Redlock{
  constructor(tabname,redisClient) {
    super(redisClient);
    this.redisClient = redisClient;
    this.tabname = tabname;
  }

  async update(query, params) {
    if (!_.isPlainObject(query) && !_.isPlainObject(params)) {
      return Promise.reject(new Error('params is error'));
    }
    var sql = {
      param: this._resolveSql(params),
      query:query
    }
    let _field = null;
    for (let key in query) {
      _field = query[key];
    }
    const key = 'list_'+this.tabname + ':' + _field;
    let result = { success:true}
    try { 
      await this.redisClient.lpush(key, sql);
      await this.sub(this.tabname, key);
    } catch (e) {
      result.success = false;
     }
    return result;
  };
  
  _resolveSql(params) {
    var _operator = [];
    for (let operator in params) { 
      var obj = {};
      obj.operator = operator
      obj.timeStram = Date.now();
      if (Object.keys(params[operator]).length > 1) {
        obj.param = [];
        for (let fields in params[operator]) {
          obj.param.push({
            field : fields,
            value : params[operator][fields]
          })
        };
      } else {
        for (let fields in params[operator]) {
          obj.field = fields;
          obj.value = params[operator][fields];
        };
      }
      _operator.push(obj);
    }
    return _operator;
  }
}