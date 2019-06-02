import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stock from './views/Stock.vue'
import Test from './views/Test.vue';
import Test1 from './views/Test1.vue';

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
      path: '/test/:id',
      props: true,
      component: Test1
    },
    {
      path: '/news',
      props: true,
      component: Test
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
