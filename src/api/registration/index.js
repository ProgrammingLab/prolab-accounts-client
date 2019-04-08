import api from '@/api';

export default {
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
