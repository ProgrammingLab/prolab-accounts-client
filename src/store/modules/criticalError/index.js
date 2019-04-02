export default {
  namespaced: true,
  state: {
    number: null,
    message: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    createError(state, error) {
      state.number = error.response.status;
      state.message = error.response.data.message;
    },
    clearError(state) {
      state.number = null;
      state.message = null;
    },
  },
  /* eslint-enable no-param-reassign */
  getters: {
    isError(state) {
      return state.number !== null || state.message !== null;
    },
  },
};
