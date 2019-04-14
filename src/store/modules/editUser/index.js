import updateClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    patchProfileError: null,
    postIconError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    clearPatchProfileError(state) {
      state.patchProfileError = null;
    },
    clearPostIconError(state) {
      state.postIconError = null;
    },
    setPatchProfileError(state, error) {
      state.patchProfileError = error;
    },
    setPostIconError(state, error) {
      state.postIconError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async patchProfile({ commit }, { userProfile, sessionID }) {
      commit('clearPatchProfileError');
      try {
        await updateClient.patchProfile(userProfile, sessionID);
      } catch (e) {
        commit('setPatchProfileError', e);
      }
    },
    async postIcon({ commit }, { image, sessionID }) {
      commit('clearPostIconError');
      try {
        await updateClient.postIcon(image, sessionID);
      } catch (e) {
        commit('setPostIconError', e);
      }
    },
  },
  getters: {
    hasError(state) {
      return state.postIconError !== null || state.patchProfileError !== null;
    },
  },
};
