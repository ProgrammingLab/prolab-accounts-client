<template>
<div class="container">
  <section class="section">
    <h1 class="title">プロフィール編集</h1>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Text input" value="bulma">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <p class="help is-success">This username is available</p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p class="help is-danger">This email is invalid</p>
    </div>

    <div class="field">
      <label class="label">Subject</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="question">
          No
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text">Cancel</button>
      </div>
    </div>
  </section>
</div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'editProfile',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      user_name: '',
      profile_scope: '',
      left: false,
      display_name: '',
      real_name: '',
      description: '',
      grade: '',
      department: '',
      twitter: '',
      github: '',
      atcoder: '',
    };
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapState('session', ['sessionID']),
    ...mapState('editUser', ['res', 'updateError']),
  },
  created() {
    this.profile_scope = this.userData.profile_scope === 'PUBLIC' ? 1 : 0;
    this.left = this.userData.left;
    this.display_name = this.userData.display_name;
    this.real_name = this.userData.full_name;
    this.description = this.userData.description;
    this.grade = this.userData.grade;
    if (this.userData.department != null) {
      this.department = String(this.userData.department.department_id);
    } else {
      this.department = '0';
    }
    this.twitter = this.userData.twitter_screen_name;
    this.github = this.userData.github_user_name;
    this.atcoder = this.userData.atcoder_user_name;
  },
  methods: {
    ...mapActions('editUser', ['sendProfile']),
    async packProfile() {
      const payload = {
        full_name: this.real_name,
        description: this.description,
        grade: Number(this.grade),
        left: this.left,
        role_id: Number(this.userData.role),
        twitter_screen_name: this.twitter,
        github_user_name: this.github,
        atcoder_user_name: this.atcoder,
        department_id: Number(this.department),
        profile_scope: Number(this.profile_scope),
        display_name: this.display_name,
      };
      await this.sendProfile({
        userProfile: payload,
        sessionID: this.sessionID,
      });
    },
  },
};
</script>


<style scoped>
#page {
  margin-left: 10vw;
  margin-right: 10vw;
  color: #666666;
}
#uname {
  font-size: 25px;
}
.profileItem {
  font-weight: bold;
  display: block;
}
.profileItem#left {
  display: inline;
}
.inputZone {
  display: block;
}
.inputZone#leftIn {
  display: inline;
}
</style>
