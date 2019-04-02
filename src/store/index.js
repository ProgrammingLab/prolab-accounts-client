import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import oauthLogin from './modules/oauth/login';
import oauthConsent from './modules/oauth/consent';
import session from './modules/session';
import user from './modules/user';
import criticalError from './modules/criticalError';
import achievement from './modules/achievement';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    oauthLogin,
    oauthConsent,
    session,
    user,
    criticalError,
    achievement,
  },
  plugins: [
    createPersistedState({
      paths: ['session.sessionID'],
    }),
  ],
});
