<template>
  <div class="box6">
    <div class="overlap-group6">
      <div class="title-data6">주간 목표 달성률</div>
      <div class="text6">{{ weeklyAchievement }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const weeklyAchievement = ref("0%");

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
              period: "week",
            },
          }
        );
        const weeklyFocusTime = timeStringToSeconds(
          response.data.data.totalFocusTime
        );
        return weeklyFocusTime;
      } catch (error) {
        console.error(
          "WeekAchievement1 데이터를 가져오는 중 오류 발생1:",
          error
        );
        return 0;
      }
    };

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/goal"
        );
        let timeGoal = 1;
        if (response.data.data.timeGoal) {
          timeGoal = response.data.data.timeGoal * 60;
        }
        return timeGoal;
      } catch (error) {
        console.error(
          "WeekAchievement1 데이터를 가져오는 중 오류 발생2:",
          error
        );
        return 0;
      }
    };

    const updateWeeklyAchievement = async () => {
      const weeklyFocusTime = await fetchFocusTime();
      const timeGoal = await fetchTimeGoal();

      if (timeGoal > 0) {
        const achievementRate = (weeklyFocusTime / timeGoal) * 100;
        if (achievementRate <= 100) {
          weeklyAchievement.value = `${achievementRate.toFixed(2)}%`;
        } else {
          weeklyAchievement.value = "100%";
        }
      } else {
        weeklyAchievement.value = "0.00%";
      }
    };

    onMounted(() => {
      updateWeeklyAchievement();
    });

    return {
      weeklyAchievement,
    };
  },
};
</script>

<style scoped>
.box6 {
  height: 100px;
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

.box6 .title-data6 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 22px;
  white-space: nowrap;
  margin-bottom: 8px; /* 텍스트 간격을 위해 추가 */
}

.box6 .text6 {
  color: #1d1a1a;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.38px;
  line-height: 24px;
  white-space: nowrap;
}
</style>
