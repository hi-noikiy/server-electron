import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import IPC from './../../ipcCfg'
import Api from './../../apiUrl'

console.log(IPC.LOGINIPC)

// import ElementUI from 'element-ui'
// import './../../../node_modules/element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// Vue.http = Vue.prototype.$http = axios
Vue.http = Vue.prototype.$api = Api

Vue.config.productionTip = false

// 引入通讯
Vue.prototype.$_IPC = IPC.LOGINIPC

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
