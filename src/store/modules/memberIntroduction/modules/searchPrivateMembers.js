import memberListClient from '@/api/memberIntroduction/memberList';

export default {
  namespaced: true,
  state: {
    members: [],
    searchError: null,
    searching: false,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setError(state, error) {
      state.searchError = error;
    },
    clearError(state) {
      state.searchError = null;
    },
    setMembers(state, members) {
      state.members = members;
    },
    setSearching(state, searching) {
      state.searching = searching;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async searchMembers({ commit }, { sessionID, query }) {
      commit('clearError');
      commit('setSearching', true);
      try {
        const { users } = await memberListClient.getPrivateUserList(sessionID, null, query);
        commit('setMembers', users);
      } catch (e) {
        commit('setError', e);
      }
      commit('setSearching', false);
    },
  },
};
