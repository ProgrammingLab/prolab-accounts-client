import memberList from './modules/memberList';
import memberProfile from './modules/memberProfile';
import searchPrivateMembers from './modules/searchPrivateMembers';

export default {
  namespaced: true,
  modules: {
    memberList,
    memberProfile,
    searchPrivateMembers,
  },
};
