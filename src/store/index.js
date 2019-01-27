import Vue from 'vue';
import Vuex from 'vuex';
import oauthLogin from './modules/oauth_login';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    oauthLogin,
  },
});
