<template>
  <a href="" v-on:click.prevent="onLogout">ログアウト</a>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'logout',
  computed: {
    ...mapState('session', [
      'sessionID',
    ]),
  },
  methods: {
    ...mapActions('session', [
      'logout',
    ]),
    async onLogout() {
      await this.logout(this.sessionID);
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
