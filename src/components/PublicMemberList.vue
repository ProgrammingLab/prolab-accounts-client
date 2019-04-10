<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul class="memberList">
      <li v-for="member in filteredList" :key="member.user_id">
        <img :src="member.icon_url" alt="User Icon">
        <dl>
          <dt class="name">
            <router-link :to="{ name: 'profile', params: { name: member.name }}">
              {{member.displayname || member.name}}
            </router-link>
          </dt>
          <dd class="role">{{member.role}}</dd>
          <dd class="grade">{{member.left ? '卒業生' : `${member.grade}年`}}</dd>
          <dd class="description">{{member.description}}</dd>
        </dl>
      </li>
    </ul>
    <!-- この辺？にローディングの時のスピナーとかを置く(loadingで表示非表示を切り替える) -->
  </div>
</template>

<style scoped>
.memberList{
  list-style-type: none;
}
img {
  width: 96px;
  height: 96px;
  border: 1px solid #ccc;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  display: flex;
  border-right: 2px solid #888;
  width: 400px;
  padding: 12px;
}
dl {
  margin-left: 5%;
}
.name {
  font-size: 2rem;
}
</style>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'publicMemberList',
  props: {
    includeLeftUser: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    if (this.isEmpty) this.getList();
  },
  computed: {
    ...mapState('memberIntroduction/memberList', ['list', 'error']),
    ...mapGetters('memberIntroduction/memberList', ['isEmpty', 'isLast']),
    filteredList() {
      if (this.includeLeftUser) return this.list;
      return this.list.filter(user => !user.left);
    },
  },
  methods: {
    ...mapActions('memberIntroduction/memberList', { getListAction: 'getList' }),
    async getList() {
      if (!this.loading) {
        this.loading = true;
        await this.getListAction();
        this.loading = false;
      }
    },
  },
};
</script>
