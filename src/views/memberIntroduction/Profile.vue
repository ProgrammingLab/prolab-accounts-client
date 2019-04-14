<template>
  <div>
    <img :src="memberProfile.icon_url" alt="User Avatar">
    <dl>
      <dt>名前</dt>
      <dd>{{ memberProfile.display_name || memberProfile.name }}</dd>

      <dt>学年</dt>
      <dd>{{ memberProfile.left ? "卒業生" : memberProfile.grade + "年" }}</dd>

      <dt>学科</dt>
      <dd>{{ memberProfile.department.name }}</dd>

      <dt>自己紹介</dt>
      <dd class="small">{{ memberProfile.description }}</dd>

      <dt v-if="memberProfile.role">役職</dt>
      <dd>{{ memberProfile.role }}</dd>

      <dt>Twitter</dt>
      <dd class="english"><a :href="twitter_url" target="_blank" rel="noopener noreferrer">
        {{ memberProfile.twitter_screen_name }}
      </a></dd>

      <dt>GitHub</dt>
      <dd class="english"><a :href="github_url" target="_blank" rel="noopener noreferrer">
        {{ memberProfile.github_user_name }}
      </a></dd>

      <dt>AtCoder</dt>
      <dd class="english"><a :href="atcoder_url" target="_blank" rel="noopener noreferrer">
        {{ memberProfile.atcoder_user_name }}
      </a></dd>
    </dl>
  </div>
</template>

<style scoped>
div {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

div img {
  width: 30%;
  height: auto;
  margin-right: 10%;
}

div dl {
  width: 60%;
}

dd {
  font-size: 3rem;
}

dd.small {
  font-size: 1.5rem;
}

.english {
  font-family: 'Noto Sans JP', sans-serif;
}

@media screen and (max-width: 480px) {
  div img, div dl {
    width: 100%;
  }
  dd {
    font-size: 1.5rem;
  }
}
</style>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import utils from '@/utils';

const { IdToURLHelper } = utils;

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: `${this.memberProfile.display_name || this.memberProfile.name}${this.memberProfile.display_name ? `(${this.memberProfile.name})` : ''}`,
    };
  },
  computed: {
    ...mapState('memberIntroduction/memberProfile', [
      'memberProfileError',
      'memberProfile',
    ]),
    atcoder_url() { return IdToURLHelper.AtCoder(this.memberProfile.atcoder_user_name); },
    github_url() { return IdToURLHelper.GitHub(this.memberProfile.github_user_name); },
    twitter_url() { return IdToURLHelper.Twitter(this.memberProfile.twitter_screen_name); },
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
