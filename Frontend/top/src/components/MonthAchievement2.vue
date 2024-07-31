<template>
  <div class="goal-container">
    <div class="goal-chart">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path class="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path :class="['circle', {'no-animation': !animated}]"
          :style="{strokeDasharray: `${percentage}, 100`}"
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
export default {
  name: "GoalChart",
  props: {
    percentage: {
      type: Number,
      required: true,
      default: 90
    },
    animated: {
      type: Boolean,
      default: true
    }
  }
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
