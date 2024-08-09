<template>
  <div class="container" @click="handleOutsideClick">
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <button
          v-if="!isSidebarOpen"
          class="toggle-button"
          @click.stop="toggleSidebar"
        >
          Edit
        </button>
      </div>
      <div ref="gridstack" class="grid-stack"></div>
      <Sidebar
        v-if="isSidebarOpen"
        :availableComponents="availableComponents"
        :isOpen="isSidebarOpen"
        @toggleComponent="toggleComponent"
      />
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
    let grid;

    const components = [
      {
        name: "오늘의 집중 시간 2x1",
        component: TodayFocusSmall,
        width: 2,
        height: 1,
      },
      {
        name: "오늘의 집중 시간(비교X) 3x1",
        component: TodayFocusBigWithoutComparison,
        width: 3,
        height: 1,
      },
      {
        name: "오늘의 집중 시간(비교O) 3x1",
        component: TodayFocusBig,
        width: 3,
        height: 1,
      },
      {
        name: "이번주 집중 시간 2x1",
        component: WeekFocusSmall,
        width: 2,
        height: 1,
      },
      {
        name: "이번주 집중 시간(비교X) 3x1",
        component: WeekFocusBigWithoutComparison,
        width: 3,
        height: 1,
      },
      {
        name: "이번주 집중 시간(비교O) 3x1",
        component: WeekFocusBig,
        width: 3,
        height: 1,
      },
      {
        name: "이번달 집중 시간 2x1",
        component: MonthFocusSmall,
        width: 2,
        height: 1,
      },
      {
        name: "이번달 집중 시간(비교X) 3x1",
        component: MonthFocusBigWithoutComparison,
        width: 3,
        height: 1,
      },
      {
        name: "이번달 집중 시간(비교O) 3x1",
        component: MonthFocusBig,
        width: 3,
        height: 1,
      },
      {
        name: "총 집중 시간 2x1",
        component: TotalFocusSmall,
        width: 2,
        height: 1,
      },
      {
        name: "총 집중 시간 3x1",
        component: TotalFocusBig,
        width: 3,
        height: 1,
      },
      {
        name: "일간 목표 달성률 2x1",
        component: TodayAchievementSmall,
        width: 2,
        height: 1,
      },
      {
        name: "일간 목표 달성률 2x2",
        component: TodayAchievementBig,
        width: 2,
        height: 2,
      },
      {
        name: "주간 목표 달성률 2x1",
        component: WeekAchievementSmall,
        width: 2,
        height: 1,
      },
      {
        name: "주간 목표 달성률 2x2",
        component: WeekAchievementBig,
        width: 2,
        height: 2,
      },
      {
        name: "월간 목표 달성률 2x1",
        component: MonthAchievementSmall,
        width: 2,
        height: 1,
      },
      {
        name: "월간 목표 달성률 2x2",
        component: MonthAchievementBig,
        width: 2,
        height: 2,
      },
      {
        name: "일간 목표 집중 시간 2x1",
        component: TodayTargetTime,
        width: 2,
        height: 1,
      },
      {
        name: "주간 목표 집중 시간 2x1",
        component: WeekTargetTime,
        width: 2,
        height: 1,
      },
      {
        name: "월간 목표 집중 시간 2x1",
        component: MonthTargetTime,
        width: 2,
        height: 1,
      },
      {
        name: "월간 스트릭(세로) 2x2",
        component: MonthStreakColumn,
        width: 2,
        height: 2,
      },
      {
        name: "월간 스트릭(가로) 2x2",
        component: MonthStreakRow,
        width: 2,
        height: 2,
      },
      { name: "스트릭 6x2", component: SixMonthStreak, width: 6, height: 2 },
      {
        name: "집중 백분율 4x3",
        component: PercentileRank,
        width: 4,
        height: 3,
      },
      { name: "타이머 4x2", component: TimerCheck, width: 4, height: 2 },
      { name: "캘린더 5x4", component: CalendarCheck, width: 5, height: 4 },
      {
        name: "프로그램별 집중 시간 6x4",
        component: FocusTimeEachPrograms,
        width: 6,
        height: 4,
      },
      {
        name: "프로그램별 집중 시간과 백분율 7x4",
        component: FocusTimeEachProgramsPrecentage,
        width: 7,
        height: 4,
      },
      {
        name: "타임라인 7x4",
        component: TimeLine,
        width: 7,
        height: 4,
      },
      {
        name: "금지 프로그램 목록 5x4",
        component: BannedProgramList,
        width: 5,
        height: 4,
      },
    ];

    const availableComponents = ref(
      components.map((c) => ({ ...c, isActive: false }))
    );

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
      grid.addWidget(widgetElement, {
        w: width,
        h: height,
        ...pos,
        noResize: true,
      });

      const contentElement = widgetElement.querySelector(
        ".grid-stack-item-content"
      );
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
      const componentConfig = availableComponents.value.find(
        (c) => c.name === componentName
      );
      if (componentConfig) {
        componentConfig.isActive = false;
      }
    };

    const toggleComponent = (name) => {
      const componentConfig = availableComponents.value.find(
        (c) => c.name === name
      );
      if (!componentConfig) return;

      const existingWidget = grid.engine.nodes.find(
        (n) => n.el.dataset.componentName === name
      );
      if (existingWidget) {
        grid.removeWidget(existingWidget.el);
        componentConfig.isActive = false;
      } else {
        addWidget(
          componentConfig,
          componentConfig.width,
          componentConfig.height
        );
        componentConfig.isActive = true;
      }
    };

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const handleOutsideClick = (event) => {
      const sidebarElement = document.querySelector(".sidebar");
      if (
        isSidebarOpen.value &&
        sidebarElement &&
        !sidebarElement.contains(event.target)
      ) {
        isSidebarOpen.value = false;
      }
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
          {
            name: "오늘의 집중 시간(비교X) 3x1",
            component: TodayFocusBigWithoutComparison,
            width: 3,
            height: 1,
          },
          {
            name: "이번주 집중 시간(비교X) 3x1",
            component: WeekFocusBigWithoutComparison,
            width: 3,
            height: 1,
          },
          {
            name: "이번달 집중 시간(비교X) 3x1",
            component: MonthFocusBigWithoutComparison,
            width: 3,
            height: 1,
          },
          {
            name: "총 집중 시간 3x1",
            component: TotalFocusBig,
            width: 3,
            height: 1,
          },
          {
            name: "타임라인 7x4",
            component: TimeLine,
            width: 7,
            height: 4,
          },
          {
            name: "금지 프로그램 목록 5x4",
            component: BannedProgramList,
            width: 5,
            height: 4,
          },
          {
            name: "프로그램별 집중 시간과 백분율 7x4",
            component: FocusTimeEachProgramsPrecentage,
            width: 7,
            height: 4,
          },
          { name: "캘린더 5x4", component: CalendarCheck, width: 5, height: 4 },
        ];

        defaultComponents.forEach(({ name, component, width, height }) => {
          addWidget({ name, component }, width, height);
          const componentConfig = availableComponents.value.find(
            (c) => c.name === name
          );
          if (componentConfig) {
            componentConfig.isActive = true;
          }
        });
      });
    });

    return {
      gridstack,
      isSidebarOpen,
      availableComponents,
      toggleSidebar,
      addWidget,
      toggleComponent,
      handleOutsideClick,
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
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: right 0.3s ease;
  text-align: center;
}

.toggle-button:hover {
  background-color: #5865f2;
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
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-content button.active {
  background-color: gray;
}

.sidebar-content button:hover {
  background-color: #5865f2;
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
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #5865f2;
}
</style>
