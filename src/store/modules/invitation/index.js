import invitationClient from '@/api/invitation';

export default {
  namespaced: true,
  state: {
    invitations: null,
    invitationError: null,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setInvitations(state, invitations) {
      state.invitations = invitations;
    },
    clearInvitationError(state) {
      state.invitationError = null;
    },
    setInvitationError(state, error) {
      state.invitationError = error;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async listInvitations({ commit, dispatch }, sessionID) {
      try {
        commit('setInvitations', await invitationClient.listInvitations(sessionID));
      } catch (e) {
        dispatch('criticalError/createError', e, { root: true });
      }
    },
    async invite({ commit, dispatch }, { sessionID, rawEmails }) {
      commit('clearInvitationError');
      const emails = rawEmails
        .split(/\r\n|\n/)
        .map(email => email.trim())
        .filter(email => email);
      try {
        await Promise.all(emails.map(email => invitationClient.createInvitation(sessionID, email)));
      } catch (e) {
        commit('setInvitationError', e);
      }

      dispatch('listInvitations', sessionID);
    },
  },
};
