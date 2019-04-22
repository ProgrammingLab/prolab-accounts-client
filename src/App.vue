<template>
  <div id="app">
    <error-page v-if="isError"/>
    <section id="header">
      <img class="logo" src="@/assets/logo.svg" alt="ProLab">
    </section>
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

#header {
  margin-left: 5px;
}

#header img {
  max-width: 400px;
  width: 80%;
}

@media screen and (max-width: 480px) {
  #header {
    margin-left: 30px;
  }
}

</style>
