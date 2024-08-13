<template>
  <div class="box">
    <div class="overlap-group6">
      <div class="title-data6">월간 목표 집중 시간</div>
      <div class="text6">{{ monthlyTimeGoal }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const monthlyTimeGoal = ref("00:00:00");

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/goal",
          {
            params: {
              period: "month",
            },
          }
        );
        if (response.data.data[0].timeGoal) {
          monthlyTimeGoal.value = response.data.data[0].timeGoal;
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchTimeGoal();
      const intervalId = setInterval(fetchTimeGoal, 60000);

      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      monthlyTimeGoal,
    };
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
}

.box .overlap-group6 {
  display: flex;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box .text6 {
  color: #1d1a1a;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.38px;
  line-height: 24px;
  white-space: nowrap;
}

.box .title-data6 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 22px;
  margin-bottom: 5px;
  white-space: nowrap;
}
</style>
