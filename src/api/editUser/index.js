import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async changeProfile(profile, sessionID) {
    const res = await api.client.patch('/user/profile', profile, getHeader(sessionID));
    return res.data;
  },
};
