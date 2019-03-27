import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async getUser(sessionID) {
    const userData = (await api.client.get('/user', getHeader(sessionID))).data;
    return userData;
  },
  async registerUser(name, full_name, password, registration_token) {
    const ret = (await api.client.post('/user', {name, full_name, password, registration_token})).data;
    return ret;
  },
};
