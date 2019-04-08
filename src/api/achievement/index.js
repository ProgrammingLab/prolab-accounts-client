import api from '@/api';

export default {
  async getAchievements() {
    const achievementData = (await api.client.get('/achievements')).data;
    return achievementData;
  },
};
