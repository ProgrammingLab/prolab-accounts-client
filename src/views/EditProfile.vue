<template>
  <div id="page">
    <img
      width="210"
      height="70"
      src="http://placehold.jp/65/ffffff/666666/210x70.png?text=ProLab"
      alt="prolag"
    >
    <!-- <img alt="Prolab Logo" src="../assets/logo.png"> -->
    <h1>プロフィール編集ページ</h1>
    <p id="uname" class="profileItem">user: {{userData.name}}</p>
    <form v-on:submit.prevent="packProfile">
      <label for="checkbox" class="profileItem">プロフィールについて</label>
      <select id="checkbox" class="inputZone" v-model="profile_scope">
        <option value="1">公開する</option>
        <option value="0">部員にのみ公開する</option>
      </select>
      <input type="checkbox" class="inputZone" id="leftIn" v-model="left">
      <label for="left" class="profileItem" id="left">卒部済み</label>
      <label for="display_name" class="profileItem">表示名</label>
      <input type="text" class="inputZone" v-model="display_name">
      <label for="real_name" class="profileItem">本名</label>
      <input type="text" value="Real User" class="inputZone" v-model="real_name">
      <label for="description" class="profileItem">Description</label>
      <textarea class="inputZone" v-model="description"></textarea>
      <label for="grade" class="profileItem">学年</label>
      <select class="inputZone" v-model="grade">
        <option disabled value="0">Please Select</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <label for="department" class="profileItem">学科</label>
      <select class="inputZone" v-model="department">
        <option disabled value="0">Please Select</option>
        <option value="1">S</option>
        <option value="2">A</option>
        <option value="3">E</option>
        <option value="4">C</option>
        <option value="5">M</option>
      </select>
      <label for="display_name" class="profileItem">Twitter Name</label>
      <input type="text" name="twitter" class="inputZone" v-model="twitter">
      <label for="display_name" class="profileItem">Github Name</label>
      <input type="text" name="github" class="inputZone" v-model="github">
      <label for="atcoder" class="profileItem">Atcoder Name</label>
      <input type="text" name="atcoder" class="inputZone" v-model="atcoder">
      <input type="submit" value="保存する">
      <ErrorMessage :error="sessionError"/>
    </form>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'editProfile',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      user_name: '',
      profile_scope: '',
      left: false,
      display_name: '',
      real_name: '',
      description: '',
      grade: '',
      department: '',
      twitter: '',
      github: '',
      atcoder: '',
    };
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapState('session', ['sessionID']),
    ...mapState('editUser', ['res', 'sessionError']),
  },
  created() {
    this.profile_scope = this.userData.profile_scope === 'PUBLIC' ? 1 : 0;
    this.left = this.userData.left;
    this.display_name = this.userData.display_name;
    this.real_name = this.userData.full_name;
    this.description = this.userData.description;
    this.grade = this.userData.grade;
    if (this.userData.department != null) {
      this.department = String(this.userData.department.department_id);
    } else {
      this.department = '0';
    }
    this.twitter = this.userData.twitter_screen_name;
    this.github = this.userData.github_user_name;
    this.atcoder = this.userData.atcoder_user_name;
  },
  methods: {
    ...mapActions('editUser', ['sendProfile']),
    async packProfile() {
      const payload = {
        full_name: this.real_name,
        description: this.description,
        grade: Number(this.grade),
        left: this.left,
        role_id: Number(this.userData.role),
        twitter_screen_name: this.twitter,
        github_user_name: this.github,
        atcoder_user_name: this.atcoder,
        department_id: Number(this.department),
        profile_scope: Number(this.profile_scope),
        display_name: this.display_name,
      };
      await this.sendProfile({
        userProfile: payload,
        sessionID: this.sessionID,
      });
    },
  },
};
</script>


<style scoped>
#page {
  margin-left: 10vw;
  margin-right: 10vw;
  color: #666666;
}
#uname {
  font-size: 25px;
}
.profileItem {
  font-weight: bold;
  display: block;
}
.profileItem#left {
  display: inline;
}
.inputZone {
  display: block;
}
.inputZone#leftIn {
  display: inline;
}
</style>
