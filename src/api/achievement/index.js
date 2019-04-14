import api from '@/api';
import getHeader from '@/api/utils/get-header';

export default {
  async getAchievements(sessionID) {
    let option = null;
    if (sessionID) {
      option = getHeader(sessionID);
    }
    const achievementData = (await api.client.get('/achievements', option)).data;
    return achievementData;
  },
  async createAchievement(sessionID, achievement) {
    const resp = (await api.client.post('/achievements', achievement, getHeader(sessionID))).data;
    return resp;
  },
  async updateAchievement(sessionID, achievement) {
    const resp = (await api.client.patch(`/achievements/${achievement.achievement_id}`, achievement, getHeader(sessionID))).data;
    return resp;
  },
  async deleteAchievement(sessionID, achievementID) {
    const resp = (await api.client.delete(`/achievements/${achievementID}`, getHeader(sessionID))).data;
    return resp;
  },
};
