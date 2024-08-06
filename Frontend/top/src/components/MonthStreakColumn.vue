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
        const response = await axios.get('https://i11a707.p.ssafy.io/api/dash/streak', {
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
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  font-family: Arial, sans-serif;
}

.title {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
  text-align: center;
}

.grid {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.streak-columns {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
}

.column {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  align-items: center; /* 중앙 정렬 */
}

.day {
  width: 20px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day.active {
  background-color: #5865f2;
}
</style>
