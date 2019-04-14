import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  async getUserList(token) {
    const res = (await api.client.get('/users', { params: { page_token: token, page_size: 100 } })).data;
    return res;
  },
  async getPrivateUserList(sessionID, token, query) {
    const option = getHeader(sessionID);
    option.params = {
      page_token: token,
      page_size: 100,
      query,
    };
    const res = (await api.client.get('/private/users', option)).data;
    return res;
  },
};
