import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import getIpAddress from './resources/getIpAddress';

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  // change title of website
  document.title = to.meta.title
  // send ip address to DB
  getIpAddress(to.fullPath, from.fullPath)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
