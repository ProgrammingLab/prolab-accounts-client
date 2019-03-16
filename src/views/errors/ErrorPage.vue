<template>
    <div>
        <h1>{{ number }} Error</h1>
        <p>{{ message }}</p>
        <router-link to="/" exact>
            Go to home page
        </router-link>
    </div>
</template>

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
