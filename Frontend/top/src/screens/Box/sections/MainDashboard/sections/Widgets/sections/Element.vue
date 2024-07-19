<template>
  <div class="element">
    <div class="overlap-group-7">
      <div class="text-wrapper-23">이번주 집중 시간</div>
      <div class="overlap-2">
        <div class="text-wrapper-24">01:17:15</div>
        <div class="text-wrapper-25">+ 01:17:15</div>
      </div>
      <div class="ionicon-w-wallet-wrapper">
        <IoniconWWalletDefault3 class="ionicon-w-wallet" />
      </div>
    </div>
  </div>
</template>

<script>
import IoniconWWalletDefault3 from "../../../../../../../icons/IoniconWWalletDefault3/IoniconWWalletDefault3.vue";

export default {
  name: "Element",
  components: {
    IoniconWWalletDefault3,
  },
};
</script>


<style>
.element {
  height: 100px;
  left: 333px;
  position: absolute;
  top: 0;
  width: 328px;
}

.element .overlap-group-7 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 322px;
}

.element .text-wrapper-23 {
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

.element .overlap-2 {
  height: 31px;
  left: 39px;
  position: absolute;
  top: 45px;
  width: 192px;
}

.element .text-wrapper-24 {
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

.element .text-wrapper-25 {
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

.element .ionicon-w-wallet-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 56px;
  left: 245px;
  position: absolute;
  top: 21px;
  width: 59px;
}

.element .ionicon-w-wallet {
  height: 29px !important;
  left: 14px !important;
  position: absolute !important;
  top: 14px !important;
  width: 31px !important;
}

</style>