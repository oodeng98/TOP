<template>
  <div class="box5">
    <div class="timer5">
      <div class="overlap-group5">
        <div class="rectangle5"></div>
        <div class="text-wrapper5">Timer</div>
        <div class="time5">01:03:56</div>
        <div class="input-withaddons5">
          <div class="input-fieldtext5">
            <div class="div5">카테고리</div>
          </div>
          <!-- 시작 중지 초기화 버튼 만들어야함 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.box5 {
  height: 200px;
  width: 322px;
}

.box5 .timer5 {
  height: 200px;
  left: 0;
  top: 0;
  width: 322px;
}

.box5 .overlap-group5 {
  height: 200px;
  position: relative;
  width: 322px;
}

.box5 .rectangle5 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 200px;
  left: 17px;
  position: absolute;
  top: 0;
  width: 322px;
}

.box5 .text-wrapper5 {
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

.box5 .time5 {
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

.box5 .bottom-button5 {
  height: 37px;
  left: 139px;
  position: absolute;
  top: 156px;
  width: 78px;
}

.box5 .input-withaddons5 {
  align-items: center;
  background-color: #ffffff;
  border: 0.5px solid;
  border-color: #e2e8f0;
  border-radius: 15px;
  display: flex;
  height: 30px;
  justify-content: center;
  left: 130px;
  overflow: hidden;
  position: absolute;
  top: 19px;
  width: 100px;
}

.box5 .input-fieldtext5 {
  align-items: center;
  display: center;
  flex-direction: column;
  justify-content: center;
  /* overflow: hidden; */
  position: relative;
  width: 44px;
}

.box5 .div5 {
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
  left: -10px;
  width: 63.5px;
}
</style>