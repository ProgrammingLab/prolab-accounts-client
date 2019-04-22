<template>
  <div id="app">
    <error-page v-if="isError"/>
    <header>
      <router-link :to="{ name: 'home' }">
        <img class="logo" src="@/assets/logo.svg" alt="ProLab">
      </router-link>
    </header>
    <router-view v-show="!isError"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorPage from './components/ErrorPage.vue';

export default {
  components: {
    ErrorPage,
  },
  computed: {
    ...mapGetters('criticalError', ['isError']),
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
  margin-top: 120px;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 127;
  background-color: white;
  box-shadow: 0 3px 2px black;
}

header img {
  max-width: 400px;
  width: 80%;
  margin-left: 5px;
}


@media screen and (max-width: 480px) {
  header img {
    margin-left: 30px;
  }
}

</style>
