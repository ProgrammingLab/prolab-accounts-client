<template>
  <div class="container">
    <div class="box">
      <form v-on:submit.prevent='onRegister'>
        <label for="username">User Name</label>
        <input required type="text" v-model="name">
        <label for="full_name">Full Name</label>
        <input required type="text" v-model="full_name">
        <label for="password">Password</label>
        <input required type="password" v-model="password">
        <button type="submit">Register</button>
        <ErrorMessage :error="registrationError"/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'registration',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      full_name: '',
      password: '',
      registration_token: '',
    };
  },
  computed: {
    ...mapState('user', [
      'registrationError',
    ]),
    ...mapState('session', [
      'loginError',
    ]),
  },
  mounted() {
    this.registration_token = this.$route.params.token;
  },
  methods: {
    ...mapActions('user', [
      'register',
    ]),
    ...mapActions('session', [
      'login',
    ]),
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