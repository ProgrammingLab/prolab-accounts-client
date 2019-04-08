import updateClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    res: null,
    updateError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setResponse(state, res) {
      state.res = res;
    },
    clearUpdateError(state) {
      state.updateError = null;
    },
    setUpdateError(state, error) {
      state.updateError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async sendProfile({ commit }, { userProfile, sessionID }) {
      commit('clearUpdateError');
      try {
        commit('setResponse', await updateClient.changeProfile(userProfile, sessionID));
      } catch (e) {
        commit('setUpdateError', e);
      }
    },
  },
};
