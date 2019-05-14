import Vue from 'vue';
import Meta from 'vue-meta';
import VueRx from 'vue-rx';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Meta);
Vue.use(VueRx);
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
  router,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
