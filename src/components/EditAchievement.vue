<template>
  <form v-on:submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input
        id="title"
        type="text"
        placeholder="プロラボアカウント"
        maxlength="127"
        v-model="achievement.title"
      >
    </div>
    <div>
      <label for="title">賞</label>
      <input
        id="award"
        type="text"
        placeholder="第n回ほげコンテスト優秀賞"
        maxlength="127"
        v-model="achievement.award"
      >
    </div>
    <div>
      <label for="url">URL</label>
      <input
        id="url"
        type="text"
        placeholder="https://example.com"
        maxlength="1023"
        v-model="achievement.url"
      >
    </div>
    <div>
      <label for="description">詳細</label>
      <textarea
        id="description"
        placeholder="プログラミングラボ部の認証基盤です。"
        maxlength="1023"
        v-model="achievement.description"
      />
    </div>
    <div>
      <label for="happened_at">作成日</label>
      <input id="happened_at" type="date" v-model="happenedAt">
    </div>
    <div>
      <label for="members">参加メンバー</label>
      <multiselect
        id="members"
        v-model="achievement.members"
        :options="members"
        :multiple="true"
        :searchable="true"
        :loading="searching || debouncing"
        :internal-search="false"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        @search-change="searchChange($event)"
        placeholder="ユーザー名で検索"
        label="name"
        track-by="user_id"
        :preselect-first="true"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
          <div v-if="values.length && !isOpen">
            <span class="custom__tag" v-for="user in values" :key="user.user_id">@{{ user.name }}</span>
          </div>
        </template>
        <template slot="tag" slot-scope="{ option }">
          <span class="custom__tag">
            <span>@{{ option.name }}</span>
          </span>
        </template>
        <template slot="option" slot-scope="{ option }">
          <div class="option__desc">
            <img class="option-image" :src="option.icon_url" alt="No icon">
            <span class="option__title">@{{ option.name }}</span>
          </div>
        </template>
        <span slot="noResult">ユーザーが見つかりません</span>
      </multiselect>
    </div>
    <div>
      <input type="submit" value="保存">
      <button v-on:click.prevent="$emit('close')">キャンセル</button>
      <button v-on:click.prevent="onDelete">削除</button>
    </div>
    <div>
      <ErrorMessage :error="achievementError"/>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounceTime } from 'rxjs/operators';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Multiselect from 'vue-multiselect';

export default {
  name: 'editAchievement',
  props: ['defaultAhievement'],
  components: {
    ErrorMessage,
    Multiselect,
  },
  data() {
    return {
      debouncing: false,
      achievement: {
        achievement_id: this.defaultAhievement.achievement_id,
        title: this.defaultAhievement.title,
        award: this.defaultAhievement.award,
        url: this.defaultAhievement.url,
        description: this.defaultAhievement.description,
        happened_at: this.defaultAhievement.happened_at,
        members: this.defaultAhievement.members ? this.defaultAhievement.members.slice() : [],
      },
    };
  },
  observableMethods: {
    searchChange: 'searchChange$',
  },
  computed: {
    ...mapState('session', ['sessionID']),
    ...mapState('achievement', ['achievementError']),
    ...mapState('memberIntroduction/searchPrivateMembers', ['members', 'searchError', 'searching']),
    happenedAt: {
      get() {
        if (!this.achievement.happened_at) {
          return null;
        }
        const date = this.achievement.happened_at.substring(0, '2019-01-01'.length);
        return date;
      },
      set(newValue) {
        this.achievement.happened_at = `${newValue}T00:00:00Z`;
      },
    },
  },
  methods: {
    ...mapActions('achievement', ['saveAchievement', 'deleteAchievement']),
    ...mapActions('memberIntroduction/searchPrivateMembers', ['searchMembers']),
    onSubmit() {
      this.saveAchievement({ sessionID: this.sessionID, achievement: this.achievement });
    },
    onDelete() {
      this.deleteAchievement({ sessionID: this.sessionID, achievement: this.achievement });
    },
    onSearchChanged(query) {
      this.searchMembers({ sessionID: this.sessionID, query });
    },
  },
  created() {
    this.searchMembers({ sessionID: this.sessionID });
    this.searchChange$.subscribe({
      next: () => {
        this.debouncing = true;
      },
    });
    this.searchChange$.pipe(debounceTime(100)).subscribe({
      next: (query) => {
        this.debouncing = false;
        this.onSearchChanged(query);
      },
    });
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
img.option-image {
  width: 24px;
  height: auto;
  margin-right: 5px;
}
</style>
