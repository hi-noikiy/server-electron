import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'content',
      component: require('@/components/content').default,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
