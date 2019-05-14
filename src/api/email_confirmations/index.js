import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  // eslint-disable-next-line camelcase
  async CreateEmailConfirmation(session_id, new_email, password) {
    const ret = (await api.client.post(
      '/user/emails/confirmations',
      {
        new_email,
        password,
      },
      getHeader(session_id)
    )).data;
    return ret;
  },

  // eslint-disable-next-line camelcase
  async ConfirmEmail(session_id, token) {
    const ret = (await api.client.patch(
      `/user/emails/confirmations/${token}`,
      {},
      getHeader(session_id)
    )).data;
    return ret;
  },
};
