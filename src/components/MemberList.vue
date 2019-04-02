<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul>
      <li v-for="user in list | leftUserFilter(includeLeftUser)" :key="user.user_id">
        <dl>
          <img class="icon" :src="user.icon_url" alt="icon">
          <dt>{{user.displayname || user.name}}</dt>
          <dd>{{user.role}}</dd>
          <dd>{{user.left ? '卒業生' : `${user.grade}年生`}}</dd>
          <dd>{{user.description}}</dd>
        </dl>
      </li>
    </ul>
    <!-- この辺？にローディングのクルクルとかがあるといいと思う(readyで表示非表示を切り替える) -->
  </div>
</template>

<style scoped>
.icon {
  width: 96px;
}
</style>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'memberList',
  props:['includeLeftUser'],
  components: {
    ErrorMessage,
  },
  data() {
    return {
      ready: false,
    };
  },
  async created() {
    await this.getList();
    this.ready = true;
  },
  computed: {
    ...mapState('memberList', ['list', 'error']),
  },
  methods: {
    ...mapActions('memberList', ['getList']),
  },
  filters: {
    leftUserFilter(list, includeLeftUser) {
      if (includeLeftUser) {
        return list;
      }
      return list.filter(user => !user.left);
    },
  },
};
</script>
