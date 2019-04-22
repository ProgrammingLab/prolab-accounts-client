<template>
  <div id="app">
    <error-page v-if="isError"/>
    <section id="header">
      <router-link :to="{ name: 'home' }">
        <img class="logo" src="@/assets/logo.svg" alt="ProLab">
      </router-link>
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 127;
  background-color: white;
  box-shadow: 0 3px 2px black;
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
