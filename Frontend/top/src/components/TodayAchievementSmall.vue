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
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "GoalChart",
  props: {
    animated: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const dailyAchievement = ref("0.00%");
    const percentage = ref(0); // 달성률 백분율 값
    const interval = ref(null);

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
          "TodayAchievement2 데이터를 가져오는 중 오류 발생1:",
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
        timeGoal = response.data.data.timeGoal;
        return timeGoal;
      } catch (error) {
        console.error(
          "TodayAchievement2 데이터를 가져오는 중 오류 발생2:",
          error
        );
        return 0;
      }
    };

    const updatePercentage = async () => {
      const dailyFocusTime = await fetchFocusTime();
      const timeGoal = await fetchTimeGoal();

      if (timeGoal > 0) {
        const achievementRate = (dailyFocusTime / timeGoal) * 100;
        percentage.value = Math.min(achievementRate, 100); // 100을 넘지 않도록 설정
        dailyAchievement.value = `${percentage.value.toFixed(2)}%`;
      } else {
        dailyAchievement.value = "0.00%";
        percentage.value = 0;
      }
    };

    // 주기적인 사용 시간 데이터 업데이트 시작
    const startFetching = () => {
      updatePercentage();
      interval.value = setInterval(() => {
        updatePercentage();
      }, 1000);
    };

    // 주기적인 업데이트 정지
    const stopfetching = () => {
      if (interval.value) {
        clearInterval(interval.value);
      }
    };

    onMounted(() => {
      startFetching();
    });

    onBeforeUnmount(() => {
      stopfetching();
    });

    return {
      dailyAchievement,
      percentage,
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
  height: 100%;
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
</style>
