import Vue from 'vue'
import Vuex from 'vuex'
let electron = require('electron')
import IPC from './../../../ipcCfg'
import modules from './modules'

Vue.use(Vuex)
let store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
store.$electron = electron
store.$IPC = IPC.INDEXIPC
export default store
