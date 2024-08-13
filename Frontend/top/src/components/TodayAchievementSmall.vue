<template>
  <div class="box6">
    <div class="overlap-group6">
      <div class="title-data6">일간 목표 달성률</div>
      <div class="text6">{{ dailyAchievement }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const dailyAchievement = ref("0.00%");

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
              period: "day",
            },
          }
        );

        const dailyFocusTime = timeStringToSeconds(
          response.data.data.totalFocusTime
        );
        return dailyFocusTime;
      } catch (error) {
        console.error(
          "TodayAchievement1 데이터를 가져오는 중 오류 발생1:",
          error
        );
        return 0;
      }
    };

    const fetchTimeGoal = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/goal",
          {
            params: {
              period: "day",
            },
          }
        );
        let timeGoal = 1;
        if (response.data.data[0].timeGoal) {
          timeGoal = response.data.data[0].timeGoal * 60;
        }
        return timeGoal;
      } catch (error) {
        console.error(
          "TodayAchievement1 데이터를 가져오는 중 오류 발생2:",
          error
        );
        return 0;
      }
    };

    const updateDailyAchievement = async () => {
      const dailyFocusTime = await fetchFocusTime();
      const timeGoal = await fetchTimeGoal();

      if (timeGoal > 0) {
        const achievementRate = (dailyFocusTime / timeGoal) * 100;
        if (achievementRate <= 100) {
          dailyAchievement.value = `${achievementRate.toFixed(2)}%`;
        } else {
          dailyAchievement.value = "100%";
        }
      } else {
        dailyAchievement.value = "0.00%";
      }
    };

    onMounted(() => {
      updateDailyAchievement();
      const intervalId = setInterval(updateDailyAchievement, 60000);

      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      dailyAchievement,
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
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 25.2px;
  white-space: nowrap;
}
</style>
