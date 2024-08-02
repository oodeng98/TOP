<template>
  <div class="box">
    <div class="dash-board-2">
      <MainDashboard />
      <Sidebar />
    </div>
  </div>
</template>

<script>
import MainDashboard from "./Box/sections/MainDashboard.vue";
import Sidebar from "./Box/sections/Sidebar.vue";

export default {
  name: "Box",
  components: {
    MainDashboard,
    Sidebar,
  },
};
</script>

<style>
.box {
  height: 1446px;
  position: relative;
  width: 1300px;
}

.box .dash-board-2 {
  height: 1446px;
  left: 0;
  /* position: fixed; */
  top: 0;
  width: 1300px;
}
</style>
