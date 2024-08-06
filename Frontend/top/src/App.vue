<!-- <template>
  <div>
    <BannedProgramList />
    <TodayFocus1 />
    <WeekFocus1 />
    <MonthFocus1 />
    <TotalFocus1 />
    <TodayFocus2WithoutID />
    <WeekFocus2WithoutID />
    <MonthFocus2WithoutID />
    <TotalFocus2WithoutID />
  </div>
  <div>
    <TodayFocus2 />
    <WeekFocus2 />
    <MonthFocus2 />
  </div>
  <div>
    <PercentileRank />
  </div>
  <div>
    <TimeCheck />
  </div>
  <div>
    <TodayAchievement1 />
    <WeekAchievement1 />
    <MonthAchievement1 />
  </div>
  <div>
    <TodayAchievement2 />
    <WeekAchievement2 />
    <MonthAchievement2 />
  </div>
  <div>
    <MonthStreakColumn />
    <MonthStreakRow />
    <HalfYearStreak />
    <SixMonthStreak />
  </div>
  <div>
    <CalendarCheck />
  </div>
  <div>
    <FocusTimeEachPrograms />
    <FocusTimeEachProgramsPrecentage />
  </div>
  <div>
    <TimeLine />
  </div>
  <div>
    <TodayAchievementTime />
    <WeekAchievementTime />
    <MonthAchievementTime />
  </div>
</template>

<script>

import BannedProgramList from "./components/BannedProgramList.vue";
// 1
import TodayFocus1 from "./components/TodayFocus1.vue";
import WeekFocus1 from "./components/WeekFocus1.vue";
import MonthFocus1 from "./components/MonthFocus1.vue";
import TotalFocus1 from "./components/TotalFocus1.vue";
// 2
import TodayFocus2WithoutID from "./components/TodayFocus2WithoutID.vue";
import WeekFocus2WithoutID from "./components/WeekFocus2WithoutID.vue";
import MonthFocus2WithoutID from "./components/MonthFocus2WithoutID.vue";
import TotalFocus2WithoutID from "./components/TotalFocus2WithoutID.vue";
// 3
import TodayFocus2 from "./components/TodayFocus2.vue";
import WeekFocus2 from "./components/WeekFocus2.vue";
import MonthFocus2 from "./components/MonthFocus2.vue";
// 4
import PercentileRank from "./components/PercentileRank.vue";
// 5
import TimeCheck from "./components/TimeCheck.vue";
//6
import TodayAchievement1 from "./components/TodayAchievement1.vue";
import WeekAchievement1 from "./components/WeekAchievement1.vue";
import MonthAchievement1 from "./components/MonthAchievement1.vue";
//7
import MonthAchievement2 from "./components/MonthAchievement2.vue";
import WeekAchievement2 from "./components/WeekAchievement2.vue";
import TodayAchievement2 from "./components/TodayAchievement2.vue";
//8
import MonthStreakColumn from "./components/MonthStreakColumn.vue";
import MonthStreakRow from "./components/MonthStreakRow.vue";
import HalfYearStreak from "./components/HalfYearStreak.vue";
//9
import CalendarCheck from "./components/CalendarCheck.vue";
//10
import FocusTimeEachPrograms from './components/FocusTimeEachPrograms.vue';
import FocusTimeEachProgramsPrecentage from './components/FocusTimeEachProgramsPrecentage.vue';
//11
import TimeLine from "./components/TimeLine.vue";
//12
import TodayAchievementTime from "./components/TodayAchievementTime.vue";
import WeekAchievementTime from "./components/WeekAchievementTime.vue";
import MonthAchievementTime from "./components/MonthAchievementTime.vue";

export default {
  name: "App",
  components: {
    BannedProgramList,
    TodayFocus1,
    WeekFocus1,
    MonthFocus1,
    TotalFocus1,
    TodayFocus2WithoutID,
    WeekFocus2WithoutID,
    MonthFocus2WithoutID,
    TotalFocus2WithoutID,
    TodayFocus2,
    WeekFocus2,
    MonthFocus2,
    PercentileRank,
    TimeCheck,
    TodayAchievement1,
    WeekAchievement1,
    MonthAchievement1,
    TodayAchievement2,
    WeekAchievement2,
    MonthAchievement2,
    MonthStreakColumn,
    MonthStreakRow,
    HalfYearStreak,
    SixMonthStreak,
    CalendarCheck,
    FocusTimeEachPrograms,
    FocusTimeEachProgramsPrecentage,
    TimeLine,
    TodayAchievementTime,
    WeekAchievementTime,
    MonthAchievementTime,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
<template>
  <div id="app" class="container">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
