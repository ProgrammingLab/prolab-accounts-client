import sesssionClient from '@/api/session';

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
    setLoginError(state, error) {
      state.loginError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async login({ commit }, { name, password }) {
      commit('setLoginError', '');
      try {
        const res = await sesssionClient.createSession(name, password);
        commit('setSessionID', res.data.session_id);
      } catch (e) {
        commit('setLoginError', e);
      }
    },
    async updateSession({ commit, state }) {
      if (!await sesssionClient.checkSession(state.sessionID)) {
        commit('setSessionID', '');
      }
    },
  },
  getters: {
    loggedIn({ sessionID, loginError }) {
      return Boolean(sessionID && !loginError);
    },
  },
};