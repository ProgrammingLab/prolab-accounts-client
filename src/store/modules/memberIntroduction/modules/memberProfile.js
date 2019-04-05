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
    async getMemberProfile({ commit }, name) {
      commit('clearMemberProfileError');
      try {
        commit('setMemberProfile', await memberProfileClient.getMemberProfile(name));
      } catch (e) {
        commit('setMemberProfileError', e);
      }
    },
  },
};
