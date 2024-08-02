<template>
  <div class="overlap-group-wrapper">
    <div class="overlap-11">
      <div class="text-wrapper-41">오늘의 집중 시간</div>
      <div class="overlap-group-9">
        <div class="text-wrapper-42">01:17:15</div>
        <div class="text-wrapper-43">+ 01:17:15</div>
      </div>
      <div class="ionicon-w-wallet-default-3-wrapper">
        <IoniconWWalletDefault3 class="ionicon-w-wallet-default-3" />
      </div>
    </div>
  </div>
</template>

<script>
import IoniconWWalletDefault3 from "../../../../../../../icons/IoniconWWalletDefault3/IoniconWWalletDefault3.vue";

export default {
  name: "OverlapGroupWrapper",
  components:{
    IoniconWWalletDefault3
  },
};
</script>


<style>
 .overlap-group-wrapper {
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 328px;
}

.overlap-group-wrapper .overlap-11 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 322px;
}

.overlap-group-wrapper .text-wrapper-41 {
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

.overlap-group-wrapper .overlap-group-9 {
  height: 31px;
  left: 39px;
  position: absolute;
  top: 45px;
  width: 192px;
}

.overlap-group-wrapper .text-wrapper-42 {
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

.overlap-group-wrapper .text-wrapper-43 {
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

.overlap-group-wrapper .ionicon-w-wallet-default-3-wrapper {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 56px;
  left: 245px;
  position: absolute;
  top: 21px;
  width: 59px;
}

.overlap-group-wrapper .ionicon-w-wallet-default-3 {
  height: 29px !important;
  left: 14px !important;
  position: absolute !important;
  top: 14px !important;
  width: 31px !important;
}

</style>