<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <a class="edit-button" @click="toggleEditMode">/EDIT</a>
      </div>
      <div ref="gridstack" class="grid-stack"></div>
      <button
        class="toggle-button"
        :class="{ open: isSidebarOpen }"
        @click="toggleSidebar"
      >
        ☰
      </button>
    </div>
  </div>
</template>

<script>
import { createApp, onMounted, ref, nextTick } from "vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import TodayFocusSmall from "./TodayFocusSmall.vue";
import WeekFocusSmall from "./WeekFocusSmall.vue";
import MonthFocusSmall from "./MonthFocusSmall.vue";
import TotalFocusSmall from "./TotalFocusSmall.vue";
import TodayFocusBig from "./TodayFocusBig.vue";
import WeekFocusBig from "./WeekFocusBig.vue";
import MonthFocusBig from "./MonthFocusBig.vue";
import TodayFocusBigWithoutComparison from "./TodayFocusBigWithoutComparison.vue";
import WeekFocusBigWithoutComparison from "./WeekFocusBigWithoutComparison.vue";
import MonthFocusBigWithoutComparison from "./MonthFocusBigWithoutComparison.vue";
import TotalFocusBig from "./TotalFocusBig.vue";
import PercentileRank from "./PercentileRank.vue";
import TimerCheck from "./TimerCheck.vue";
import TodayAchievementSmall from "./TodayAchievementSmall.vue";
import WeekAchievementSmall from "./WeekAchievementSmall.vue";
import MonthAchievementSmall from "./MonthAchievementSmall.vue";
import TodayAchievementBig from "./TodayAchievementBig.vue";
import WeekAchievementBig from "./WeekAchievementBig.vue";
import MonthAchievementBig from "./MonthAchievementBig.vue";
import MonthStreakColumn from "./MonthStreakColumn.vue";
import MonthStreakRow from "./MonthStreakRow.vue";
import CalendarCheck from "./CalendarCheck.vue";
import FocusTimeEachPrograms from "./FocusTimeEachPrograms.vue";
import FocusTimeEachProgramsPrecentage from "./FocusTimeEachProgramsPrecentage.vue";
import TimeLine from "./TimeLine.vue";
import TodayTargetTime from "./TodayTargetTime.vue";
import WeekTargetTime from "./WeekTargetTime.vue";
import MonthTargetTime from "./MonthTargetTime.vue";
import SixMonthStreak from "./SixMonthStreak.vue";
import BannedProgramList from "./BannedProgramList.vue";

export default {
  name: "GridstackComponent",
  components: {},
  setup() {
    const gridstack = ref(null);
    const isSidebarOpen = ref(false);
    const isEditMode = ref(false);
    let grid;

    const addWidget = (component, width = 2, height = 2) => {
      if (!grid) {
        console.error("GridStack is not initialized yet.");
        return;
      }

      const widgetElement = document.createElement("div");
      widgetElement.className = "grid-stack-item";
      widgetElement.innerHTML = `
          <div class="grid-stack-item-content">
            <div class="widget-delete">✖</div>
          </div>`;
      grid.addWidget(widgetElement, { w: width, h: height, noResize : true });

      const contentElement = widgetElement.querySelector(
        ".grid-stack-item-content"
      );
      if (contentElement) {
        const app = createApp(component);
        app.mount(contentElement);
      } else {
        console.error("Failed to find .grid-stack-item-content element.");
      }
    };

    const removeWidget = (event) => {
      const widgetElement = event.target.closest(".grid-stack-item");
      grid.removeWidget(widgetElement);
    };

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
      const deleteButtons = document.querySelectorAll(".widget-delete");
      deleteButtons.forEach((button) => {
        button.style.display = isEditMode.value ? "block" : "none";
      });
    };

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    onMounted(() => {
      nextTick(() => {
        const gridElement = gridstack.value;
        if (!gridElement) {
          console.error("GridStack element not found");
          return;
        }

        grid = GridStack.init(
          {
            column: 12, // 그리드 열 수 설정
            cellHeight: 125, // 셀 높이 설정
            float: true,
          },
          gridElement
        );

        // 이벤트 위임을 사용하여 삭제 버튼 클릭 처리
        gridElement.addEventListener("click", (event) => {
          if (event.target.classList.contains("widget-delete")) {
            removeWidget(event);
          }
        });

        // 모든 컴포넌트를 초기 상태로 추가
        const components = [
          // figma기준 width 2, height1 당 1칸
          { component: TodayFocusSmall, width: 2, height: 1 },
          { component: WeekFocusSmall, width: 2, height: 1 },
          { component: MonthFocusSmall, width: 2, height: 1 },
          { component: TotalFocusSmall, width: 2, height: 1 },
          { component: TodayFocusBig, width: 3, height: 1 },
          { component: WeekFocusBig, width: 3, height: 1 },
          { component: MonthFocusBig, width: 3, height: 1 },
          { component: TodayFocusBigWithoutComparison, width: 3, height: 1 },
          { component: WeekFocusBigWithoutComparison, width: 3, height: 1 },
          { component: MonthFocusBigWithoutComparison, width: 3, height: 1 },
          { component: TotalFocusBig, width: 3, height: 1 },
          { component: PercentileRank, width: 4, height: 3 },
          { component: TimerCheck, width: 4, height: 2 },
          { component: TodayAchievementSmall, width: 2, height: 1 },
          { component: WeekAchievementSmall, width: 2, height: 1 },
          { component: MonthAchievementSmall, width: 2, height: 1 },
          { component: TodayAchievementBig, width: 2, height: 2 },
          { component: WeekAchievementBig, width: 2, height: 2 },
          { component: MonthAchievementBig, width: 2, height: 2 },
          { component: MonthStreakColumn, width: 2, height: 2 },
          { component: MonthStreakRow, width: 2, height: 2 },
          { component: CalendarCheck, width: 5, height: 4 },
          { component: FocusTimeEachPrograms, width: 6, height: 4 },
          { component: FocusTimeEachProgramsPrecentage, width: 7, height: 4 },
          { component: TimeLine, width: 7, height: 4 },
          { component: TodayTargetTime, width: 2, height: 1 },
          { component: WeekTargetTime, width: 2, height: 1 },
          { component: MonthTargetTime, width: 2, height: 1 },
          { component: SixMonthStreak, width: 6, height: 2},
          { component: BannedProgramList, width: 5, height: 4},
        ];

        components.forEach(({ component, width, height }) => {
          addWidget(component, width, height);
        });
      });
    });

    return {
      gridstack,
      isSidebarOpen,
      isEditMode,
      toggleSidebar,
      toggleEditMode,
      addWidget,
    };
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f9fa;
  border-radius: 10px; /* 대시보드 모서리를 둥글게 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
  border-radius: 10px 10px 0 0; /* 상단 모서리 둥글게 */
  margin-bottom: 20px; /* 내용과의 간격 추가 */
}

.header h1 {
  margin: 0;
}

.edit-button {
  cursor: pointer;
  color: #3498db;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto; /* 사이드바 내부 스크롤 설정 */
  border-top-left-radius: 10px; /* 사이드바 모서리를 둥글게 */
  border-bottom-left-radius: 10px; /* 사이드바 모서리를 둥글게 */
}

.sidebar.open {
  transform: translateX(0);
}

.toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1001;
  transition: right 0.3s ease;
}

.toggle-button.open {
  right: 270px; /* 사이드바 너비 + 여백 */
}

.toggle-button:hover {
  background-color: #2980b9;
}

.sidebar-content {
  padding: 20px;
  height: calc(
    100% - 40px
  ); /* 높이를 계산하여 상단 버튼을 포함하지 않도록 설정 */
}

.sidebar-content button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-content button:hover {
  background-color: #2980b9;
}

.content {
  flex-grow: 1;
  overflow: auto;
  transition: margin-right 0.3s ease, width 0.3s ease;
  background-color: #f8f9fa;
  border-radius: 10px; /* 대시보드 모서리를 둥글게 */
}

.layout.sidebar-open .content {
  margin-right: 250px; /* 사이드바의 너비만큼 오른쪽으로 이동 */
}

.grid-stack {
  width: 100%;
  padding: 20px; /* 사이드바와 대시보드 간의 여백을 추가 */
  flex-shrink: 0; /* 대시보드가 사이드바에 밀리지 않도록 고정 */
}

.grid-stack-item {
  width: calc(100% / 12); /* 12열 그리드에 맞게 셀 너비를 설정 */
}

.grid-stack-item-content {
  background-color: #ffffff !important; /* 위젯 배경색을 하얀색으로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333; /* 텍스트 색상 변경 */
  height: 100%;
  border-radius: 10px; /* 위젯 모서리를 둥글게 설정 */
  white-space: nowrap; /* 줄넘김 방지 */
  overflow: hidden;
  text-overflow: ellipsis; /* 글자 길어질 경우 생략표시 */
  position: relative; /* 삭제 버튼 위치를 위해 필요 */
}

.widget-delete {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  display: none; /* 초기에는 숨김 */
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>