import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import oauthLogin from './modules/oauth/login';
import oauthConsent from './modules/oauth/consent';
import session from './modules/session';
import user from './modules/user';
import criticalError from './modules/criticalError';
import editUser from './modules/editUser';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    oauthLogin,
    oauthConsent,
    session,
    user,
    criticalError,
    editUser,
  },
  plugins: [
    createPersistedState({
      paths: ['session.sessionID'],
    }),
  ],
});
