import api from '@/api';

export default {
  async getUserList(token) {
    const res = (await api.get('users', { page_token: token })).data;
    return res;
  },
};
