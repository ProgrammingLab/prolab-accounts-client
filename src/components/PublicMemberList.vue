<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul>
      <li v-for="user in filteredList" :key="user.user_id">
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
  name: 'publicMemberList',
  props:{
    includeLeftUser:Boolean,
    default: false,
  },
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
    ...mapState('memberIntroduction/memberList', ['list', 'error']),
    filteredList() {
      if (this.includeLeftUser) return this.list;
      return list.filter(user => !user.left);
    },
  },
  methods: {
    ...mapActions('memberIntroduction/memberList', ['getList']),
  },
};
</script>
