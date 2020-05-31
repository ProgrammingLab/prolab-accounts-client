<template>
  <div class="home">
    <div class="overlay">
      <section>
        <h2>部員募集中!</h2>
        <p>
          久留米高専プロラボ部は平日授業を終えた学生が集まり次第、電気電子・制御情報工学科棟のSJ（制御情報実験室）で活動しています。<br>
          興味のある方は、活動時間にSJ教室を訪ねてみてくださいね！
        </p>
      </section>

      <section class="achievements-list">
        <h2>戦歴</h2>
        <div>
          <AchievementsList/>
        </div>
      </section>

      <section class="member-list">
        <h2>部員一覧</h2>
        <div>
          <publicMemberList includeLeftUser/>
        </div>
      </section>
    </div>

    <section class="github-contributions-graph">
      <div>
        <GitHubContributionGraph displayUsersNumber="5"/>
      </div>
    </section>
  </div>
</template>

<script>
import AchievementsList from '@/components/AchievementsList.vue';
import publicMemberList from '@/components/PublicMemberList.vue';
import GitHubContributionGraph from '@/components/GitHubContributionGraph.vue';

export default {
  name: 'home',
  metaInfo: {
    title: process.env.VUE_APP_TITLE,
    titleTemplate: null,
  },
  components: {
    AchievementsList,
    publicMemberList,
    GitHubContributionGraph,
  },
};
</script>

<style scoped>
@keyframes slide {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

.home {
  max-width: 1500px;
  margin: 40px auto;
}

.achievements-list > div, .member-list > div {
  margin-left: 60px;
  margin-right: 30px;
}

.github-contributions-graph {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  opacity: 0.5;
  z-index: -1;
}

section {
  margin: 40px 0;
}

h2 {
  background-color: black;
  display: inline-block;
  color: white;
  font-weight: 200;
  line-height: 1.1;
  font-size: 3rem;
  padding: 0 20px 0 60px;
  margin-bottom: 10px;
  position: relative;
}

h2::after {
  display: block;
  height: 100%;
  content: "";
  position: absolute;
  background-color: white;
  top: 0;
  right: 0;
  animation: slide 0.5s cubic-bezier(0, 0, 0.16, 0.96);
}

p {
  margin-left: 60px;
  margin-right: 20px;
}

@media screen and (max-width: 480px) {
  h2 {
    padding-left: 30px;
    font-size: 2rem;
  }
  p {
    margin-left: 30px;
  }
  .achievements-list > div, .member-list > div {
    margin-left: 30px;
  }
}
</style>
