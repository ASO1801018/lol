import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LP from '@/components/LP'
import fice from '@/components/fice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/lp',
      name: 'LP',
      component: LP
    },
    {
      path: '/fice',
      name: 'fice',
      component: fice
    }
  ]
})
