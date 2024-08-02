<template>
  <div class="element-wrapper">
    <div class="overlap-12">
      <div class="text-wrapper-44">이번달 집중 시간</div>
      <div class="overlap-group-10">
        <div class="text-wrapper-45">01:17:15</div>
        <div class="text-wrapper-46">+ 01:17:15</div>
      </div>
      <div class="ionicon-w-wallet-default-3-instance-wrapper">
        <IoniconWWalletDefault3 class="ionicon-w-wallet-default-3-instance" />
      </div>
    </div>
  </div>
</template>

<script>
import IoniconWWalletDefault3 from "../../../../../../../icons/IoniconWWalletDefault3/IoniconWWalletDefault3.vue";

export default {
  name: "ElementWrapper",
  components: {
    IoniconWWalletDefault3,
  },
};
</script>


<style>
.element-wrapper {
  height: 100px;
  left: 665px;
  position: absolute;
  top: 0;
  width: 328px;
}

.element-wrapper .overlap-12 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 322px;
}

.element-wrapper .text-wrapper-44 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 39px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 21px;
  width: 151px;
}

.element-wrapper .overlap-group-10 {
  height: 31px;
  left: 39px;
  position: absolute;
  top: 45px;
  width: 192px;
}

.element-wrapper .text-wrapper-45 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 0;
  width: 149px;
}

.element-wrapper .text-wrapper-46 {
  color: #48bb78;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  left: 104px;
  letter-spacing: 0;
  line-height: 19.6px;
  position: absolute;
  top: 5px;
  width: 88px;
}

.element-wrapper .ionicon-w-wallet-default-3-instance-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 56px;
  left: 245px;
  position: absolute;
  top: 21px;
  width: 59px;
}

.element-wrapper .ionicon-w-wallet-default-3-instance {
  height: 29px !important;
  left: 14px !important;
  position: absolute !important;
  top: 14px !important;
  width: 31px !important;
}

</style>