<template>
  <div class="loading-indicator-container">
    <div :class="[ isLoading ? 'loading-indicator-active' : 'loading-indicator-inactive' ]"></div>
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

.loading-indicator-inactive {
  height: 100%;
  width: 0;
  margin-left: 0;
}

.loading-indicator-active {
  height: 100%;
  background-color: cornflowerblue;
  animation: loading 1.5s linear infinite;
}

@keyframes loading {
  0% {
    width: 0;
    margin-left: 0;
  }

  50% {
    margin-left: 0;
    width: 50%;
  }

  100% {
    margin-left: 100%;
    width: 0%;
  }
}
</style>
