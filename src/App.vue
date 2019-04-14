<template>
  <div id="app">
    <error-page v-if="isError"/>
    <router-view v-else/>
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
