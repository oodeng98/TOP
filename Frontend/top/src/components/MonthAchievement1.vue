<template>
  <div class="box6">
    <div class="element6">
      <div class="overlap-group6">
        <div class="text6">{{ monthlyAchievement }}</div>
        <div class="title-data6">월간 목표 달성률</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const monthlyAchievement = ref("0%");

    const timeStringToSeconds = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time",
          {
            params: {
              period: "month",
            },
          }
        );
        console.log(response);
        const monthlyFocusTime = timeStringToSeconds(
          response.data.totalFocusTime
        );
        return monthlyFocusTime;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        return 0;
      }
    };

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io:8082/focus-time/goal"
        );
        let timeGoal = timeStringToSeconds("00:00:01");
        if (response.data.timeGoal) {
          timeGoal = timeStringToSeconds(response.data.timeGoal);
        }
        return timeGoal;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        return 0;
      }
    };

    const updateMonthlyAchievement = async () => {
      const monthlyFocusTime = await fetchFocusTime();
      const timeGoal = await fetchTimeGoal();

      if (timeGoal > 0) {
        const achievementRate = (monthlyFocusTime / timeGoal) * 100;
        monthlyAchievement.value = `${achievementRate.toFixed(2)}%`;
      } else {
        monthlyAchievement.value = "0%";
      }
    };

    onMounted(() => {
      updateMonthlyAchievement();
    });

    return {
      monthlyAchievement,
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
  width: 161px;
}

.box6 .text6 {
  color: #1d1a1a;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 30px;
  font-weight: 700;
  left: 40px;
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
  left: 16px;
  letter-spacing: 0.5px;
  line-height: 22px;
  position: absolute;
  top: 8px;
  white-space: nowrap;
}
</style>
