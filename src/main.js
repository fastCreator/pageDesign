
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// import './ElementUI'
import infiniteScroll from 'vue-infinite-scroll'
import Waterfall from 'vue-waterfall'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import validator from 'UTIL/validator'
import 'UTIL/filters'
import toast from 'COMMON/toast/toast.js'
// import '../psd'
// import 'COMMON/index'
if (process.env.NODE_ENV === 'development') {
  require('./ElementUI')
}

Vue.config.productionTip = false

Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(validator)
Vue.use(toast)

sync(store, router)

Vue.component('waterfall', Waterfall.waterfall)
Vue.component('waterfall-slot', Waterfall.waterfallSlot)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
