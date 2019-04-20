<template>
  <div class="loading-indicator-container">
    <div v-show="isLoading" class="loading-indicator"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('ui', ['isLoading']),
  },
};
</script>

<style scoped>
.loading-indicator-container {
  height: 5px;
  width: 100%;
}

.loading-indicator {
  height: 100%;
  background-color: cornflowerblue;
  animation: loading 1.5s linear infinite;
}

@keyframes loading {
  0% {
    margin-left: 0%;
    width: 0;
  }
  10% {
    margin-left: 0;
    width: 10%;
  }
  90% {
    margin-left: 90%;
    width: 10%;
  }
  100% {
    margin-left: 100%;
    width: 0;
  }
}
</style>
