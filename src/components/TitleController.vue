<!-- eslint-disable vue/valid-template-root -->
<template>
</template>
<!-- eslint-enable vue/valid-template-root -->
<script>
export default {
  name: 'titleController',
  props: ['title'],
  mounted() {
    document.title = this.title;
  },
  watch: {
    title(title) {
      document.title = title;
    },
  },
};
</script>
