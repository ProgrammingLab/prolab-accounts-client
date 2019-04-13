<template>
  <ul>
    <li v-for="item in achievements" :key="item.id">
      <Achievement :achievement="item"/>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Achievement from '@/components/Achievement.vue';

export default {
  name: 'AchievementsList',
  components: {
    Achievement,
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
li {
  margin-bottom: 40px;
  margin-right: 1%;
  border: 1px solid #666;
  list-style: none;
  width: 24%;
  position: relative;
}
li:hover {
  cursor: pointer;
}
li:hover {
  background-color: black;
  color: white;
  transition-duration: 0.2s;
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
