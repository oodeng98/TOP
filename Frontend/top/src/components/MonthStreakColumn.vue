<template>
  <div class="calendar-streak">
    <div class="title">월간 스트릭</div>
    <div class="grid">
      <div class="days-column">
        <div class="day-label" v-for="(day, index) in days" :key="index">{{ day }}</div>
      </div>
      <div class="streak-columns">
        <div v-for="(column, colIndex) in columns" :key="colIndex" class="column">
          <div
            v-for="(active, rowIndex) in column"
            :key="rowIndex"
            :class="['day', { active }]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CalendarStreak",
  data() {
    return {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      columns: [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
      ],
    };
  },
  methods: {
    async fetchStreakData() {
      try {
        const response = await axios.get('/api/dash/streak', {
          params: { month: 1 }
        });
        const focusTimeList = response.data.data.focusTimeList;

        const updatedColumns = this.columns.map((column, colIndex) =>
          column.map((day, rowIndex) => {
            const dateString = new Date(2023, 6, colIndex * 7 + rowIndex + 1)
              .toISOString()
              .slice(5, 10);
            const focusTimeEntry = focusTimeList.find(
              (entry) => entry.day === dateString
            );
            return focusTimeEntry ? focusTimeEntry.focusTime > 0 : false;
          })
        );

        this.columns = updatedColumns;
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    }
  },
  mounted() {
    this.fetchStreakData();
  }
};
</script>

<style scoped>
.calendar-streak {
  width: 161px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 4px;
}

.grid {
  display: flex;
}

.days-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;
}

.day-label {
  font-size: 14px;
  color: #4a4a4a;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-bottom: 5px;
}

.streak-columns {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.day {
  width: 20px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 5px;
}

.day.active {
  background-color: #5865f2;
}
</style>