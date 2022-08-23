import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './i18n/i18n'
import vuetify from './plugins/vuetify';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './assets/css/style.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$axios = axios

Vue.filter('fixedDPR', function (value, type) {
  if(type && type != ''){
    return type + ":" + value/window.devicePixelRatio+"px";
  }else{
    return value/window.devicePixelRatio+"px";
  }
  
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
