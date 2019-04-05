<template>
  <div class="container">
    <div class="box">
      <img class="logo" src="../assets/logo.svg" alt="ProLab">
      <form v-on:submit.prevent="onLogin">
        <label for="id">Email Address</label>
        <input required type="text" v-model="address">
        <button type="submit">Submit</button>
        <ErrorMessage :error="loginError"/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'resetPassword',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      address: '',
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