import api from '@/api';
import getHeader from '../utils/get-header';

export default {
  // eslint-disable-next-line camelcase
  async CreateEmailConfirmation(session_id, new_email, password) {
    const ret = (await api.client.post('/user/emails/confirmations', {
      ...getHeader(session_id),
      new_email,
      password,
    })).data;
    return ret;
  },

  async ConfirmEmail(token) {
    const ret = (await api.client.patch(`/user/emails/confirmations/${token}`)).data;
    return ret;
  },
};
