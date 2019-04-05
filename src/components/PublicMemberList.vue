<template>
  <div id="container">
    <ErrorMessage :error="error"/>
    <ul class="memberList">
      <li v-for="member in filteredList" :key="member.user_id">
        <dl>
          <dd class="iconWrapper" ><img class="icon" :src="member.icon_url" alt="icon"></dd>
          <dt>
            <router-link :to="{ name: 'profile', params: { name: member.name }}">
              {{member.displayname || member.name}}
            </router-link>
          </dt>
          <dd>{{member.role}}</dd>
          <dd>{{member.left ? '卒業生' : `${member.grade}年生`}}</dd>
          <dd>{{member.description}}</dd>
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
.iconWrapper{
  float: left;
  padding-right: 10px;
}
.icon {
  width: 96px;
  height: 96px;
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
