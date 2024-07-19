<template>
  <div class="breadcrumb">
    <div class="text-wrapper-56">Dashboard</div>
    <div class="edit-2">
      <div class="text-wrapper-57">EDIT</div>
      <Edit1 class="edit-1" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import Edit1 from "../../../../../icons/Edit1/Edit1.vue";

export default {
  name: "Breadcrumb",
  components:{
    Edit1
  },
};
</script>


<style>
 .breadcrumb {
  height: 25px;
  left: 16px;
  position: absolute;
  top: 14px;
  width: 989px;
}

.breadcrumb .text-wrapper-56 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 25px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: 35px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 132px;
}

.breadcrumb .edit-2 {
  height: 25px;
  left: 915px;
  position: absolute;
  top: 0;
  width: 74px;
}

.breadcrumb .text-wrapper-57 {
  color: #2d3748;
  font-family: "Helvetica-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 14px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 58px;
}

.breadcrumb .edit-1 {
  height: 20px !important;
  left: 0 !important;
  position: absolute !important;
  top: 5px !important;
  width: 14px !important;
}

</style>