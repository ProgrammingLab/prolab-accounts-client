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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorPage from './components/ErrorPage.vue';
import LoadingIndicator from './components/LoadingIndicator.vue';

export default {
  components: {
    ErrorPage,
    LoadingIndicator,
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
}

header {
  position: sticky;
  top: 0;
  z-index: 127;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 5px black;
}

header img {
  max-width: 400px;
  width: 80%;
  margin-left: 5px;
  padding: 3px;
}


@media screen and (max-width: 480px) {
  header img {
    margin-left: 30px;
  }
}
</style>
