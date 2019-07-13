import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'

Vue.use(Router)
export default new Router({
  // eslint-disable-next-line no-extra-boolean-cast
  mode: window.location.href.includes('index.html') ? '' : 'history',
  base: process.env.NODE_ENV === 'production'
  ? '/Blocks/'
  : '/',
  routes: [
    {
      path: '*',
      name: 'Splash',
      component: Splash
    },
  ]
})
