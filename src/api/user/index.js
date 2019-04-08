import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async getUser(sessionID) {
    const userData = (await api.client.get('/user', getHeader(sessionID))).data;
    return userData;
  },
  async changeProfile(profile, sessionID) {
    const res = await api.client.patch('/user/profile', profile, getHeader(sessionID));
    return res.data;
  },
};
