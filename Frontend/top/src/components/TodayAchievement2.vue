<template>
  <div class="goal-container">
    <div class="goal-label">일간 목표 달성률</div>
    <div class="goal-chart">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path
          class="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          :class="['circle', { 'no-animation': !animated }]"
          :style="{ strokeDasharray: `${percentage}, 100` }"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">{{ dailyAchievement }}</text>
      </svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "GoalChart",
  props: {
    animated: {
      type: Boolean,
      default: true,
    },
  },
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
          "TodayAchievement2 데이터를 가져오는 중 오류 발생1:",
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
        console.log(response);
        let timeGoal = 1;
        timeGoal = response.data.data.timeGoal * 60;
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
      updatePercentage();
    });

    return {
      dailyAchievement,
    };
  },
};
</script>

<style scoped>
.goal-container {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  text-align: center;
  height: 100%; /* 부모 요소의 높이를 100%로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.goal-chart {
  width: 150px; /* 원하는 크기로 설정 */
}

.circular-chart {
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke: #5865f2;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease-out;
}

.no-animation {
  transition: none;
}

.percentage {
  color: #1d1a1a;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  font-size: 0.5em;
  text-anchor: middle;
}

.goal-label {
  margin-top: 10px;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #a0aec0;
}
</style>
