<template>
  <div id="background">
    <div id="container">
      <img width="200" height="70" src="http://placehold.jp/60/ffffff/666666/200x70.png?text=ProLab" alt="prolag">
      <form @submit.prevent="onLogin">
        <label>
          Username
          <input type="text" autocomplete="username" v-model="name"/>
        </label>
        <label>
          Password
          <input type="password" autocomplete="current-password" v-model="password"/>
        </label>
        <ErrorMessage :error="loginError"/>
        <button type="submit" :disabled="!password || !name">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'login',
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
  #background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  #container {
    width: 50%;
    height: 50%;
  }
  form {
    margin-top: 1em;
  }
  input {
    outline: none;
    padding-top: 0.5em;
    width: 100%;
    border: none;
    border-bottom: 2px solid #888888;
    background: transparent;
  }
  input:focus {
    border-bottom: 2px solid #333333;
  }
  button {
    float: right;
    margin-top: 0.5em;
    background-color: transparent;
    border: 1px solid;
    outline: none;
    color: #333333;
  }
  button:disabled {
    color: #888888;
  }
  label {
    width: 100%;
  }

</style>
