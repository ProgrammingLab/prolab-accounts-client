<template>
  <div id="container">
    <div id="error">
        <h1 id="title">{{ number }}</h1>
        <p id="message">{{ message }}</p>
        <router-link :to="{ name: 'home' }">
            Go to home page
        </router-link>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#error {
  margin: auto;
}
#title {
  font-size: 5em;
  text-align: center;
}
#message {
  font-size: 2em;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('criticalError', [
      'number',
      'message',
    ]),
  },
};
</script>
