<template>
  <div class="container">
    <section class="section">
      <h1 class="title">戦歴の編集</h1>
      <ul>
        <li v-for="item in achievements" :key="item.achievement_id">
          <EditableAchievement :defaultAhievement="item"/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EditableAchievement from '@/components/EditableAchievement.vue';

export default {
  name: 'editAchievements',
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
