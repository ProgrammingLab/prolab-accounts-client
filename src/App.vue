<template>
  <div id="app">
    <error-page v-if="isError"/>

    <header>
      <router-link :to="{ name: 'home' }">
        <img class="logo" src="@/assets/logo.svg" alt="ProLab">
      </router-link>
      <loading-indicator/>
    </header>

    <router-view v-show="!isError"/>

    <footer>
      <div v-if="loggedIn">
        <router-link to="/editprofile">プロフィール編集</router-link>
        <router-link :to="{ name: 'editAchievements' }" exact>実績編集</router-link>
        <Logout/>
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
import ErrorPage from './components/ErrorPage.vue';
import LoadingIndicator from './components/LoadingIndicator.vue';
import Logout from '@/components/Logout.vue';

export default {
  components: {
    ErrorPage,
    LoadingIndicator,
    Logout,
  },
  computed: {
    ...mapGetters('criticalError', ['isError']),
    ...mapGetters('session', ['loggedIn']),
  },
  metaInfo: {
    title: 'Untitled',
    titleTemplate: `%s - ${process.env.VUE_APP_TITLE}`,
  },
};
</script>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
}

header {
  position: sticky;
  top: 0;
  z-index: 127;
  width: 100%;
  padding-top: 10px;
  max-width: 1500px;
  margin: 0 auto;
  border-bottom: 4px #333 solid;
  background: rgba(255, 255, 255, 0.8);
}

header img {
  max-width: 250px;
  width: 40%;
  margin: 20px 40px;
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

small {
  text-align: center;
}

@media screen and (max-width: 480px) {
  header img {
    margin-left: 30px;
  }
}
</style>
