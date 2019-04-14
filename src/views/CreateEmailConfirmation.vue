<template>
  <div class="container">
    <div class="box">
      <h1>メールアドレス変更</h1>
      <form v-on:submit.prevent="onCreateEmailConfirmation">
        <label for="new_email">新しいメールアドレス</label>
        <input required type="email" id="new_email" v-model="new_email">
        <label for="password">パスワード</label>
        <input required type="password" id="password" v-model="password">
        <button type="submit">Confirm</button>
      </form>
      <ErrorMessage :error="emailConfirmationError"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'createEmailConfirmation',
  metaInfo: {
    title: 'Change Email',
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      new_email: '',
      password: '',
    };
  },
  computed: {
    ...mapState('emailConfirmations', [
      'emailConfirmationError',
    ]),
    ...mapState('session', [
      'sessionID',
    ]),
  },
  methods: {
    ...mapActions('emailConfirmations', [
      'CreateEmailConfirmation',
    ]),
    async onCreateEmailConfirmation() {
      await this.CreateEmailConfirmation({
        session: this.sessionID,
        new_email: this.new_email,
        password: this.password,
      });
      if (!this.emailConfirmationError) {
        this.$router.push({ name: 'home' });
      }
    },
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

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border-width: 0 0 2px;
  margin-bottom: 20px;
}

button[type="submit"] {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;
  color: #FFF;
  border-radius: 3px;
}
</style>
