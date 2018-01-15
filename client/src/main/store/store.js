/**
 * 主进程 数据统一管理工具
 */

let _store = null

const store = function () {
  if (!_store) {
    _store = new Store()
  }
  return _store
}

class Store {
  constructor () {
    this.store = {}
    return this
  }
  setState () {
    let obj = arguments[0]
    let fn = arguments[1]
    if (obj) {
      for (let key in obj) {
        this.store[key] = obj[key]
      }
    }
  }
  getState (str) {
    return this.store[str]
  }
}

export default store
