<template>
  <div class="achievement">
    <dl>
      <dt>{{ achievement.title }}</dt>
      <dd class="award">{{ achievement.award }}</dd>
      <dd class="year">{{ achievement.happened_at.split('-')[0] }}</dd>
      <dd>{{ achievement.description }}</dd>
    </dl>
    <img v-bind:src="achievement.image_url">
  </div>
</template>

<script>
export default {
  name: 'achievement',
  props: ['achievement'],
};
</script>

<style scoped>
dl {
  margin: 20px;
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
div.achievement:hover dd.year {
  color: white;
}
p {
  text-overflow: ellipsis;
}
img {
  width: 100%;
}
div.achievement {
  border: 1px solid #666;
  position: relative;
}
div.achievement:hover {
  cursor: pointer;
}
div.achievement:hover {
  background-color: black;
  color: white;
  transition-duration: 0.2s;
}
</style>
