<template>
  <div>
    <ErrorMessage :error="error"/>
    <ul class="member-list">
      <li v-for="member in filteredList" :key="member.user_id">
        <router-link :to="{ name: 'profile', params: { name: member.name }}">
          <ImgX
            :src="member.icon_url"
            :media="[
              {pixelRatio: '1x', size: '64px'},
              {pixelRatio: '2x', size: '128px'},
            ]"
            alt="User Icon"
          />
          <dl>
            <dt class="name">{{member.display_name || member.name}}</dt>
            <dd class="role" v-if="member.role">{{member.role.name}}</dd>
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
  width: 48px;
  height: 48px;
  object-fit: cover;
  border: 1px solid #ccc;
}
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 0;
}
li {
  width: 25%;
  padding: 8px;
  transition-duration: 0.5s;
  cursor: pointer;
}
li:hover {
  background-color: black;
  color: white;
}
dl {
  margin: 0 0 0 15px;
  line-height: 1.2;
  width: calc(100% - 64px);
}
.name {
  font-size: 1.5rem;
  color: inherit;
}
.description {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@media screen and (max-width: 1200px) {
  li {
    width: 50%;
  }
}
@media screen and (max-width: 640px) {
  li {
    width: 100%;
  }
}
</style>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import ImgX from '@/components/ImgX.vue';
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
    ImgX,
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
