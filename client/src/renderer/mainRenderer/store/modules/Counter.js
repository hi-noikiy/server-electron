const state = {
  main: 0,
  userInfo: ''
}

const mutations = {
  // 启动获取用户信息
  GET_USER_INFO (state) {
    var userInfo = this.$electron.ipcRenderer.sendSync(this.$IPC.GETUSERINFO)
    state.userInfo = userInfo.user
    state.access_token = userInfo.access_token
  }
}

const actions = {
  GET_USER_INFO ({ commit }) {
    commit('GET_USER_INFO')
  }
}

export default {
  state,
  mutations,
  actions
}
