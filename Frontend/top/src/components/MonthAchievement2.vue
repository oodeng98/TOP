<template>
  <div class="goal-container">
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
        <text x="18" y="20.35" class="percentage">{{ percentage }}%</text>
      </svg>
    </div>
    <div class="goal-label">월간 목표 달성률</div>
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
    const percentage = ref(0);

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
          "https://i11a707.p.ssafy.io/api/focus-time/goal"
        );
        console.log(response);
        const timeGoal = timeStringToSeconds(response.data.timeGoal);
        return timeGoal;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        return 0;
      }
    };

    const updatePercentage = async () => {
      const monthlyFocusTime = await fetchFocusTime();
      const timeGoal = await fetchTimeGoal();

      if (timeGoal > 0) {
        const achievementRate = (monthlyFocusTime / timeGoal) * 100;
        percentage.value = achievementRate.toFixed(2);
      } else {
        percentage.value = "0";
      }
    };

    onMounted(() => {
      updatePercentage();
    });

    return {
      percentage,
    };
  },
};
</script>

<style scoped>
.goal-container {
  text-align: center;
  height: 200px;
  width: 161px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.goal-chart {
  width: 100%;
  height: 100%;
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
  fill: #000;
  font-family: Arial, sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}

.goal-label {
  margin-top: 10px;
  font-family: Arial, sans-serif;
  font-size: 1em;
  color: #888;
}
</style>
