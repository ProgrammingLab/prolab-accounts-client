import editClient from '@/api/editUser';

export default {
  namespaced: true,
  state: {
    res: false,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setFlag(state, res) {
      state.res = res;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async sendProfile({ commit }, { userProfile, sessionID }) {
      commit('setFlag', await editClient.changeProfile(userProfile, sessionID));
    },
  },
};
