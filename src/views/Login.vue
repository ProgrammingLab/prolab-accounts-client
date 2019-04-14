<template>
  <div class="container">
    <div class="box">
      <img class="logo" src="../assets/logo.svg" alt="ProLab">
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
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'login',
  metaInfo: {
    title: 'ログイン',
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      password: '',
    };
  },
  computed: {
    ...mapState('session', [
      'loginError',
    ]),
    ...mapGetters('session', [
      'loggedIn',
    ]),
  },
  methods: {
    ...mapActions('session', [
      'login',
    ]),
    async onLogin() {
      await this.login({ name: this.name, password: this.password });
      if (this.loggedIn) {
        this.$router.push(this.$route.query.redirect || '/');
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
