import Vue from 'vue'
import App from './App'
import Mpvuerouterpatch from 'mpvue-router-patch'
Vue.use(Mpvuerouterpatch)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
