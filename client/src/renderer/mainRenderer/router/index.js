import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children:[
        {
          path:'',
          component:require('@/components/index/IndexPage').default
        },
        {
          path:'index',
          component:require('@/components/index/IndexPage').default
        },
        {
          path: 'room',
          component: require('@/components/index/RoomPage').default
        },
        {
          path:'subject',
          component:require('@/components/index/SubjectPage').default
        },
        {
          path:'teacher',
          component:require('@/components/index/TeacherPage').default
        },
        {
          path:'student',
          component:require('@/components/index/StudentPage').default
        },
        {
          path:'setting',
          component:require('@/components/index/SettingPage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
