<template>
  <div class="container">
    <div class="wrapper">
      <div class="contributions-graph">
        <div class="user"
        v-for="(user, index) in
        contributionsCollection.contribution_collections.slice(0, displayUsersNumber)"
        v-bind:key="user.name"
        v-bind:style="{ transform: 'rotateY(' + 360 / displayUsersNumber * index + 'deg)' }">
          <div class="user-info" v-bind:style=
          "{ 'animation-delay': -60 / displayUsersNumber * index + 's' }">
            <img v-bind:src="user.user.icon_url">
            <dl>
              <dt>USER NAME</dt>
              <dd class="user-name">{{ user.user.github_user_name }}</dd>
              <dt>TOTAL CONTRIBUTIONS</dt>
              <dd class="total-contributions">{{ user.total_count }}</dd>
            </dl>
          </div>
          <div class="graph" v-bind:style=
          "{ stroke: 'hsl(' + 360 / displayUsersNumber * index + ', 70%, 45%)' }">
            <svg viewbox="0 0 25 300" width="25" height="300">
              <line x1=0 v-bind:y1="300 - (dayIndex * 5 + 2)"
              v-bind:x2="item.count" v-bind:y2="300 - (dayIndex * 5 + 2)"
              stroke-width="4" v-bind:opacity="item.count / 5"
              v-for="(item, dayIndex) in user.days"
              v-bind:key="item.date"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GitHubContributionsGraph',
  props: ['displayUsersNumber'],
  computed: mapState(
    'contributionsCollection', ['contributionsCollection'],
  ),
  methods: {
    ...mapActions(
      'contributionsCollection', ['getContributionsCollection'],
    ),
  },
  async created() {
    this.getContributionsCollection();
  },
};
</script>

<style scoped>
@keyframes rotate {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}
@keyframes fukan {
  from { transform: rotateX(0deg); }
  to { transform: rotateX(-30deg); }
}
@keyframes dash {
  from { stroke-dashoffset: 50; }
  to { stroke-dashoffset: 0; }
}
.container {
  perspective: 1000px;
}
.wrapper {
  font-family: 'Barlow';
  font-weight: bold;
  height: 700px;
  animation: fukan 10s ease-in-out;
  transform-style: preserve-3d;
  width: 60%;
  margin: 100px auto;
  transform: rotateX(-30deg);
}
dl {
  letter-spacing: 1px;
}
dt {
  font-size: 0.7em;
  line-height: 1px;
}
.user {
  width: 50%;
  margin-left: 50%;
  position: absolute;
  transform-origin: 0;
  transform-style: preserve-3d;
}
.user-info {
  margin-left: 70%;
  animation: rotate 60s infinite reverse linear;
  border-top: 1px solid black;
  padding-top: 20px;
  font-size: 16px;
}
.user-info img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  position: absolute;
  left: -85px;
  top: 16px;
  border: 1px solid black;
}
.user-name, .total-contributions{
  font-size: 3em;
}
.contributions-graph {
  animation: rotate 60s infinite linear;
  transform-style: preserve-3d;
}
.graph {
  transform-style: preserve-3d;
  padding-top: 20px;
}
svg {
  width: 100%;
  transform-origin: top left;
  transform: scale(30, 2);
}
svg line {
  stroke-dasharray: 50;
  animation: dash 10s ease-in-out;
}
@media screen and (max-width: 480px) {
  .user-info {
    font-size: 6px;
  }
}
</style>
