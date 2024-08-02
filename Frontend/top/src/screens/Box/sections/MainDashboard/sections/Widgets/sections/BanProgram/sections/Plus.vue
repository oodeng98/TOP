<template>
  <div class="plus">
    <div class="overlap">
      <div class="ellipse-7" />
      <div class="text-wrapper-22">+</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Plus",
};
</script>


<style>
 .plus {
  height: 22px;
  left: 419px;
  position: absolute;
  top: 19px;
  width: 19px;
}

.plus .overlap {
  height: 22px;
  position: relative;
  width: 17px;
}

.plus .ellipse-7 {
  background-color: #5865f2;
  border-radius: 8.33px/10px;
  height: 20px;
  left: 0;
  position: absolute;
  top: 2px;
  width: 17px;
}

.plus .text-wrapper-22 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 3px;
  letter-spacing: -0.24px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 0;
  white-space: nowrap;
  width: 10px;
}

</style>
