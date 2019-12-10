import Vue from 'vue'
import Router from 'vue-router'
import HisyoImagechange from '@/components/Hisyo_Imagechange'
import schedulecheck from '@/components/schedulecheck'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HisyoImagechange',
      component: HisyoImagechange
    },
    {
      path: '/schedulecheck',
      name: 'schedulecheck',
      component: schedulecheck
    }
  ]
})
