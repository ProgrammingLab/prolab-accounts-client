import registrationClient from '@/api/registration';

export default {
  namespaced: true,
  state: {
    registrationError: null,
    tokenVerificationError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
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
    async verifyRegistrationToken({ commit }, token) {
      commit('clearTokenVerificationError');
      try {
        await registrationClient.verifyRegistrationToken(token);
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
        await registrationClient.registerUser(name, full_name, password, registration_token);
      } catch (e) {
        commit('setRegistrationError', e);
      }
    },
  },
};
