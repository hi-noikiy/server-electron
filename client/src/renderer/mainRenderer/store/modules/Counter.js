const state = {
  main: 0,
  userInfo: ''
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  // 启动获取用户信息
  GET_USER_INFO(state) {
    var userInfo = this.$electron.ipcRenderer.sendSync(this.$IPC.GETUSERINFO);
    state.userInfo = userInfo.user;
    state.access_token = userInfo.access_token;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
