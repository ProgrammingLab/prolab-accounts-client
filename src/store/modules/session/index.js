import sessionClient from '@/api/session';

export default {
  namespaced: true,
  state: {
    sessionID: null,
    loginError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setSessionID(state, sessionID) {
      state.sessionID = sessionID;
    },
    clearSessionID(state) {
      state.sessionID = null;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async login({ commit }, { name, password }) {
      commit('clearLoginError');
      try {
        const res = await sessionClient.createSession(name, password);
        commit('setSessionID', res.session_id);
      } catch (e) {
        commit('setLoginError', e);
      }
    },

    async logout({ commit, dispatch }, sessionID) {
      try {
        await sessionClient.deleteSession(sessionID);
        commit('clearSessionID');
      } catch (e) {
        dispatch('criticalError/createError', e);
      }
    },
  },
  getters: {
    loggedIn({ sessionID, loginError }) {
      return Boolean(sessionID && !loginError);
    },
  },
};
