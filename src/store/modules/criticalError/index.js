export default {
  namespaced: true,
  state: {
    number: null,
    message: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setNumber(state, number) {
      state.number = number;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    createError({ commit, getters }, { number, message }) {
      if (getters.isError) return;
      commit('setNumber', number);
      commit('setMessage', message);
    },
    clearError({ commit }) {
      commit('setNumber', null);
      commit('setMessage', null);
    },
  },
  getters: {
    isError({ number, message }) {
      return Boolean(number !== null || message !== null);
    },
  },
};
