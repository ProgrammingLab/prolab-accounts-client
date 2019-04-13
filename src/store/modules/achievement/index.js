import achievementClient from '@/api/achievement';

export default {
  namespaced: true,
  state: {
    achievements: null,
    achievementError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setAchievements(state, achievements) {
      state.achievements = achievements.achievements;
    },
    clearAchievementError(state) {
      state.achievementError = null;
    },
    setAchievementError(state, error) {
      state.achievementError = error;
    },
    createNewAchievement(state) {
      state.achievements.unshift({
        achievement_id: null,
      });
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
    async saveAchievement({ commit, dispatch }, { sessionID, achievement }) {
      commit('clearAchievementError');
      try {
        if (achievement.achievement_id) {
          await achievementClient.updateAchievement(sessionID, achievement);
        } else {
          await achievementClient.createAchievement(sessionID, achievement);
        }
      } catch (e) {
        commit('setAchievementError', e);
      }

      dispatch('getAchievements', sessionID);
    },
    async deleteAchievement({ commit, dispatch }, { sessionID, achievement }) {
      commit('clearAchievementError');
      try {
        await achievementClient.deleteAchievement(sessionID, achievement.achievement_id);
      } catch (e) {
        commit('setAchievementError', e);
      }

      dispatch('getAchievements', sessionID);
    },
  },
};
