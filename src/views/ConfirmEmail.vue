<template>
  <div class="container">
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'confirmEmail',
  data() {
    return {
      name: '',
      full_name: '',
      password: '',
      password_confirm: '',
      passwordConfirmationError: false,
      registration_token: '',
    };
  },
  computed: {
    ...mapState('email_confirmations', [
      'emailConfirmationError',
    ]),
  },
  async created() {
    this.token = this.$route.params.token;
    await this.ConfirmEmail(this.token);
    if (this.emailConfirmationError) {
      this.createError(this.emailConfirmationError);
    } else {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    ...mapMutations('criticalError', [
      'createError',
    ]),
    ...mapActions('email_confirmations', [
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
</style>
