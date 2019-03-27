import userClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    userData: null,
    registrationError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setUser(state, user) {
      state.userData = user;
    },
    setRegistrationError(state, error) {
      state.registrationError = error;
    },
    clearRegistrationError(state) {
      state.registrationError = null;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getUser({ commit }, sessionID) {
      commit('setUser', await userClient.getUser(sessionID));
    },
    async register({ commit }, { name, full_name, password, registration_token }) {
      commit('clearRegistrationError');
      try {
        await userClient.registerUser(name, full_name, password, registration_token);
      } catch (e) {
        commit('setRegistrationError', e);
      }
    },
  },
};
