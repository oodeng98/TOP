<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <a class="edit-button" @click="toggleEditMode">/EDIT</a>
      </div>
      <div ref="gridstack" class="grid-stack"></div>
      <Sidebar
        :availableComponents="availableComponents"
        :isOpen="isSidebarOpen"
        @toggleComponent="toggleComponent"
      />
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
import Sidebar from "./Sidebar.vue";
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
  components: { Sidebar },
  setup() {
    const gridstack = ref(null);
    const isSidebarOpen = ref(false);
    const isEditMode = ref(false);
    let grid;

    const components = [
      { name: "TodayFocusSmall", component: TodayFocusSmall, width: 2, height: 1 },
      { name: "WeekFocusSmall", component: WeekFocusSmall, width: 2, height: 1 },
      { name: "MonthFocusSmall", component: MonthFocusSmall, width: 2, height: 1 },
      { name: "TotalFocusSmall", component: TotalFocusSmall, width: 2, height: 1 },
      { name: "TodayFocusBig", component: TodayFocusBig, width: 3, height: 1 },
      { name: "WeekFocusBig", component: WeekFocusBig, width: 3, height: 1 },
      { name: "MonthFocusBig", component: MonthFocusBig, width: 3, height: 1 },
      { name: "TodayFocusBigWithoutComparison", component: TodayFocusBigWithoutComparison, width: 3, height: 1 },
      { name: "WeekFocusBigWithoutComparison", component: WeekFocusBigWithoutComparison, width: 3, height: 1 },
      { name: "MonthFocusBigWithoutComparison", component: MonthFocusBigWithoutComparison, width: 3, height: 1 },
      { name: "TotalFocusBig", component: TotalFocusBig, width: 3, height: 1 },
      { name: "PercentileRank", component: PercentileRank, width: 4, height: 3 },
      { name: "TimerCheck", component: TimerCheck, width: 4, height: 2 },
      { name: "TodayAchievementSmall", component: TodayAchievementSmall, width: 2, height: 1 },
      { name: "WeekAchievementSmall", component: WeekAchievementSmall, width: 2, height: 1 },
      { name: "MonthAchievementSmall", component: MonthAchievementSmall, width: 2, height: 1 },
      { name: "TodayAchievementBig", component: TodayAchievementBig, width: 2, height: 2 },
      { name: "WeekAchievementBig", component: WeekAchievementBig, width: 2, height: 2 },
      { name: "MonthAchievementBig", component: MonthAchievementBig, width: 2, height: 2 },
      { name: "MonthStreakColumn", component: MonthStreakColumn, width: 2, height: 2 },
      { name: "MonthStreakRow", component: MonthStreakRow, width: 2, height: 2 },
      { name: "CalendarCheck", component: CalendarCheck, width: 5, height: 4 },
      { name: "FocusTimeEachPrograms", component: FocusTimeEachPrograms, width: 6, height: 4 },
      { name: "FocusTimeEachProgramsPrecentage", component: FocusTimeEachProgramsPrecentage, width: 7, height: 4 },
      { name: "TimeLine", component: TimeLine, width: 7, height: 4 },
      { name: "TodayTargetTime", component: TodayTargetTime, width: 2, height: 1 },
      { name: "WeekTargetTime", component: WeekTargetTime, width: 2, height: 1 },
      { name: "MonthTargetTime", component: MonthTargetTime, width: 2, height: 1 },
      { name: "SixMonthStreak", component: SixMonthStreak, width: 6, height: 2 },
      { name: "BannedProgramList", component: BannedProgramList, width: 5, height: 4 },
    ];

    const availableComponents = ref(components.map((c) => ({ ...c, isActive: false })));

    const addWidget = (componentConfig, width, height, pos = {}) => {
      if (!grid) {
        console.error("GridStack is not initialized yet.");
        return;
      }

      const widgetElement = document.createElement("div");
      widgetElement.className = "grid-stack-item";
      widgetElement.dataset.componentName = componentConfig.name;
      widgetElement.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="widget-delete">✖</div>
        </div>`;
      grid.addWidget(widgetElement, { w: width, h: height, ...pos, noResize: true });

      const contentElement = widgetElement.querySelector(".grid-stack-item-content");
      if (contentElement) {
        const app = createApp(componentConfig.component);
        app.mount(contentElement);
      } else {
        console.error("Failed to find .grid-stack-item-content element.");
      }
    };

    const removeWidget = (event) => {
      const widgetElement = event.target.closest(".grid-stack-item");
      const componentName = widgetElement.dataset.componentName;
      grid.removeWidget(widgetElement);
      const componentConfig = availableComponents.value.find((c) => c.name === componentName);
      if (componentConfig) {
        componentConfig.isActive = false;
      }
    };

    const toggleComponent = (name) => {
      const componentConfig = availableComponents.value.find((c) => c.name === name);
      if (!componentConfig) return;

      const existingWidget = grid.engine.nodes.find((n) => n.el.dataset.componentName === name);
      if (existingWidget) {
        grid.removeWidget(existingWidget.el);
        componentConfig.isActive = false;
      } else {
        addWidget(componentConfig, componentConfig.width, componentConfig.height);
        componentConfig.isActive = true;
      }
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

        // 기본 제공 컴포넌트 추가
        const defaultComponents = [
          { name: "TodayFocusBig", component: TodayFocusBig, width: 3, height: 1 },
          { name: "WeekFocusBig", component: WeekFocusBig, width: 3, height: 1 },
          { name: "MonthFocusBig", component: MonthFocusBig, width: 3, height: 1 },
          { name: "TotalFocusBig", component: TotalFocusBig, width: 3, height: 1 },
          { name: "TimeLine", component: TimeLine, width: 7, height: 4 },
          { name: "BannedProgramList", component: BannedProgramList, width: 5, height: 4 },
          { name: "FocusTimeEachProgramsPrecentage", component: FocusTimeEachProgramsPrecentage, width: 7, height: 4 },
          { name: "CalendarCheck", component: CalendarCheck, width: 5, height: 4 },
        ];

        defaultComponents.forEach(({ name, component, width, height }) => {
          addWidget({ name, component }, width, height);
          const componentConfig = availableComponents.value.find((c) => c.name === name);
          if (componentConfig) {
            componentConfig.isActive = true;
          }
        });
      });
    });

    return {
      gridstack,
      isSidebarOpen,
      isEditMode,
      availableComponents,
      toggleSidebar,
      toggleEditMode,
      addWidget,
      toggleComponent,
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
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
  border-radius: 10px 10px 0 0;
  margin-bottom: 20px;
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
  width: 350px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
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
  right: 350px;
}

.toggle-button:hover {
  background-color: #2980b9;
}

.sidebar-content {
  padding: 20px;
  height: calc(100% - 40px);
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

.sidebar-content button.active {
  background-color: gray;
}

.sidebar-content button:hover {
  background-color: #2980b9;
}

.content {
  flex-grow: 1;
  overflow: auto;
  transition: margin-right 0.3s ease, width 0.3s ease;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.layout.sidebar-open .content {
  margin-right: 250px;
}

.grid-stack {
  width: 100%;
  padding: 20px;
  flex-shrink: 0;
}

.grid-stack-item {
  width: calc(100% / 12);
}

.grid-stack-item-content {
  background-color: #ffffff !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  height: 100%;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
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
  display: none;
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