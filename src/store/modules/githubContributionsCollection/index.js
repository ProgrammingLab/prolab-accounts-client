import ContributionsCollectionClient from '@/api/contributions_collection';

export default {
  namespaced: true,
  state: {
    contributionsCollection: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setContributionsCollection(state, contributionsCollection) {
      state.contributionsCollection = contributionsCollection;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getContributionsCollection({ commit, dispatch }, sessionID) {
      try {
        commit('setContributionsCollection', await ContributionsCollectionClient.getContributionsCollection(sessionID));
      } catch (e) {
        dispatch('criticalError/createError', e, { root: true });
      }
    },
  },
};
