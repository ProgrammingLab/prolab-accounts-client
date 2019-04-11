import userClient from '@/api/user';

export default {
  namespaced: true,
  state: {
    userData: null,
    registrationError: null,
    tokenVerificationError: null,
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
    setTokenVerificationError(state, error) {
      state.tokenVerificationError = error;
    },
    clearTokenVerificationError(state) {
      state.tokenVerificationError = null;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getUser({ commit }, sessionID) {
      commit('setUser', await userClient.getUser(sessionID));
    },
    async verifyRegistrationToken({ commit }, token) {
      commit('clearTokenVerificationError');
      try {
        await userClient.verifyRegistrationToken(token);
      } catch (e) {
        commit('setTokenVerificationError', e);
      }
    },
    async register({ commit }, {
      // eslint-disable-next-line camelcase
      name, full_name, password, registration_token,
    }) {
      commit('clearRegistrationError');
      try {
        await userClient.registerUser(name, full_name, password, registration_token);
      } catch (e) {
        commit('setRegistrationError', e);
      }
    },
  },
  getters: {
    isAdmin(state) {
      return state.userData && state.userData.authority === 'ADMIN';
    },
  },
};
