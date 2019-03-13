import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async createSession(name, password) {
    const res = await api.client.post('/sessions', { name, password });
    return res;
  },
  async checkSession(sessionID) {
    try {
      await api.client.get('/user', getHeader(sessionID));
      return true;
    } catch {
      return false;
    }
  },
};
