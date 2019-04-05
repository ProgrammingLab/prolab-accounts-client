import api from '@/api';

export default {
  async getMemberProfile(name) {
    const ret = (await api.client.get(`/users/${name}`)).data;
    return ret;
  },
};
