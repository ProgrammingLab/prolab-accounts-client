<template>
  <div class="container">
    <section class="section">
      <h1 class="title">戦歴の編集</h1>
      <button v-on:click="createNewAchievement">戦歴を新しく追加する</button>
      <ul>
        <li v-for="item in achievements" :key="item.achievement_id">
          <EditableAchievement :defaultAchievement="item"/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import EditableAchievement from '@/components/EditableAchievement.vue';

export default {
  name: 'editAchievements',
  metaInfo: {
    title: '実績編集',
  },
  components: {
    EditableAchievement,
  },
  computed: {
    ...mapState('achievement', ['achievements']),
    ...mapState('session', ['sessionID']),
  },
  methods: {
    ...mapActions(
      'achievement', ['getAchievements'],
    ),
    ...mapMutations(
      'achievement', ['createNewAchievement'],
    ),
  },
  async created() {
    this.getAchievements(this.sessionID);
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
