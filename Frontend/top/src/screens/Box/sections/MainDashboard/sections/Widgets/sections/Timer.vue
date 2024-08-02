<template>
  <div class="timer">
    <div class="overlap-14">
      <div class="rectangle-2" />
      <div class="text-wrapper-54">Timer</div>
      <div class="time">01:03:56</div>
      <img class="bottom-button" alt="Bottom button" src="/img/bottom-button.png" />
      <div class="input-fieldtext-wrapper">
        <div class="input-fieldtext-2">
          <div class="text-wrapper-55">카테고리</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
};
</script>

<style>
.timer {
  height: 200px;
  left: 650px;
  position: absolute;
  top: 844px;
  width: 357px;
}

.timer .overlap-14 {
  height: 200px;
  position: relative;
  width: 353px;
}

.timer .rectangle-2 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 200px;
  left: 17px;
  position: absolute;
  top: 0;
  width: 322px;
}

.timer .text-wrapper-54 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 16.4px;
  font-weight: 700;
  left: 38px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 20px;
  white-space: nowrap;
  width: 106px;
}

.timer .time {
  color: #000000;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 70px;
  font-weight: 700;
  height: 100px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 50px;
  width: 353px;
}

.timer .bottom-button {
  height: 37px;
  left: 139px;
  position: absolute;
  top: 156px;
  width: 78px;
}

.timer .input-fieldtext-wrapper {
  align-items: center;
  background-color: #ffffff;
  border: 0.5px solid;
  border-color: #e2e8f0;
  border-radius: 15px;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 130px;
  overflow: hidden;
  position: absolute;
  top: 19px;
  width: 100px;
}

.timer .input-fieldtext-2 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 44px;
}

.timer .text-wrapper-55 {
  color: #a0aec0;
  font-family: "Helvetica-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  height: 18px;
  letter-spacing: 0;
  line-height: 18px;
  margin-right: -19.5px;
  margin-top: -0.5px;
  position: relative;
  white-space: nowrap;
  width: 63.5px;
}

</style>
