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
        :clear-on-select="true"
        :preserve-search="true"
        @search-change="searchChange($event)"
        placeholder="ユーザー名で検索"
        selectLabel="エンターキーで選択"
        selectedLabel="メンバー"
        deselectLabel="エンターキーで削除"
        label="name"
        track-by="user_id"
        :preselect-first="true"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
          <div v-if="values.length && !isOpen">
            <span
              class="custom__tag tag"
              v-for="user in values"
              :key="user.user_id"
            >@{{ user.name }}</span>
          </div>
        </template>
        <template slot="tag" slot-scope="{ option }">
          <span class="custom__tag tag">
            <span>@{{ option.name }}</span>
          </span>
        </template>
        <template slot="option" slot-scope="{ option }">
          <div class="option__desc">
            <img class="option-image" :src="option.icon_url || require('@/assets/no_image.png')" alt="No icon">
            <span class="option__title">@{{ option.name }}</span>
          </div>
        </template>
        <span slot="noResult">ユーザーが見つかりません</span>
      </multiselect>
    </div>
    <div>
      <label for="image-select">画像</label>
      <ImageSelector
        id="image-select"
        :src="defaultAchievement.image_url"
        @onChange="onImageChange"
      />
      <p v-if="isImageTooLarge">画像サイズは1MiB以下にしてください。</p>
    </div>
    <div>
      <input class="save" type="submit" value="保存" :disabled="!isValid || sending">
      <button class="cancel" v-on:click.prevent="$emit('close')" :disabled="sending">キャンセル</button>
      <button class="erase" v-on:click.prevent="$emit('delete')" :disabled="sending">削除</button>
    </div>
    <div>
      <ErrorMessage :error="achievementError"/>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounceTime } from 'rxjs/operators';
import moment from 'moment';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Multiselect from 'vue-multiselect';
import ImageSelector from '@/components/ImageSelector.vue';

export default {
  name: 'editAchievement',
  props: ['defaultAchievement'],
  components: {
    ErrorMessage,
    Multiselect,
    ImageSelector,
  },
  data() {
    return {
      debouncing: false,
      imageSize: 0,
      image: '',
      achievement: {
        achievement_id: this.defaultAchievement.achievement_id,
        title: this.defaultAchievement.title,
        award: this.defaultAchievement.award,
        url: this.defaultAchievement.url,
        description: this.defaultAchievement.description,
        happened_at: this.defaultAchievement.happened_at,
        members: this.defaultAchievement.members ? this.defaultAchievement.members.slice() : [],
      },
    };
  },
  observableMethods: {
    searchChange: 'searchChange$',
  },
  computed: {
    ...mapState('session', ['sessionID']),
    ...mapState('achievement', ['achievementError', 'sending']),
    ...mapState('memberIntroduction/searchPrivateMembers', ['members', 'searchError', 'searching']),
    happenedAt: {
      get() {
        if (!this.achievement.happened_at) {
          return null;
        }
        return moment(this.achievement.happened_at).local().format('YYYY-MM-DD');
      },
      set(newValue) {
        const UTCDate = moment(newValue).utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        this.achievement.happened_at = UTCDate;
      },
    },
    isImageTooLarge() {
      // 1MiB
      return 1024 * 1024 < this.imageSize;
    },
    isValid() {
      return !this.isImageTooLarge;
    },
  },
  methods: {
    ...mapActions('achievement', ['saveAchievement']),
    ...mapActions('memberIntroduction/searchPrivateMembers', ['searchMembers']),
    onSubmit() {
      this.saveAchievement({
        sessionID: this.sessionID,
        achievement: this.achievement,
        image: this.image,
      });
    },
    onSearchChanged(query) {
      this.searchMembers({ sessionID: this.sessionID, query });
    },
    onImageChange({ file, base64Body }) {
      this.imageSize = file.size;
      this.image = base64Body;
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
form {
  border: #333 solid 1px;
  border-radius: 4px;
  padding: 15px;
}
input, textarea {
  width: 100%;
}
img.option-image {
  width: 1.4em;
  height: auto;
  margin-right: 0.1em;
}
.tag {
  margin-right: 0.1em;
}
button, input.save {
  background-color: transparent;
  width: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;
  color: #fff;
  border-radius: 3px;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
}
button.edit {
    background: white;
    color: #666;
    width: 100%;
    border: solid black;
    border-width: 1px 1px 0;
    border-radius: 4px 4px 0 0;
    margin-bottom: 0;
}
button.erase {
  background: #b50000;
  color: #fff;
}
</style>
