<template>
  <div id="app">
    <error-page v-if="isError"/>
    <loading-indicator/>
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
    titleTemplate: '%s - Programming Lab',
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
