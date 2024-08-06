<template>
  <div class="streak-container">
    <div class="streak-string">스트릭</div>
    <div class="box">
      <div
        class="week-grid"
        v-for="(week, index) in weekData"
        :key="index"
        :class="['week-string']"
      >
        {{ week }}
      </div>
    </div>
    <div class="calendar-grid">
      <div
        v-for="(day, index) in yearData"
        :key="index"
        :class="['day', day.colorClass]"
        :style="getGridPosition(index)"
        :title="`${day.date}: 일일 집중: ${day.activity}분`"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      weekData: ["S", "M", "T", "W", "T", "F", "S"],
      yearData: [],
      focusTimeList: [],
    };
  },
  mounted() {
    this.fetchFocusTimeData();
    // this.generateYearData()
  },
  methods: {
    // axios로 데이터 받기, 데이터 채워지면 focusTimeList 주석처리하고 위에 3줄 주석지우기
    async fetchFocusTimeData() {
      try {
        const response = await axios.get('https://i11a707.p.ssafy.io/api/dash/streak', {
          params: { month: 6 }
        });
        this.focusTimeList = response.data.data;
      //   this.focusTimeList = [
			// 	{
			// 		"day" : "07-15",
			// 		"focusTime" : 666
			// 	},
			// 	{
			// 		"day" : "07-16",
			// 		"focusTime" : 777
			// 	},
			// 	{
			// 		"day" : "07-17",
			// 		"focusTime" : 888
			// 	}
			// ],
        this.generateYearData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // 6개월치의 날짜, 집중시간을 가진 배열 생성
    generateYearData() {
      const today = new Date();
      const week = today.getDay();
      const startOfWeek = this.getStartOfWeek(today);
      const startDate = new Date(startOfWeek);

      // 6개월 전
      startDate.setMonth(startDate.getMonth() - 6);
      
      const endDate = new Date(startOfWeek);
      // 지금
      endDate.setMonth(endDate.getMonth());
      
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      
      for (let i = 0; i < totalDays + week; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0].substring(5); // "MM-DD" 형식
        const focusTimeEntry = this.focusTimeList.find(entry => entry.day === dateStr);
        
        let activity;
        let colorClass;
        
        if (i < week) {
          colorClass = this.getColorClass(activity);
        } else {
          // activity = Math.floor(Math.random() * 100); // 예시: 0에서 100까지의 랜덤 활동량
          if (focusTimeEntry) {
            activity = focusTimeEntry.focusTime;
          }
          colorClass = this.getColorClass(activity);
        }
        

        this.yearData.push({
          date: currentDate.toISOString().split('T')[0],
          activity,
          colorClass,
          focusTime: activity,
        });
      }
    },
  
    // 스트릭 시작일을 일요일로 고정
    getStartOfWeek(date) {
      const start = new Date(date);
      const day = start.getDay(); // 0 = 일요일, 1 = 월요일, ..., 6 = 토요일
      const diff = -day; // 오늘이 일요일인 경우, 시작일을 오늘로 설정
      start.setDate(start.getDate() + diff); // 주의 시작일로 설정
      return start;
    },
    // 
    getColorClass(activity) {
      // if (activity > 75) return "high-activity";
      // if (activity > 50) return "medium-activity";
      // if (activity > 25) return "low-activity";
      if (activity) return "yes-activity";
      return "no-activity";
    },
    getGridPosition(index) {
      // 세로로 채우기 위해서 행, 열을 반대로 계산
      const rowCount = 7; // 일주일 7일
      const row = (index % rowCount) + 1; // 1부터 시작
      const col = Math.floor(index / rowCount) + 1; // 1부터 시작
      
      return {
        gridRowStart: row,
        gridColumnStart: col,
      };
    },
  },
}
</script>

<style scoped>
.streak-container {
  position: relative;
  width: 644px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.streak-string {
  position: absolute;
  top: 10px;
  left: 30px;
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  font-size: 18px;
}

.box {
  position: absolute;
  top: 50px;
  left: 40px;
}

.week-string {
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 16px;
  text-align: center;
  margin-bottom: 4px;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
}

.calendar-grid {
  position: absolute;
  top: 50px;
  left: 70px;
  display: grid;
  grid-template-rows: repeat(7, 16px); /* 7일 */
  grid-template-columns: repeat(
    27,
    16px
  ); /* 26주인데 인접 년도의 활동도 표시되어 넉넉하게 54주 */
  grid-gap: 4px;
  /* margin: 20px auto; */
}

.day {
  width: 16px;
  height: 16px;
  /* transition: background-color 0.3s; */
}

.no-activity {
  background-color: #f0f0f0;
}

.yes-activity {
  background-color: rgba(88, 101, 242, 1);
}

/* .medium-activity {
  background-color: rgba(88, 101, 242, 0.6);
}

.high-activity {
  background-color: rgba(88, 101, 242, 0.2);
} */
</style>
