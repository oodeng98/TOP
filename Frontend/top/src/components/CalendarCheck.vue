<template>
  <div class="calendar-container">
    <div class="title">Calendar</div>
    <div class="calendar-header">
      <select v-model="selectedMonth" @change="updateCalendar">
        <option v-for="(month, index) in months" :key="index" :value="index">
          {{ month }}
        </option>
      </select>
      <select v-model="selectedYear" @change="updateCalendar">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="calendar-grid">
      <div class="day-label common-text" v-for="day in days" :key="day">
        {{ day }}
      </div>
      <div v-for="(week, weekIndex) in calendar" :key="weekIndex" class="week">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          :class="[
            'day',
            { 'current-month': day.isCurrentMonth, today: day.isToday },
          ]"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: this.generateYears(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      calendar: [],
    };
  },
  mounted() {
    this.updateCalendar();
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    },
    updateCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth;
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const firstDayIndex = firstDayOfMonth.getDay();
      const lastDate = lastDayOfMonth.getDate();

      const prevLastDay = new Date(year, month, 0).getDate();
      const prevDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
      const nextDays = 42 - (prevDays + lastDate);

      const daysArray = [];

      for (let x = prevDays; x > 0; x--) {
        daysArray.push({ date: prevLastDay - x + 1, isCurrentMonth: false });
      }

      for (let i = 1; i <= lastDate; i++) {
        const isToday =
          new Date().toDateString() === new Date(year, month, i).toDateString();
        daysArray.push({ date: i, isCurrentMonth: true, isToday });
      }

      for (let j = 1; j <= nextDays; j++) {
        daysArray.push({ date: j, isCurrentMonth: false });
      }

      this.calendar = [];
      while (daysArray.length) {
        this.calendar.push(daysArray.splice(0, 7));
      }
    },
  },
};
</script>

<style scoped>
.calendar-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 30px;
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  margin-bottom: 20px;
}

.common-text {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.calendar-header select {
  font-size: 16px;
  border: none;
  background: transparent;
  color: #5865f2;
  outline: none;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
}

.day-label {
  font-size: 14px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.week {
  display: contents;
}

.day {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f5f5f5;
  color: #4a4a4a;
  margin: auto; /* 중앙 정렬 추가 */
}

.day.current-month {
  background: #e0e0e0;
  font-weight: bold;
}

.day.today {
  background: #5865f2;
  color: white;
}

.day.current-month.today {
  background: #5865f2;
  color: white;
}
</style>