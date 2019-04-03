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
    setList(state, list) {
      state.list = list;
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
        // 初回ロード
        if (state.token === null) {
          // eslint-disable-next-line camelcase
          const { users, next_page_token } = await memberListClient.getUserList();
          commit('setList', users);
          commit('setToken', next_page_token);
        }
        // else if(state.token !== 0) でリストの付け足し処理をするつもり
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
