<template>
  <div class="container">
    <section class="section">
      <h1 class="title">戦歴の編集</h1>
      <button @click="createNewAchievement">戦歴を新しく追加する</button>
      <ul>
        <li v-for="item in achievements" :key="item.achievement_id">
          <EditableAchievement :default-achievement="item" @delete="deleteConfirmation" />
        </li>
      </ul>
    </section>
    <Modal
      :is-opened="confirmationIsOpened"
      @cancel="confirmationIsOpened = false"
      @click="onModalClick"
    >
      <template #header
        >警告</template
      >
      <template #body>
        戦歴「{{ deleteTerget.title }}」を削除しようとしています。<br />
        よろしいですか。
      </template>
      <template #footer="{ onClick }">
        <button class="danger-button" @click="onClick(true)">削除</button>
        <button @click="onClick(false)">キャンセル</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import EditableAchievement from '@/components/EditableAchievement.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'EditAchievements',
  metaInfo: {
    title: '実績編集',
  },
  components: {
    EditableAchievement,
    Modal,
  },
  data() {
    return {
      deleteTerget: null,
      confirmationIsOpened: false,
    };
  },
  computed: {
    ...mapState('achievement', ['achievements']),
    ...mapState('session', ['sessionID']),
  },
  async created() {
    await this.getAchievements(this.sessionID);
  },
  methods: {
    ...mapActions('achievement', ['getAchievements', 'deleteAchievement']),
    ...mapMutations('achievement', ['createNewAchievement']),
    deleteConfirmation(achievement) {
      this.deleteTerget = achievement;
      this.confirmationIsOpened = true;
    },
    onModalClick(isAgreed) {
      this.confirmationIsOpened = false;
      if (!isAgreed) return;
      this.deleteAchievement({
        sessionID: this.sessionID,
        achievement: this.deleteTerget,
      });
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}
button {
  background-color: transparent;
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
button.danger-button {
  background: #b50000;
}
li {
  list-style: none;
  width: 24%;
  position: relative;
  margin-bottom: 40px;
  margin-right: 1%;
}
@media screen and (max-width: 1024px) {
  li {
    width: 48%;
    margin-right: 2%;
  }
}

@media screen and (max-width: 480px) {
  li {
    width: 100%;
  }
}
</style>
