<template>
  <section class="section">
    <div class="container">
      <h1 class="title">部員の招待</h1>
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
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  created() {
    this.listInvitations(this.sessionID);
  },
  computed: {
    ...mapState('invitation', ['invitations']),
    ...mapState('session', ['sessionID']),
  },
  methods: {
    ...mapActions('invitation', ['listInvitations']),
  },
};
</script>

<style>
</style>
