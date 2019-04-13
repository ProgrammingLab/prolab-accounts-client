<template>
  <ul>
    <AchievementItem v-for="item in achievements" :key="item.achievement_id" :achievement="item"/>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AchievementItem from '@/components/AchievementItem.vue';

export default {
  name: 'AchievementsList',
  components: {
    AchievementItem,
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
ul {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-left: 60px;
  margin-right: 20px;
  padding: 0;
  align-items: flex-start;
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
