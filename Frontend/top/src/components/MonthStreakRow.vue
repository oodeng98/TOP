<template>
  <div class="calendar-streak">
    <div class="title">월간 스트릭</div>
    <div class="grid">
      <div class="day-label" v-for="(day, index) in days" :key="index">{{ day }}</div>
      <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="week">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          :class="['day', { active: day.active }]"
        ></div>
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
      weeks: Array(5).fill(Array(7).fill({ day: "", focusTime: 0, active: false })),
      interval: null,
    };
  },
  methods: {
    async fetchdata() {
      try {
        const response = await axios.get('https://i11a707.p.ssafy.io/api/dash/streak', {
          params: { month: 1 }
        });
        const focusTimeList = response.data.data;
        const updatedWeeks = this.weeks.map((week, weekIndex) => 
          week.map((day, dayIndex) => {
            const dateString = new Date(2023, 6, weekIndex * 7 + dayIndex + 1)
              .toISOString()
              .slice(5, 10);
            const focusTimeEntry = focusTimeList.find(
              (entry) => entry.day === dateString
            );
              day.focusTime = focusTimeEntry
            return { active: focusTimeEntry ? focusTimeEntry.focusTime > 0 : false };
          })
        );
        this.weeks = updatedWeeks;
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    },
    // 주기적인 사용 시간 데이터 업데이트 시작
    startFetching() {
      this.fetchdata();
      this.interval = setInterval(() => {
        this.fetchdata();
      }, 60000);
    },
    // 주기적인 업데이트 정지
    stopfetching() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
  },
  mounted() {
    this.startFetching();
  },
  beforeDestroy() {
    this.stopfetching();
  },
};
</script>

<style scoped>
.calendar-streak {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px; /* 동일한 간격 설정 */
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
}

.day-label {
  font-size: 14px;
  color: #4a4a4a;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
}

.week {
  display: contents;
}

.day {
  width: 20px; /* 크기 설정 */
  height: 20px; /* 크기 설정 */
  background-color: #e0e0e0;
  border-radius: 2px;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
}

.day.active {
  background-color: #5865f2;
}
</style>
