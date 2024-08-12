<template>
  <div id="app" class="container">
    <!-- 대시보드는 로그인된 상태일 때만 렌더링됩니다 -->
  </div>
</template>

<script>
import axios from "axios";
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // 서버에서 제공하는 로그인 API를 통해 로그인 여부 확인
      axios
        .get("https://i11a707.p.ssafy.io/api/user/check")
        .then((response) => {
          if (response.data.data) {
            this.renderDashboard();
          } else {
            this.redirectToLogin();
          }
        })
        .catch((error) => {
          console.error(error); // 에러 발생 시 에러를 출력
          // this.redirectToLogin();
        });
    },
    renderDashboard() {
      const dashboardComponent = this.$options.components.Dashboard;
      const dashboardInstance = new dashboardComponent().$mount();
      this.$el.appendChild(dashboardInstance.$el);
    },
    redirectToLogin() {
      const loginUrl = "https://i11a707.p.ssafy.io/api/user/login";
      window.location.href = loginUrl;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
