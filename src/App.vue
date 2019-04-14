<template>
  <div id="app">
    <error-page v-if="isError"/>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorPage from './views/errors/ErrorPage.vue';

export default {
  components: {
    ErrorPage,
  },
  computed: {
    ...mapGetters('criticalError', ['isError']),
  },
  metaInfo: {
    title: 'Prolab Accounts Client',
    titleTemplate: '%s - Prolab Accounts',
  },
};
</script>

<style>
  html { height: 100%; }
  body {
    font-family: 'Noto Sans JP', sans-serif;
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>
