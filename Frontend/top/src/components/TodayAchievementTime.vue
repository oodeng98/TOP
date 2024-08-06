<template>
  <div class="box6">
    <div class="element6">
      <div class="overlap-group6">
        <div class="text6">{{ dailyTimeGoal }}</div>
        <div class="title-data6">일간 목표 시간</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const dailyTimeGoal = ref("00:00:00");

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/goal"
        );
        if (response.data.timeGoal) {
          dailyTimeGoal.value = response.data.timeGoal;
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchTimeGoal();
    });

    return {
      dailyTimeGoal,
    };
  },
};
</script>

<style scoped>
.box6 {
  height: 100px;
  width: 161px;
}

.box6 .element6 {
  height: 100px;
  left: 0;
  top: 0;
  width: 165px;
}

.box6 .overlap-group6 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 190px;
}

.box6 .text6 {
  color: #1d1a1a;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 30px;
  font-weight: 700;
  left: 35px;
  letter-spacing: 0.38px;
  line-height: 24px;
  position: absolute;
  top: 45px;
  white-space: nowrap;
  width: 63px;
}

.box6 .title-data6 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  left: 45px;
  letter-spacing: 0.5px;
  line-height: 22px;
  position: absolute;
  text-align: center;
  top: 8px;
  white-space: nowrap;
}
</style>
