<template>
  <div id="app">
    <error-page v-if="isError"/>
    <h1><img class="logo" src="@/assets/logo.svg" alt="ProLab"></h1>
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
html {
  height: 100%;
}

body {
  font-family: 'Noto Sans JP', sans-serif;
  height: 100%;
}

#app {
  height: 100%;
  }

h1 {
  margin-left: 5px;
}

h1 img {
  max-width: 400px;
  width: 80%;
}

@media screen and (max-width: 480px) {
  h1 {
    margin-left: 30px;
  }
}

</style>
