import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async createSession(name, password) {
    const res = (await api.client.post('/sessions', { name, password })).data;
    return res;
  },

  async deleteSession(sessionID) {
    const ret = await api.client.delete('/sessions', getHeader(sessionID));
    return ret;
  },
};
