import emailConfirmationClient from '@/api/email_confirmations';

export default {
  namespaced: true,
  state: {
    emailConfirmationError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setEmailConfirmationError(state, error) {
      state.emailConfirmationError = error;
    },
    clearEmailConfirmationError(state) {
      state.emailConfirmationError = null;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    // eslint-disable-next-line camelcase
    async CreateEmailConfirmation({ commit }, { session, new_email, password }) {
      commit('clearEmailConfirmationError');
      try {
        await emailConfirmationClient.CreateEmailConfirmation(session, new_email, password);
      } catch (e) {
        commit('setEmailConfirmationError', e);
      }
    },

    async ConfirmEmail({ commit }, token) {
      commit('clearEmailConfirmationError');
      try {
        await emailConfirmationClient.ConfirmEmail({ commit }, token);
      } catch (e) {
        commit('setEmailConfirmationError', e);
      }
    },
  },
};
