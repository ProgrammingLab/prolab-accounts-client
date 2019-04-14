<template>
  <div>
    <button class="edit" v-on:click="editting = true" v-if="!editting">編集</button>
    <EditAchievement
      v-if="editting"
      :defaultAhievement="defaultAhievement"
      v-on:close="editting = false"
    />
    <Achievement v-else :achievement="defaultAhievement"/>
  </div>
</template>

<script>
import Achievement from '@/components/Achievement.vue';
import EditAchievement from '@/components/EditAchievement.vue';

export default {
  name: 'editableAchievement',
  components: {
    Achievement,
    EditAchievement,
  },
  data() {
    return {
      editting: !this.defaultAhievement.achievement_id,
    };
  },
  props: ['defaultAhievement'],
  watch: {
    defaultAhievement() {
      this.editting = false;
    },
  },
};
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;
  color: #fff;
  border-radius: 3px;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
}
button.edit {
  background: #668ad8;
  color: #fff;
}
button.delete {
  background: #ff3860;
  color: #fff;
}
</style>
