<template>
  <div>
    <button v-if="!editting" class="edit" @click="editting = true">編集</button>
    <EditAchievement
      v-if="editting"
      :default-achievement="defaultAchievement"
      @close="onClose"
      @delete="$emit('delete', defaultAchievement)"
    />
    <Achievement v-else :achievement="defaultAchievement" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Achievement from '@/components/Achievement.vue';
import EditAchievement from '@/components/EditAchievement.vue';

export default {
  name: 'EditableAchievement',
  components: {
    Achievement,
    EditAchievement,
  },
  props: {
    defaultAchievement: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editting: !this.defaultAchievement.achievement_id,
    };
  },
  computed: {
    ...mapState('session', ['sessionID']),
  },
  watch: {
    defaultAchievement() {
      this.editting = false;
    },
  },
  methods: {
    ...mapActions('achievement', ['getAchievements']),
    onClose() {
      this.editting = false;
      this.getAchievements(this.sessionID);
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
  background: white;
  color: #666;
  width: 100%;
  border: solid black;
  border-width: 1px 1px 0;
  border-radius: 4px 4px 0 0;
  margin-bottom: 0;
}
button.delete {
  background: #ff3860;
  color: #fff;
}
</style>
