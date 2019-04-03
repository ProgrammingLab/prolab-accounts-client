import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async getAchievements(sessionID) {
    const achievementData = (await api.client.get('/achievements')).data;
    return achievementData;
  },
};
