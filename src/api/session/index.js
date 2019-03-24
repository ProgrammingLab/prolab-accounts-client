import api from '@/api';

export default {
  async createSession(name, password) {
    const res = await api.client.post('/sessions', { name, password });
    return res;
  },
};
