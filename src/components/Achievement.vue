<template>
  <div class="achievement" ontouchstart="">
    <dl>
      <dt>{{ achievement.title }}</dt>
      <dd class="award">{{ achievement.award }}</dd>
      <dd class="year">{{ year }}</dd>
      <dd>{{ achievement.description }}</dd>
      <dd class="members" v-if="achievement.members.length">
        <ul>
          <p>参加メンバー</p>
          <li v-for="member in achievement.members" :key="member.member_id">
            <router-link :to="{ name: 'profile' , params: { name: member.name } }">
              {{ member.display_name || member.name }}
            </router-link>
          </li>
        </ul>
      </dd>
    </dl>
    <img v-bind:src="achievement.image_url">
  </div>
</template>

<script>
export default {
  name: 'achievement',
  props: ['achievement'],
  computed: {
    year() {
      return this.achievement.happened_at ? this.achievement.happened_at.split('-')[0] : null;
    },
  },
};
</script>

<style scoped>
div.achievement {
  border: 1px solid #666;
  position: relative;
}
div.achievement:hover {
  cursor: pointer;
  background-color: black;
  color: white;
  transition-duration: 0.2s;
}
div.achievement:hover dd.year {
  color: inherit;
}
div.achievement::after{
  display: block;
  content: "";
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 250px;
  background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
}
div.achievement:hover::after{
  opacity: 0;
}
p {
  text-overflow: ellipsis;
}
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  position: relative;
  z-index: 2;
  background: white;
}
dl {
  margin: 20px 20px 0;
  height: 150px;
  position: relative;
  overflow: hidden;
}
dt {
  font-size: 1.4rem;
}
dd,
dt {
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
  font-family: "Barlow";
}
.members {
  display: hidden;
  position: absolute;
  bottom: -240px;
  z-index: 3;
  width: 100%;
  background-color: #222;
  color: white;
  padding: 20px;
  margin-top: 40px;
  border-radius: 8px;
  opacity: 0;
  transition: ease-in-out 0.2s;
}
div.achievement:hover .members {
  opacity: 0.95;
}
.members ul {
  list-style: none;
  padding: 0;
}
.members ul li {
  display: inline-block;
  background-color: #eee;
  color: #666;
  margin: 0 8px 8px 0;
  padding: 2px 6px;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
}
.members ul li:hover {
  background-color: black;
  color: white;
}
.members ul li a {
  color: inherit;
}
.members ul li a:hover {
  text-decoration: none;
}
</style>
