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
      <input required type="checkbox" id="checkbox" value="enabled" v-model="profile_publish">
      <label for="checkbox">プロフィールを公開する</label>
      <br>
      <label for="display_name" class="profileItem">表示名</label>
      <br>
      <input type="text" v-model="display_name">
      <br>
      <label for="real_name" class="profileItem">本名</label>
      <br>
      <input type="text" value="Real User" v-model="real_name">
      <br>
      <label for="grade" class="profileItem">学年</label>
      <br>
      <select v-model="grade">
        <option disabled value="0">Please Select</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <br>
      <label for="department" class="profileItem">学科</label>
      <br>
      <input type="text" name="department" v-model="department">
      <br>
      <label for="display_name" class="profileItem">Twitter ID</label>
      <br>
      <input type="text" name="Twitter" v-model="Twitter">
      <br>
      <label for="display_name" class="profileItem">Github Name</label>
      <br>
      <input type="text" name="Github" v-model="Github">
      <br>
      <input type="submit" value="保存する">
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user_name: 'user',
      profile_publish: true,
      display_name: 'user',
      real_name: 'Real_user',
      grade: '0',
      department: 'S',
      Twitter: '@TwitterUser',
      Github: 'Github',
    };
  },
  methods: {
    sendProfile() {
      // data send
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
}
</style>
