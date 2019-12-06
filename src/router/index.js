import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import account from '@/components/account'
import signin from '@/components/signin'
import accountchange from '@/components/accountchange'
import schedulecheck from '@/components/schedulecheck'
import test from '@/components/test'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/signin',
      name: 'sigunin',
      component: signin
    },
    {
      path: '/accountchange',
      name: 'accountchange',
      component: accountchange
    },
    {
      path: '/schedulecheck',
      name: 'schedulecheck',
      component: schedulecheck
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
