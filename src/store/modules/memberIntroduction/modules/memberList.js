import memberListClient from '@/api/memberIntroduction/memberList';

export default {
  namespaced: true,
  state: {
    list: [],
    token: null,
    error: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    addList(state, list) {
      state.list.push(...list);
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getList({ state, commit }) {
      commit('clearError');
      try {
        if (state.token !== 0) {
          // eslint-disable-next-line camelcase
          const { users, next_page_token } = await memberListClient.getUserList(state.token);
          commit('addList', users);
          commit('setToken', next_page_token);
        }
      } catch (e) {
        commit('setError', e);
      }
    },
  },
  getters: {
    isLast(state) {
      return state.token === 0;
    },
    isEmpty(state) {
      return state.list.length === 0;
    },
  },
};
