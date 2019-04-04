<template>
  <div id="container">
    <ErrorMessage :error="error"/>
    <ul class="memberList">
      <li v-for="member in filteredList" :key="member.user_id">
        <dl>
          <dd class="iconWrapper" ><img class="icon" :src="member.icon_url" alt="icon"></dd>
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
import { mapState, mapActions } from 'vuex';

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
      loading: true,
    };
  },
  async created() {
    await this.getList();
    this.loading = false;
  },
  computed: {
    ...mapState('memberIntroduction/memberList', ['list', 'error']),
    filteredList() {
      if (this.includeLeftUser) return this.list;
      return this.list.filter(user => !user.left);
    },
  },
  methods: {
    ...mapActions('memberIntroduction/memberList', ['getList']),
  },
};
</script>
