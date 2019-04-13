import api from '@/api';
import getHeader from '@/api/utils/get-header';

export default {
  async getAchievements() {
    const achievementData = (await api.client.get('/achievements')).data;
    return achievementData;
  },
  async createAchievement(sessionID, achievement) {
    const resp = (await api.client.post('/achievements'), achievement, getHeader(sessionID)).data;
    return resp;
  },
  async updateAchievement(sessionID, achievement) {
    const resp = (await api.client.post(`/achievements/${achievement.achievement_id}`), achievement, getHeader(sessionID)).data;
    return resp;
  },
  async deleteAchievement(sessionID, achievementID) {
    const resp = (await api.client.delete(`/achievements/${achievementID}`), getHeader(sessionID)).data;
    return resp;
  },
};
