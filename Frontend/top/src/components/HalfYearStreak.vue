<template>
  <div class="streak-container">
    <div class="title">스트릭</div>
    <div class="grid-container">
      <div class="day-labels">
        <div class="day-label" v-for="(day, index) in days" :key="index">{{ day }}</div>
      </div>
      <div class="months-container">
        <div v-for="(month, monthIndex) in filteredMonths" :key="monthIndex" class="month">
          <div class="month-label">{{ month.year }} {{ month.name }}</div>
          <div class="weeks">
            <div v-for="(week, weekIndex) in month.weeks" :key="weekIndex" class="week">
              <div
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :class="['day', { active: day.active }]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StreakChart",
  props: {
    activeDates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      months: this.generateMonths(),
    };
  },
  computed: {
    filteredMonths() {
      // Return the last 6 months from the data
      return this.months.slice(-6);
    },
  },
  methods: {
    generateMonths() {
      const months = [];
      const today = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push(this.generateMonthData(date));
      }
      return months;
    },
    generateMonthData(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthName = date.toLocaleString('default', { month: 'long' });
      const weeks = this.generateWeeks(year, month);
      return { year, name: monthName, weeks };
    },
    generateWeeks(year, month) {
      const weeks = [];
      let week = new Array(7).fill({ active: false });
      const date = new Date(year, month, 1);
      const firstDay = date.getDay();

      for (let i = 0; i < firstDay; i++) {
        week[i] = { active: false };
      }

      while (date.getMonth() === month) {
        if (date.getDay() === 0 && date.getDate() !== 1) {
          weeks.push(week);
          week = new Array(7).fill({ active: false });
        }
        const day = date.getDate();
        const active = this.activeDates.includes(`${year}-${month + 1}-${day}`);
        week[date.getDay()] = { active };
        date.setDate(day + 1);
      }
      weeks.push(week);

      while (weeks.length < 6) {
        weeks.push(new Array(7).fill({ active: false }));
      }

      return weeks;
    },
  },
};
</script>

<style scoped>
.streak-container {
  width: 644px;
  height: 200px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 10px;
  text-align: left;
}

.grid-container {
  display: flex;
  overflow-x: auto;
  height: calc(100% - 30px);
}

.day-labels {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.day-label {
  font-size: 14px;
  color: #4a4a4a;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-bottom: 5px;
}

.months-container {
  display: flex;
}

.month {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.month-label {
  text-align: center;
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.weeks {
  display: flex;
  flex-direction: column;
}

.week {
  display: flex;
}

.day {
  width: 20px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 1px;
}

.day.active {
  background-color: #4a90e2;
}
</style>
