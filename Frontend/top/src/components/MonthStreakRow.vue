<template>
  <div class="calendar-streak">
    <div class="title">월간 스트릭</div>
    <div class="grid">
      <div class="day-label" v-for="(day, index) in days" :key="index">{{ day }}</div>
      <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="week">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          :class="['day', { active: day }]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarStreak",
  data() {
    return {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      weeks: [
        [false, true, false, false, false, true, false],
        [true, false, true, false, true, false, true],
        [false, true, false, true, false, true, false],
        [true, false, true, false, true, false, true],
        [false, true, false, false, false, true, false],
      ],
    };
  },
};
</script>

<style scoped>
.calendar-streak {
  width: 161px;
  height: 200px;
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 10px;
  padding-top: 20px;
}

.grid {
  display: grid;
  margin-top: 10px;
  padding-left: 3px;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day-label {
  font-size: 14px;
  color: #4a4a4a;
}

.week {
  display: contents;
  gap: 5px;
}

.day {
  width: 18px;
  height: 18px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.day.active {
  background-color: #5865f2;
}
</style>
