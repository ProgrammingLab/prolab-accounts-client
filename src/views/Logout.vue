<template>
  <div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'logout',
  metaInfo: {
    title: 'ログアウト',
  },
  computed: {
    ...mapState('session', [
      'sessionID',
    ]),
  },
  async created() {
    await this.logout(this.sessionID);
    this.$router.push({ name: 'home' });
  },
  methods: {
    ...mapActions('session', [
      'logout',
    ]),
  },
};
</script>
