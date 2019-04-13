<template>
  <form v-on:submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input id="title" type="text" placeholder="プロラボアカウント" v-model="achievement.title">
    </div>
    <div>
      <label for="title">賞</label>
      <input id="award" type="text" placeholder="第n回ほげコンテスト優秀賞" v-model="achievement.award">
    </div>
    <div>
      <label for="url">URL</label>
      <input id="url" type="text" placeholder="https://example.com" v-model="achievement.url">
    </div>
    <div>
      <label for="description">詳細</label>
      <textarea
        id="description"
        placeholder="プログラミングラボ部の認証基盤です。"
        v-model="achievement.description"
      />
    </div>
    <div>
      <label for="happened_at">作成日</label>
      <input id="happened_at" type="date" v-model="happenedAt">
    </div>
    <div>
      <input type="submit" value="保存">
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'editAchievement',
  props: ['defaultAhievement'],
  data() {
    return {
      achievement: {
        achievement_id: this.defaultAhievement.achievement_id,
        title: this.defaultAhievement.title,
        award: this.defaultAhievement.award,
        url: this.defaultAhievement.url,
        description: this.defaultAhievement.description,
        happened_at: this.defaultAhievement.happened_at,
        members: this.defaultAhievement.members.slice(),
      },
    };
  },
  computed: {
    ...mapState('session', ['sessionID']),
    happenedAt: {
      get() {
        const date = this.achievement.happened_at.substring(0, '2019-01-01'.length);
        return date;
      },
      set(newValue) {
        this.achievement.happened_at = `${newValue}T00:00:00Z`;
      },
    },
  },
  methods: {
    ...mapActions('achievement', ['saveAchievement']),
    onSubmit() {
      console.log(this.sessionID);
      this.saveAchievement({ sessionID: this.sessionID, achievement: this.achievement });
    },
  },
};
</script>

<style>
</style>
