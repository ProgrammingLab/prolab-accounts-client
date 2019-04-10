<template>
  <div>
    <dl>
      <dt>Name</dt> <!-- Display Name -->
      <dd>{{ memberProfile.display_name || memberProfile.name }}</dd>

      <dt>Icon</dt>
      <dd><img :src="memberProfile.icon_url" alt="user avater"></dd>

      <dt>Department</dt>
      <dd>{{ memberProfile.department }}</dd>

      <dt>Grade</dt> <!-- Left -->
      <dd>{{ memberProfile.left ? "卒業生" : memberProfile.grade }}</dd>

      <dt>Description</dt>
      <dd>{{ memberProfile.description }}</dd>

      <dt>Role</dt>
      <dd>{{ memberProfile.role }}</dd>

      <dt>Twitter</dt>
      <dd>{{ memberProfile.twitter_screen_name }}</dd>

      <dt>GitHub</dt>
      <dd>{{ memberProfile.github_user_name }}</dd>

      <dt>AtCoder</dt>
      <dd>{{ memberProfile.atcoder_user_name }}</dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'profile',
  computed: {
    ...mapState('memberIntroduction/memberProfile', [
      'memberProfileError',
      'memberProfile',
    ]),
  },
  async created() {
    const name = this.$route.params.name.toString();
    await this.getMemberProfile(name);
    if (this.memberProfileError) {
      this.createError(this.memberProfileError);
    }
  },
  methods: {
    ...mapMutations('criticalError', [
      'createError',
    ]),
    ...mapActions('memberIntroduction/memberProfile', [
      'getMemberProfile',
    ]),
  },
};
</script>
