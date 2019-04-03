<template>
  <publicMemberList includeLeftUser/>
</template>

<script>
import publicMemberList from '@/components/PublicMemberList.vue';
export default {
  name:'memberList',
  components: {
    publicMemberList,
  }
}
</script>
