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
    async saveAchievement({ commit, dispatch }, { sessionID, achievement, image }) {
      commit('clearAchievementError');
      const request = Object.assign({}, achievement);
      request.members = request.members.map(member => ({ user_id: member.user_id }));
      try {
        let newAchievement = null;
        if (achievement.achievement_id) {
          newAchievement = await achievementClient.updateAchievement(sessionID, request);
        } else {
          newAchievement = await achievementClient.createAchievement(sessionID, request);
        }
        if (image && image.length) {
          await achievementClient.updateAchievementImage(
            sessionID,
            newAchievement.achievement_id,
            image,
          );
        }
        dispatch('getAchievements', sessionID);
      } catch (e) {
        commit('setAchievementError', e);
      }
    },
    async deleteAchievement({ commit, dispatch }, { sessionID, achievement }) {
      commit('clearAchievementError');
      try {
        await achievementClient.deleteAchievement(sessionID, achievement.achievement_id);
        dispatch('getAchievements', sessionID);
      } catch (e) {
        commit('setAchievementError', e);
      }
    },
  },
};
