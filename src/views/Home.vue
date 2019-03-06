<template>
  <div class="home">
    <button @click="showedContributionTree = ! showedContributionTree">トグルボタン</button>
    <Background :is-active="showedContributionTree"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Background from '@/components/Background.vue';

export default {
  name: 'home',
  components: {
    Background,
  },
  data() {
    return {
      // もっといい名前ありそう
      showedContributionTree: false,
    };
  },

};
</script>
