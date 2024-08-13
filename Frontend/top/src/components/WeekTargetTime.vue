<template>
  <div class="box6">
    <div class="element6">
      <div class="overlap-group6">
        <div class="title-data6">주간 목표 집중 시간</div>
        <div class="text6">{{ weeklyTimeGoal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const weeklyTimeGoal = ref("00:00:00");

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/goal",
          {
            params: {
              period: "week",
            },
          }
        );
        if (response.data.data[0].timeGoal) {
          weeklyTimeGoal.value = response.data.data[0].timeGoal;
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
      weeklyTimeGoal,
    };
  },
};
</script>

<style scoped>
.box6 {
  height: 100%;
  width: 100%;
}

.box6 .overlap-group6 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  width: 100%;
}

.box6 .text6 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 25.2px;
  white-space: nowrap;
}

.box6 .title-data6 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 22px;
  white-space: nowrap;
}
</style>
