export default {
  namespaced: true,
  state: {
    number: null,
    message: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    createError(state, { number, message }) {
      state.number = number;
      state.message = message;
    },
    clearError(state) {
      state.number = null;
      state.message = null;
    },
  },
  /* eslint-enable no-param-reassign */
  getters: {
    isError({ number, message }) {
      return number !== null || message !== null;
    },
  },
};
