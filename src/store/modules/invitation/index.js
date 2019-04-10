import invitationClient from '@/api/invitation';

export default {
  namespaced: true,
  state: {
    invitations: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setInvitations(state, invitations) {
      state.invitations = invitations;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async listInvitations({ commit }, sessionID) {
      try {
        commit('setInvitations', await invitationClient.listInvitations(sessionID));
      } catch (e) {
        commit('criticalError/createError', e, { root: true });
      }
    },
  },
};
