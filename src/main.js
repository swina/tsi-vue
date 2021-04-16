import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/tailwind.css'

import './plugins'
import api from "./plugins/api";

import LoadingSpinner from '@/components/loading'
Vue.component('moka-loading',LoadingSpinner)

import MokaModal from '@/components/modal'
Vue.component ( 'moka-modal' , MokaModal )

import Icon from '@/components/ui/icon'
Vue.component ( 'icon' , Icon )

api.defaults.timeout = 10000;
Vue.prototype.$http = api 

import VueBlobJsonCsv from 'vue-blob-json-csv'
Vue.use(VueBlobJsonCsv)



import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
