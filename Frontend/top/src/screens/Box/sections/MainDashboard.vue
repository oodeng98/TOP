<template>
  <div class="main-dashboard">
    <Widgets />
    <Breadcrumb />
  </div>
</template>

<script>
import { defineProps } from "vue";
import Widgets from "./MainDashboard/sections/Widgets.vue";
import Breadcrumb from "./MainDashboard/sections/Breadcrumb.vue";

export default {
  name: "MainDashboard",
  components: {
    Widgets,
    Breadcrumb,
  },
};
</script>


<style>
.main-dashboard {
  background-color: #f8f9fa;
  height: 1446px;
  left: 280px;
  position: absolute;
  top: 0;
  width: 1020px;
}
</style>