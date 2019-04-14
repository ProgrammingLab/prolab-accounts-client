<template>
  <div class="container">
    <section class="section">
      <h1 class="title">戦歴の編集</h1>
      <button v-on:click="createNewAchievement">追加</button>
      <ul>
        <li v-for="item in achievements" :key="item.achievement_id">
          <EditableAchievement :defaultAhievement="item"/>
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
    title: 'Edit Achievements',
  },
  components: {
    EditableAchievement,
  },
  computed: mapState(
    'achievement', ['achievements'],
  ),
  methods: {
    ...mapActions(
      'achievement', ['getAchievements'],
    ),
    ...mapMutations(
      'achievement', ['createNewAchievement'],
    ),
  },
  async created() {
    this.getAchievements();
  },
};
</script>

<style scoped>
li {
  list-style: none;
  width: 24%;
  position: relative;
  margin-bottom: 40px;
  margin-right: 1%;
}
</style>
