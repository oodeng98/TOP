<template>
  <div id="app" class="container">
    <Dashboard v-if="isLoggedIn" />
    <div v-else>Loading...</div>
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
      // 서버에서 제공하는 로그인 API를 통해 로그인 여부 확인
      axios
        .get("https://i11a707.p.ssafy.io/api/user/check")
        .then((response) => {
          console.log(response); // 서버로부터의 응답을 출력
          if (response.data.data) {
            // 로그인 상태라면 메인 페이지를 표시
            this.isLoggedIn = true;
            // console.log("로그인 되어있음");
          } else {
            // 로그인이 되어 있지 않다면 로그인 페이지로 리다이렉트
            // console.log("로그인 안되어있음");
            this.redirectToLogin();
          }
        })
        .catch((error) => {
          console.error(error); // 에러 발생 시 에러를 출력
          // 에러가 발생하면 로그인 페이지로 리다이렉트
          this.redirectToLogin();
        });
    },
    redirectToLogin() {
      const loginUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?client_id=1055451669456-7j0mkark9qc3r3stsjt82jbt3hl3d248.apps.googleusercontent.com&redirect_uri=https%3A//i11a707.p.ssafy.io&response_type=token&scope=profile email";
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
