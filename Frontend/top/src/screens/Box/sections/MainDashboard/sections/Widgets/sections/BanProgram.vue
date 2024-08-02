<template>
  <div class="ban-program">
    <div class="overlap-4">
      <List />
      <div class="text-wrapper-31">금지 프로그램 목록</div>
      <div class="icon-8" />
      <InputWithaddons />
      <Plus />
    </div>
  </div>
</template>

<script>
import List from "./BanProgram/sections/List.vue";
import Plus from "./BanProgram/sections/Plus.vue";
import InputWithaddons from "./BanProgram/sections/InputWithaddons.vue";

export default {
  name: "BanProgram",
  components: {
    List,
    Plus,
    InputWithaddons,
  },
};
</script>


<style>
.ban-program {
  height: 400px;
  left: 504px;
  position: absolute;
  top: 112px;
  width: 485px;
}

.ban-program .overlap-4 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 400px;
  position: relative;
  width: 483px;
}

.ban-program .text-wrapper-31 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  left: 22px;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 11px;
  white-space: nowrap;
  width: 144px;
}

.ban-program .icon-8 {
  background-image: url(../../../../../../../../static/img/more-vert-2.svg);
  background-size: 100% 100%;
  height: 15px;
  left: 452px;
  position: absolute;
  top: 17px;
  width: 16px;
}

</style>