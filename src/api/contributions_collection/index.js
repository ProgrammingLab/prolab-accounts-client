import api from '@/api';
import getHeader from '@/api/utils/get-header';

export default {
  async getContributionsCollection(sessionID) {
    let option = null;
    if (sessionID) {
      option = getHeader(sessionID);
    }
    const contributionsCollectionData = (await api.client.get('/contribution_collections', option)).data;
    return contributionsCollectionData;
  },
};
