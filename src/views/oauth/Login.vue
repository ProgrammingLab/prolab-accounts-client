<template>
  <div class="container">
    <ErrorMessage :error="challengeError"/>
    <div v-if="checkingChallenge">Please Wait</div>
    <div v-else-if="!challengeError">
      <div class="box">
        <img class="logo" src="../../assets/logo.svg" alt="ProLab">
        <form v-on:submit.prevent="onLogin">
          <label for="id">Name or Email Address</label>
          <input required type="text" v-model="name">
          <label for="password">Password</label>
          <input required type="password" v-model="password">
          <button type="submit">Log in</button>
          <ErrorMessage :error="loginError"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  img {
    width: 40%;
    margin-bottom: 20px;
  }

  .box {
    margin: 0 2em;
  }

  input[type="text"], input[type="password"] {
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

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'oauthLogin',
  metaInfo: {
    title: 'OAuth Login',
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      password: '',
      loginChallenge: '',
    };
  },
  computed: {
    ...mapState('oauthLogin', [
      'checkingChallenge',
      'skip',
      'redirectURL',
      'challengeError',
      'loginError',
    ]),
  },
  methods: {
    ...mapActions('oauthLogin', [
      'startOAuthLogin',
      'login',
    ]),
    onLogin() {
      this.login({
        challenge: this.loginChallenge,
        name: this.name,
        password: this.password,
      });
    },
  },
  async created() {
    this.loginChallenge = this.$route.query.login_challenge;
    this.startOAuthLogin(this.loginChallenge);
  },
  watch: {
    redirectURL(newURL) {
      if (newURL) {
        window.location.href = newURL;
      }
    },
  },
};
</script>
