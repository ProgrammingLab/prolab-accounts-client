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
  // eslint-disable-next-line camelcase
  async registerUser(name, full_name, password, registration_token) {
    const ret = (await api.client.post('/users', {
      name, full_name, password, registeration_token: registration_token,
    })).data;
    return ret;
  },

  async verifyRegistrationToken(token) {
    const ret = (await api.client.get(`/invitations/${token}`)).data;
    return ret;
  },
};
