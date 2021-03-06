import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stock from './views/Stock.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'FindStock - เครื่องมือหาหุ้นง่ายๆ',
      }
    },
    {
      path: '/stock/:symbol',
      component: Stock
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
