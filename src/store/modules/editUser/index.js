import editClient from '@/api/editUser';

export default {
  namespaced: true,
  state: {
    res: null,
    sessionError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setResponse(state, res) {
      state.res = res;
    },
    clearSessionError(state) {
      state.sessionError = null;
    },
    setSessionError(state, error) {
      state.sessionError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async sendProfile({ commit }, { userProfile, sessionID }) {
      try {
        commit('setResponse', await editClient.changeProfile(userProfile, sessionID));
      } catch (e) {
        commit('setSessionError', e);
      }
    },
  },
};
