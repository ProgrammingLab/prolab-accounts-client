<template>
  <div class="home">
    <h1><img class="logo" src="@/assets/logo.svg" alt="ProLab" /></h1>
    <section>
      <h2>部員募集中!</h2>
      <p>
        久留米高専プロラボ部は平日授業を終えた学生が集まり次第、電気電子・制御情報工学科棟のSJ（制御情報実験室）で活動しています。<br />
        興味のある方は、活動時間にSJ教室を訪ねてみてくださいね！
      </p>
    </section>

    <section class="achievements-list">
      <h2>戦歴</h2>
      <div>
        <AchievementsList />
      </div>
    </section>

    <section class="member-list">
      <h2>部員一覧</h2>
      <div>
        <publicMemberList include-left-user />
      </div>
    </section>

    <footer>
      <div v-if="loggedIn">
        <router-link to="/editprofile">プロフィール編集</router-link>
        <router-link :to="{ name: 'editAchievements' }" exact>実績編集</router-link>
        <Logout />
      </div>
      <div v-else>
        <router-link to="/login">ログイン</router-link>
      </div>
      <small>&copy; Programming Laboratory, 2019</small>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AchievementsList from '@/components/AchievementsList.vue';
import Logout from '@/components/Logout.vue';
import publicMemberList from '@/components/PublicMemberList.vue';

export default {
  name: 'Home',
  metaInfo: {
    title: process.env.VUE_APP_TITLE,
    titleTemplate: null,
  },
  components: {
    AchievementsList,
    Logout,
    publicMemberList,
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
  },
};
</script>

<style scoped>
@keyframes slide {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

footer div {
  text-align: center;
}

footer a {
  display: inline-block;
  padding: 12px;
  border-bottom: 2px #333 solid;
  color: black;
  margin: 0 4px 24px;
}

footer small {
  display: block;
}

.home {
  max-width: 1500px;
  margin: 40px auto;
}

.achievements-list > div,
.member-list > div {
  margin-left: 60px;
  margin-right: 30px;
}

h1 {
  margin-left: 5px;
}

h1 img {
  max-width: 400px;
  width: 80%;
}

section {
  margin: 40px 0;
}

h2 {
  background-color: black;
  display: inline-block;
  color: white;
  font-weight: 200;
  line-height: 1.1;
  font-size: 3rem;
  padding: 0 20px 0 60px;
  margin-bottom: 10px;
  position: relative;
}

h2::after {
  display: block;
  height: 100%;
  content: '';
  position: absolute;
  background-color: white;
  top: 0;
  right: 0;
  animation: slide 0.5s cubic-bezier(0, 0, 0.16, 0.96);
}

p {
  margin-left: 60px;
  margin-right: 20px;
}

small {
  text-align: center;
}

@media screen and (max-width: 480px) {
  h1 {
    margin-left: 30px;
  }
  h2 {
    padding-left: 30px;
    font-size: 2rem;
  }
  p {
    margin-left: 30px;
  }
  .achievements-list > div,
  .member-list > div {
    margin-left: 30px;
  }
}
</style>
