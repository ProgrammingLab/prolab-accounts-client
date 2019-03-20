<template>
</template>

<script>
export default {
  name: 'titleController',
  props:['title'],
  mounted() {
    document.title = this.title;
  },
  watch: {
    title(title) {
      document.title = title;
    }
  }
};
</script>
