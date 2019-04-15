<template>
  <ul>
    <li v-for="item in achievements" :key="item.id">
      <a v-bind:href="item.url">
        <Achievement :achievement="item"/>
      </a>
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
  padding: 0;
  align-items: flex-start;
}
li {
  list-style: none;
  width: 24%;
  position: relative;
  margin-bottom: 40px;
  margin-right: 1%;
}
a {
  color: black;
}
a:hover {
  text-decoration: none;
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
