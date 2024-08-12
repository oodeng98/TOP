<template>
  <div id="app" class="container">
    <Dashboard />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  // created()는 Vue 인스턴스가 생성된 직후 호출됩니다.
  created() {
    this.login();
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/user/login"
        );
        console.log("로그인 요청 성공:", response.data);
      } catch (error) {
        console.error("로그인 요청 실패:", error);
      }
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
