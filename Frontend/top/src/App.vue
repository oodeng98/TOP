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
          "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=1055451669456-7j0mkark9qc3r3stsjt82jbt3hl3d248.apps.googleusercontent.com&scope=profile%20email&state=zCNq0aJOX1TTG4RP7lykKplQGxRteR_xVvZIgJ1kfgs%3D&redirect_uri=https://i11a707.p.ssafy.io/api/login/oauth2/code/google"
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
