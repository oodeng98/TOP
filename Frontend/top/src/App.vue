<template>
  <div id="app" class="container">
    <Dashboard />
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
      axios
        .get("https://i11a707.p.ssafy.io/api/user/check")
        .then((response) => {
          if (response.data.data) {
            console.log("로그인 성공");
          } else {
            this.redirectToLogin();
            console.log("로그인 실패");
          }
        })
        .catch((error) => {
          console.error(error); // 에러 발생 시 에러를 출력
          // this.redirectToLogin();
        });
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
