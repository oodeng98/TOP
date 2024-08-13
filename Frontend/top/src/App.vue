<template>
  <div id="app" class="custom-container">
    <Dashboard v-if="isLoggedIn" />
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
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      axios
        .get("https://i11a707.p.ssafy.io/api/user/check")
        .then((response) => {
          if (response.data.data) {
            console.log("로그인 성공");
            this.isLoggedIn = true; // 로그인 성공 시 Dashboard 로딩
          } else {
            console.log("로그인 실패");
            this.redirectToLogin(); // 로그인 실패 시 로그인 페이지로 리다이렉트
          }
        })
        .catch((error) => {
          console.error("로그인 상태 확인 중 오류 발생:", error);
          this.redirectToLogin(); // 오류 발생 시 로그인 페이지로 리다이렉트
        });
    },
    redirectToLogin() {
      const loginUrl = "https://i11a707.p.ssafy.io/api/user/login";
      window.location.href = loginUrl;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.custom-container {
  width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
