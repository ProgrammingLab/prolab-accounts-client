import api from '@/api';

export default {
  async getMemberProfile(memberId) {
    const ret = (await api.client.get(`/users/${memberId}`)).data;
    return ret;
  },
};
