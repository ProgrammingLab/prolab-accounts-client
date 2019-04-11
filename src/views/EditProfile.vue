<template>
  <div class="container">
    <section class="section">
      <h1 class="title">プロフィール編集</h1>
      <form v-on:submit.prevent="packProfile">
        <label class="label">本名</label>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="山村 大介" v-model="real_name" />
          </div>
          <p class="help">※この項目は公開範囲設定に関わらず外部に公開されません</p>
        </div>
        <label class="label">表示名</label>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="mucho613" v-model="display_name" />
          </div>
        </div>
        <label class="label">学年</label>
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="grade" :disabled="left">
                <option disabled value="0">Please Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="left">
              卒部済み
            </label>
          </div>
        </div>
        <label class="label">学科</label>
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="department">
                <option disabled value="0">Please Select</option>
                <option value="1">S</option>
                <option value="2">A</option>
                <option value="3">E</option>
                <option value="4">C</option>
                <option value="5">M</option>
              </select>
            </div>
          </div>
        </div>
        <label class="label">Description</label>
        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="description"></textarea>
          </div>
        </div>
        <label class="label">Twitter Screen Name</label>
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static">
              @
            </a>
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" v-model="twitter">
          </p>
        </div>
        <label class="label">GitHub User Name</label>
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static">
              https://github.com/
            </a>
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" v-model="github">
          </p>
        </div>
        <label class="label">AtCoder User Name</label>
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="atcoder" />
          </div>
        </div>
        <label class="label">公開範囲</label>
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="profile_scope">
                <option value="0">部員にのみ公開</option>
                <option value="1">外部にも公開</option>
              </select>
            </div>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary" type="submit">送信</button>
        </div>
        <ErrorMessage :error="updateError"/>
      </form>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.min.css';
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
