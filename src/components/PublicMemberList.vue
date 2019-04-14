<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul class="member-list">
      <li v-for="member in filteredList" :key="member.user_id">
        <router-link :to="{ name: 'profile', params: { name: member.name }}">
          <img :src="member.icon_url || 'https://placehold.jp/000000/ffffff/150x150.png?text=No%20Image'" alt="User Icon">
          <dl>
            <dt class="name">{{member.displayname || member.name}}</dt>
            <dd class="role">{{member.role}}</dd>
            <dd class="grade">{{member.left ? '卒業生' : `${member.grade}年`}}</dd>
            <dd class="description">{{member.description}}</dd>
          </dl>
        </router-link>
      </li>
    </ul>
    <!-- この辺？にローディングの時のスピナーとかを置く(loadingで表示非表示を切り替える) -->
  </div>
</template>

<style scoped>
.member-list {
  list-style-type: none;
}
.member-list a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: flex-start;
}
img {
  width: 96px;
  border: 1px solid #ccc;
}
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
li {
  width: 400px;
  padding: 12px;
  margin: 0 20px 20px 0;
  transition-duration: 0.5s;
  cursor: pointer;
}
li:hover {
  background-color: black;
  color: white;
}
dl {
  margin: 0 0 0 5%;
  line-height: 1.2;
}
.name {
  font-size: 2rem;
  color: inherit;
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
