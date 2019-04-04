import memberProfileClient from '@/api/memberIntroduction/memberProfile';

export default {
  namespaced: true,
  state: {
    memberProfileError: null,
    memberProfile: {},
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    setMemberProfileError(state, error) {
      state.memberProfileError = error;
    },
    clearMemberProfileError(state) {
      state.memberProfileError = null;
    },
    setMemberProfile(state, memberProfile) {
      state.memberProfile = memberProfile;
    },
    clearMemberProfile(state) {
      state.memberProfile = {};
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    async getMemberProfile({ commit }, memberId) {
      commit('clearMemberProfileError');
      try {
        commit('setMemberProfile', await memberProfileClient.getMemberProfile(memberId));
      } catch (e) {
        commit('setMemberProfileError', e);
      }
    },
  },
};
