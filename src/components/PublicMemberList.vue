<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul>
      <li v-for="member in filteredList" :key="member.user_id">
        <dl>
          <img class="icon" :src="member.icon_url" alt="icon">
          <dt>
            <router-link :to="{ name: 'memberProfile', params: { memberId: member.user_id }}">
              {{member.displayname || member.name}}
            </router-link>
          </dt>
          <dd>{{member.role}}</dd>
          <dd>{{member.left ? '卒業生' : `${member.grade}年生`}}</dd>
          <dd>{{member.description}}</dd>
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
