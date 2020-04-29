export default {
  namespaced: true,
  state: {
    number: null,
    message: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setError(state, { number, message }) {
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
    isError(state) {
      return state.number !== null || state.message !== null;
    },
  },
  actions: {
    createError({ commit }, error) {
      if (!error.response) {
        const number = '';
        const message = 'Connection refused';
        commit('setError', { number, message });
        return;
      }

      const number = error.response.status;
      const message = error.response.data.message || error.response.statusText;
      commit('setError', { number, message });
    },
  },
};
