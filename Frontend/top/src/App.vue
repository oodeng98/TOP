<template>
  <div id="app" class="container">
    <Dashboard />
  </div>
</template>

<script>
import axios from "axios";
import Dashboard from "./components/Dashboard.vue"; // Dashboard 컴포넌트 import

export default {
  name: "App",
  components: {
    Dashboard, // Dashboard 컴포넌트 등록
  },
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
