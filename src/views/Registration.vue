<template>
  <div class="container">
    <div class="box">
      <h1>新規登録</h1>
      <form @submit.prevent="onRegister">
        <label for="username">ユーザーネーム</label>
        <input id="username" v-model="name" required type="text" />
        <div v-if="isUserNameViolated && name.length !== 0" class="errorMessage">
          ユーザーネームは英数字と_のみを使用し20文字以下にしてください
        </div>
        <label for="full_name">フルネーム</label>
        <input id="full_name" v-model="full_name" required type="text" />
        <label for="password">パスワード</label>
        <input id="password" v-model="password" required type="password" />
        <div v-if="isUserPasswordViolated && password.length !== 0" class="errorMessage">
          パスワードの長さは6文字以上72文字以下にしてください
        </div>
        <label for="password_confirm">パスワード(確認)</label>
        <input id="password_confirm" v-model="password_confirm" required type="password" />
        <div v-if="passwordConfirmationError && password_confirm.length !== 0" class="errorMessage">
          パスワードが一致しません
        </div>
        <button
          type="submit"
          :disabled="isUserNameViolated || passwordConfirmationError || isUserPasswordViolated"
        >
          Register
        </button>
        <ErrorMessage :error="registrationError" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'Registration',
  metaInfo: {
    title: '部員登録',
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      full_name: '',
      password: '',
      password_confirm: '',
      registration_token: '',
    };
  },
  computed: {
    ...mapState('user', ['tokenVerificationError', 'registrationError']),
    ...mapState('session', ['loginError']),
    isUserNameViolated() {
      return !/^[A-Za-z0-9_]{1,20}$/.test(this.name);
    },
    passwordConfirmationError() {
      if (this.password_confirm.length === 0) return true;
      return this.password !== this.password_confirm;
    },
    isUserPasswordViolated() {
      const passwordLength = this.password.length;
      return passwordLength < 6 || passwordLength > 72;
    },
  },
  async created() {
    this.registration_token = this.$route.params.token;
    await this.verifyRegistrationToken(this.registration_token);
    if (this.tokenVerificationError) {
      this.createError(this.tokenVerificationError);
    }
  },
  methods: {
    ...mapActions('criticalError', ['createError']),
    ...mapActions('user', ['verifyRegistrationToken', 'register']),
    ...mapActions('session', ['login']),
    async onRegister() {
      await this.register({
        name: this.name,
        full_name: this.full_name,
        password: this.password,
        registration_token: this.registration_token,
      });
      if (!this.registrationError) {
        await this.login({ name: this.name, password: this.password });
        if (this.loginError) {
          this.$router.push({ name: 'login' });
        } else {
          this.$router.push({ name: 'home' });
        }
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

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  border-width: 0 0 2px;
  margin-bottom: 20px;
}

button[type='submit'] {
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
  color: #fff;
  border-radius: 3px;
}
button[type='submit']:disabled {
  background: #a9b8d1;
}

.errorMessage {
  color: red;
}
</style>
