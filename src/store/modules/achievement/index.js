import achievementClient from '@/api/achievement';

export default {
  namespaced: true,
  state: {
    achievements: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setAchievements(state, achievements) {
      state.achievements = achievements.achievements;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getAchievements({ commit }, sessionID) {
      try {
        commit('setAchievements', await achievementClient.getAchievements(sessionID));
      } catch (e) {
        commit('criticalError/createError', e, { root: true });
      }
    },
  },
};
