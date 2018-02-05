import Vue from 'vue'
import Router from 'vue-router'
import statistical from './statistical'
import charge from './charge'
import person from './person'
import inventory from './inventory'
import setting from './setting'
import wechat from './wechat'
Vue.use(Router)
let routers = [
  {
    path: '/',
    name: 'index',
    components: {
      default: require('@/components/index/center-content').default
    }
  }, {
    path: '*',
    redirect: '/'
  }
];
routers.push(...statistical)
routers.push(...charge)
routers.push(...person)
routers.push(...setting)
routers.push(...wechat)
routers.push(...inventory)
export default new Router({
  routes: routers
})
