export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setLoading(state) {
      state.isLoading = true;
    },
    clearLoading(state) {
      state.isLoading = false;
    },
  },
  /* eslint-enable no-param-reassign */
};
