<template>
  <div>
    <h1><img class="logo" src="@/assets/logo.svg" alt="ProLab"></h1>
    <publicMemberList includeLeftUser/>
  </div>
</template>

<style scoped>
div {
  max-width: 1500px;
  margin: 40px auto;
}

h1 img {
  max-width: 400px;
  width: 80%;
  margin: 0 0 0 40px;
}
</style>

<script>
import publicMemberList from '@/components/PublicMemberList.vue';

export default {
  name: 'memberList',
  metaInfo: {
    title: '部員一覧',
  },
  components: {
    publicMemberList,
  },
};
</script>
