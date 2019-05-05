<template>
  <img :src="src ? src : require('@/assets/no_image.png')" :srcset="srcset" :alt="alt">
</template>
<script>
export default {
  props: {
    src: {
      type: String,
    },
    media: {
      type: Array,
      default() {
        return [];
      },
    },
    alt: {
      type: String,
      required: true,
    },
  },
  computed: {
    srcset() {
      if (!this.src) return '';
      return this.media.map(({ pixelRatio, size }) => `${this.src}_${size} ${pixelRatio}`).join(',');
    },
  },
};
</script>
