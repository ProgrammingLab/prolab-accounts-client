import Vue from 'vue';
import Meta from 'vue-meta';
import VueRx from 'vue-rx';
import VScrollLock from 'v-scroll-lock';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Meta);
Vue.use(VueRx);
Vue.use(VScrollLock);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
