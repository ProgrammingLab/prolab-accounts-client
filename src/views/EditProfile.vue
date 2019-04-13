<template>
  <div class="container">
    <section class="section">
      <h1 class="title">プロフィール編集</h1>
      <form v-on:submit.prevent="updateProfile">
        <label class="label">アイコン</label>
        <ImageSelector :src="iconURL" @onChange="onImageChange"/>
        <label class="label">本名</label>
        <div class="field">
          <div class="control">
            <input
              class="input"
              :class="{'is-danger': realNameIsInvalid}"
              type="text"
              placeholder="山村 大介"
              v-model="realName"
            />
          </div>
          <p class="help">※この項目は公開範囲設定に関わらず外部に公開されません</p>
          <p class="help is-danger" v-if="realNameIsInvalid">127文字以下にしてください</p>
        </div>
        <label class="label">表示名</label>
        <div class="field">
          <div class="control">
            <input
              class="input"
              :class="{'is-danger': displayNameIsInvalid}"
              type="text"
              placeholder="mucho613"
              v-model="displayName"
            />
          </div>
          <p class="help is-danger" v-if="displayNameIsInvalid">50文字以下にしてください</p>
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
                <option value="1">制御情報工学科</option>
                <option value="2">機械工学科</option>
                <option value="3">電気電子工学科</option>
                <option value="4">生物応用科学科</option>
                <option value="5">材料システム工学科</option>
              </select>
            </div>
          </div>
        </div>
        <label class="label">Description</label>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              :class="{ 'is-danger': descriptionIsInvalid }"
              v-model="description"
            ></textarea>
          </div>
          <p class="help is-danger" v-if="descriptionIsInvalid">1023文字以下にしてください</p>
        </div>
        <label class="label">Twitter Screen Name</label>
        <div class="field has-addons flex-wrap">
          <p class="control">
            <a class="button is-static">
              @
            </a>
          </p>
          <p class="control is-expanded">
            <input
              class="input right-radios-4"
              :class="{'is-danger': twitterScreenNameIsInvalid}"
              type="text"
              v-model="twitterScreenName"
            >
          </p>
          <p class="help is-danger w-100" v-if="twitterScreenNameIsInvalid">127文字以下にしてください</p>
        </div>
        <label class="label">GitHub User Name</label>
        <div class="field has-addons flex-wrap">
          <p class="control">
            <a class="button is-static">
              https://github.com/
            </a>
          </p>
          <p class="control is-expanded">
            <input
              class="input right-radios-4"
              :class="{'is-danger': githubUserNameIsInvalid}"
              type="text"
              v-model="githubUserName"
            >
          </p>
          <p class="help is-danger w-100" v-if="githubUserNameIsInvalid">127文字以下にしてください</p>
        </div>
        <label class="label">AtCoder User Name</label>
        <div class="field has-addons flex-wrap">
          <p class="control">
            <a class="button is-static">
              https://atcoder.jp/users/
            </a>
          </p>
          <p class="control is-expanded">
            <input
              class="input right-radios-4"
              :class="{'is-danger': atcoderUserNameIsInvalid}"
              type="text"
              v-model="atcoderUserName"
            >
          </p>
          <p class="help is-danger w-100" v-if="atcoderUserNameIsInvalid">127文字以下にしてください</p>
        </div>
        <label class="label">公開範囲</label>
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="profileScope">
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
        <p class="has-text-danger" v-if="hasValidationError">入力値に誤りがあります</p>
        <p v-if="isSuccess">保存しました</p>
      </form>
      <router-link :to="{ name: 'home' }" exact>トップページに戻る</router-link>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.min.css';
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ImageSelector from '@/components/ImageSelector.vue';

export default {
  name: 'editProfile',
  components: {
    ErrorMessage,
    ImageSelector,
  },
  data() {
    return {
      newIcon: '',
      iconSize: 0,
      userName: '',
      profileScope: '',
      left: false,
      displayName: '',
      realName: '',
      description: '',
      grade: '',
      department: '',
      twitterScreenName: '',
      githubUserName: '',
      atcoderUserName: '',
      isSuccess: false,
      hasValidationError: false,
      realNameIsInvalid: false,
      displayNameIsInvalid: false,
      descriptionIsInvalid: false,
      twitterScreenNameIsInvalid: false,
      githubUserNameIsInvalid: false,
      atcoderUserNameIsInvalid: false,

    };
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapState('session', ['sessionID']),
    ...mapState('editUser', ['res', 'updateError']),
    iconURL() {
      return this.userData.icon_url
        || 'https://placehold.jp/000000/ffffff/150x150.png?text=No%20Image';
    },
  },
  mounted() {
    this.profileScope = this.userData.profile_scope === 'PUBLIC' ? 1 : 0;
    this.left = this.userData.left;
    this.displayName = this.userData.display_name;
    this.realName = this.userData.full_name;
    this.description = this.userData.description;
    this.grade = this.userData.grade;
    if (this.userData.department != null) {
      this.department = String(this.userData.department.department_id);
    } else {
      this.department = '0';
    }
    this.twitterScreenName = this.userData.twitter_screen_name;
    this.githubUserName = this.userData.github_user_name;
    this.atcoderUserName = this.userData.atcoder_user_name;
  },
  methods: {
    ...mapActions('editUser', ['patchProfile']),
    validation() {
      this.hasValidationError = false;
      this.realNameIsInvalid = false;
      this.displayNameIsInvalid = false;
      this.descriptionIsInvalid = false;
      this.twitterScreenNameIsInvalid = false;
      this.githubUserNameIsInvalid = false;
      this.atcoderUserNameIsInvalid = false;

      if (this.realName.length >= 128) {
        this.realNameIsInvalid = true;
        this.hasValidationError = true;
      }
      if (this.displayName.length >= 51) {
        this.displayNameIsInvalid = true;
        this.hasValidationError = true;
      }
      if (this.description.length >= 1024) {
        this.descriptionIsInvalid = true;
        this.hasValidationError = true;
      }
      if (this.twitterScreenName.length >= 128) {
        this.twitterScreenNameIsInvalid = true;
        this.hasValidationError = true;
      }
      if (this.githubUserName.length >= 128) {
        this.githubUserNameIsInvalid = true;
        this.hasValidationError = true;
      }
      if (this.atcoderUserName.length >= 128) {
        this.atcoderUserNameIsInvalid = true;
        this.hasValidationError = true;
      }
      // 画像の大きさ判定
    },
    onImageChange({ file, base64Body }) {
      this.iconSize = file.size;
      this.newIcon = base64Body;
    },
    async updateProfile() {
      this.isSuccess = false;
      this.validation();
      if (this.hasValidationError) return;
      const payload = {
        full_name: this.realName,
        description: this.description,
        grade: Number(this.grade),
        left: this.left,
        role_id: Number(this.userData.role),
        twitter_screen_name: this.twitterScreenName,
        github_user_name: this.githubUserName,
        atcoder_user_name: this.atcoderUserName,
        department_id: Number(this.department),
        profile_scope: Number(this.profileScope),
        display_name: this.displayName,
      };
      await this.patchProfile({
        userProfile: payload,
        sessionID: this.sessionID,
      });
      if (!this.updateError) this.isSuccess = true;
    },
  },
};
</script>

<style scoped>
.flex-wrap {
  flex-wrap: wrap;
}
.w-100 {
  width: 100%;
}
.right-radios-4{
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}
</style>
