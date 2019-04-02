<template>
  <div class="home">
    <h1><img class="logo" src="@/assets/logo.svg" alt="ProLab"></h1>
    <section>
      <h2>部員募集中!</h2>
      <p>
        久留米高専プロラボ部は平日授業を終えた学生が集まり次第、電気電子・制御情報工学科棟のSJ（制御情報実験室）で活動しています。<br>
        興味のある方は、活動時間にSJ教室を訪ねてみてくださいね！
      </p>
    </section>

    <section>
      <h2>戦歴</h2>
      <AchievementsList/>
    </section>

    <section>
      <h2>GitHub Activity Graph</h2>
    </section>

    <section>
      <h2>AtCoder Activity Graph</h2>
    </section>
  </div>
</template>

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

h1 img {
  width: 400px;
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
}
</style>


<script>
import AchievementsList from '@/components/AchievementsList.vue';

export default {
  name: 'home',
  components: {
    AchievementsList,
  },
};
</script>
