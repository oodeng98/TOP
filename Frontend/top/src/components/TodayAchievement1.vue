<template>
  <div class="box6">
    <div class="element6">
      <div class="overlap-group6">
        <div class="text6">{{ dailyAchievement }}</div>
        <div class="title-data6">일간 목표 달성률</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const dailyAchievement = ref("0%");

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
          "https://i11a707.p.ssafy.io/api/focus-time/goal"
        );
        let timeGoal = 1;
        if (response.data.data.timeGoal) {
          timeGoal = response.data.data.timeGoal * 60;
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
    });

    return {
      dailyAchievement,
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
