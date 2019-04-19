<template>
  <div id="app">
    <error-page v-if="isError"/>
    <div v-if="isLoading">LOADING</div>
    <router-view v-show="!isError"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ErrorPage from './components/ErrorPage.vue';

export default {
  components: {
    ErrorPage,
  },
  computed: {
    ...mapGetters('criticalError', ['isError']),
    ...mapState('ui', ['isLoading']),
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
