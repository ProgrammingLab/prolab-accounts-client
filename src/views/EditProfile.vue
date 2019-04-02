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
    <p id="uname" class="profileItem">user: {{user_name}}</p>
    <form v-on:submit.prevent="sendProfile">
      <label for="checkbox" class="profileItem">プロフィールについて</label>
      <select id="checkbox" class="inputZone" v-model="profile_scope">
        <option value="PUBLIC">公開する</option>
        <option value="MEMBERS_ONLY">部員にのみ公開する</option>
      </select>
      <input type="checkbox" class="inputZone" id="leftIn" v-model="left">
      <label for="left" class="profileItem" id="left">卒部済み</label>
      <label for="display_name" class="profileItem">表示名</label>
      <input type="text" class="inputZone" v-model="display_name">
      <!-- <br>
      <label class="profileitem">アイコン画像</label>
      <input type="file" accept="image/*">-->
      <label for="real_name" class="profileItem">本名</label>
      <input type="text" value="Real User" class="inputZone" v-model="real_name">
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
        <option disabled value="null">Please Select</option>
        <option value="1">A</option>
        <option value="2">E</option>
        <option value="3">S</option>
        <option value="4">C</option>
        <option value="5">M</option>
        <option value="6">専門A</option>
        <option value="7">専門B</option>
      </select>
      <label for="display_name" class="profileItem">Twitter Name</label>
      <input type="text" name="Twitter" class="inputZone" v-model="Twitter">
      <label for="display_name" class="profileItem">Github Name</label>
      <input type="text" name="Github" class="inputZone" v-model="Github">
      <label for="Atcoder" class="profileItem">Atcoder Name</label>
      <input type="text" name="Atcoder" class="inputZone" v-model="Atcoder">
      <input type="submit" value="保存する">
    </form>
  </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      user_name: 'user',
      profile_scope: true,
      display_name: 'user',
      real_name: 'Real_user',
      grade: '0',
      department: 'S',
      Twitter: '@TwitterUser',
      Github: 'Github',
    };
  },
  computed: {
    ...mapState('user', ['userData']),
  },
  created() {
    this.user_name = this.userData.name;
    this.profile_scope = this.userData.profile_scope;
    this.display_name = this.userData.display_name;
    this.real_name = this.userData.full_name;
    this.grade = this.userData.grade;
    this.department = this.userData.department;
    this.Twitter = this.userData.twitter_screen_name;
    this.Github = this.userData.github_user_name;
  },
  methods: {
    async sendProfile() {
      // send profile
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
