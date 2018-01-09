


const state = {
  main: 0,
  titie: '管理系统',
  password: '',
  account: 'zhengchong',
  autoLogin: false,
  remPw: false,
  isLogin: false,
  isPwTrue: true,
  win: null
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
