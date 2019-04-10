import api from '@/api';
import getHeader from '@/api/utils/get-header';

export default {
  async listInvitations(sessionID) {
    const res = (await api.client.get('/admin/invitations', getHeader(sessionID))).data.invitations;
    return res;
  },
};
