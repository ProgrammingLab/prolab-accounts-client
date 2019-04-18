<template>
  <div class="container">
    <div class="box">
      <h1>メールアドレス変更</h1>
      <div>メールアドレスが変更されました</div>
      <router-link :to="{ name: 'home' }" exact>
        Go to home page
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'confirmEmail',
  metaInfo: {
    title: 'メールアドレス確認',
  },
  computed: {
    ...mapState('emailConfirmations', [
      'emailConfirmationError',
    ]),
    ...mapState('session', [
      'sessionID',
    ]),
  },
  async created() {
    this.token = this.$route.params.token;
    await this.ConfirmEmail({
      session: this.sessionID,
      token: this.token,
    });
    if (this.emailConfirmationError) {
      this.createError(this.emailConfirmationError);
    }
  },
  methods: {
    ...mapActions('criticalError', [
      'createError',
    ]),
    ...mapActions('emailConfirmations', [
      'ConfirmEmail',
    ]),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 1024px;
  margin: auto;
}

.box {
  margin: 0 2em;
}
</style>
