<template>
  <div class="container">
    <section class="section">
      <h1 class="title">部員の招待</h1>
      <div>
        <form v-on:submit.prevent="onInvite">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <textarea
                class="textarea"
                :placeholder="'hoge@example.com\nfuga@example.com\npiyo@example.com\n...'"
                v-model="emails"
              ></textarea>
            </div>
          </div>
          <div class="control">
            <button type="submit" class="button">招待</button>
          </div>
          <ErrorMessage :error="invitationError"/>
        </form>
      </div>
    </section>
    <section class="section">
      <h1 class="title">招待されたメールアドレス</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>メールアドレス</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invitation in invitations" :key="invitation.invitation_id">
            <th>{{ invitation.invitation_id }}</th>
            <td>{{ invitation.email }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import { mapState, mapActions } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      emails: null,
    };
  },
  created() {
    this.listInvitations(this.sessionID);
  },
  computed: {
    ...mapState('invitation', ['invitations', 'invitationError']),
    ...mapState('session', ['sessionID']),
  },
  methods: {
    ...mapActions('invitation', ['listInvitations', 'invite']),
    onInvite() {
      this.invite({ sessionID: this.sessionID, rawEmails: this.emails });
      this.emails = null;
    },
  },
};
</script>

<style>
</style>
