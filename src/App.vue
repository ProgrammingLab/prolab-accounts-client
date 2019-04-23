<template>
  <div id="app">
    <error-page v-if="isError"/>
    <loading-indicator class="loading"/>
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

.loading {
  position: fixed;
  top: 0;
  z-index: 127;
}
</style>
