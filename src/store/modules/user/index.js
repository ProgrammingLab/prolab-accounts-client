import userClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    userData: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setUser(state, user) {
      state.userData = user;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getUser({ commit }, sessionID) {
      commit('setUser', await userClient.getUser(sessionID));
    },
  },
};
