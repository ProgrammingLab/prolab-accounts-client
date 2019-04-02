<template>
  <ul>
    <li v-for="item in achievements">
      <dl>
        <dt>{{ item.title }}</dt>
        <dd class="award">{{ item.award }}</dd>
        <dd class="year">{{ item.happened_at.split('-')[0] }}</dd>
        <dd>{{ item.description }}</dd>
      </dl>
      <img v-bind:src="item.image_url">
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'AchievementsList',
    computed: mapState(
      'achievement', ['achievements']
    ),
    methods: {
      ...mapActions(
        'achievement', ['getAchievements']
      ),
    },
    async created () {
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
  box-sizing: content-box;
}
li:hover {
  cursor: pointer;
}
li:hover {
  background-color: black;
  color: white;
  transition-duration: 0.2s;
}

dl {
  margin: 20px;
}
dt {
  font-size: 1.4rem;
}
dd, dt {
  width: 85%;
}
dd.award {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
dd.year {
  text-align: right;
  position: absolute;
  right: 0;
  top: 6px;
  color: #ccc;
  font-size: 3.5rem;
  transform: rotate(-90deg) translateY(-100%);
  transform-origin: right top;
  line-height: 1;
  font-family: 'Barlow';
}
li:hover dd.year {
  color: white;
}
p {
  text-overflow: ellipsis;
}
img {
  width: 100%;
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
