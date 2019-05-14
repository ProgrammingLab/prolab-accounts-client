import achievementClient from '@/api/achievement';

export default {
  namespaced: true,
  state: {
    achievements: null,
    achievementError: null,
    sending: false,
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
    setSending(state, sending) {
      state.sending = sending;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getAchievements({ commit, dispatch }, sessionID) {
      try {
        commit('setAchievements', await achievementClient.getAchievements(sessionID));
      } catch (e) {
        dispatch('criticalError/createError', e, { root: true });
      }
    },
    async saveAchievement({ commit, dispatch }, { sessionID, achievement, image }) {
      commit('clearAchievementError');
      commit('setSending', true);
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
            image
          );
        }
        dispatch('getAchievements', sessionID);
      } catch (e) {
        commit('setAchievementError', e);
      }

      commit('setSending', false);
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
