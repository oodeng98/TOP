<template>
  <div id="app" class="container">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
  // mounted() {
  //   const googleAuthUrl = "https://i11a707.p.ssafy.io/api/user/login";
  //   const isLoggedIn = this.checkLoginStatus(); // 로그인 상태 확인

  //   if (!isLoggedIn) {
  //     window.location.href = googleAuthUrl;
  //   }
  // },
  // methods: {
  //   checkLoginStatus() {
  //     return localStorage.getItem("authToken") !== null;
  //   },
  // },
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
