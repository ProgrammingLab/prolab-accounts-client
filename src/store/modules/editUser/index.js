import updateClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    updateError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    clearUpdateError(state) {
      state.updateError = null;
    },
    setUpdateError(state, error) {
      state.updateError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async patchProfile({ commit }, { userProfile, sessionID }) {
      commit('clearUpdateError');
      try {
        await updateClient.patchProfile(userProfile, sessionID);
      } catch (e) {
        commit('setUpdateError', e);
      }
    },
  },
};
