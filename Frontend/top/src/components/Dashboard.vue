<template>
  <div class="container" @click="handleOutsideClick">
    <div class="content">
      <div class="header">
        <h1>Dashboard</h1>
        <div class="buttons">
          <button class="openModalBtn" @click="openModal">설정</button>
          <button class="save-button" @click="saveWidgets">저장</button>
          <button
            v-if="!isSidebarOpen"
            class="toggle-button"
            @click.stop="toggleSidebar"
          >
            위젯
          </button>
        </div>
      </div>
      <div ref="gridstack" class="grid-stack"></div>
      <Sidebar
        v-if="isSidebarOpen"
        :availableComponents="availableComponents"
        :isOpen="isSidebarOpen"
        @toggleComponent="toggleComponent"
      />
    </div>

    <!-- 모달 창 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>목표 집중 시간 설정</h2>
        <form>
          <div class="form-group">
            <label for="dailyGoal">일간 목표 집중 시간:</label>
            <input type="number" v-model="dailyGoal" id="dailyGoal" /> 분
            <button @click="saveDailyGoal">저장</button>
          </div>
          <div class="form-group">
            <label for="weeklyGoal">주간 목표 집중 시간:</label>
            <input type="number" v-model="weeklyGoal" id="weeklyGoal" /> 분
            <button @click="saveWeeklyGoal">저장</button>
          </div>
          <div class="form-group">
            <label for="monthlyGoal">월간 목표 집중 시간:</label>
            <input type="number" v-model="monthlyGoal" id="monthlyGoal" /> 분
            <button @click="saveMonthlyGoal">저장</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { createApp, onMounted, ref, nextTick } from "vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import axios from "axios";
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
import CalendarCheck from "./CalendarCheck.vue";
import FocusTimeEachPrograms from "./FocusTimeEachPrograms.vue";
import FocusTimeEachProgramsPercentage from "./FocusTimeEachProgramsPercentage.vue";
import TimeLine from "./TimeLine.vue";
import TodayTargetTime from "./TodayTargetTime.vue";
import WeekTargetTime from "./WeekTargetTime.vue";
import MonthTargetTime from "./MonthTargetTime.vue";
import SixMonthStreak from "./SixMonthStreak.vue";
import BannedProgramList from "./BannedProgramList.vue";

import { useWidgetStore } from "@/store/useWidgetStore";
import Swal from 'sweetalert2';

export default {
  name: "GridstackComponent",
  components: { Sidebar },
  setup() {
    const gridstack = ref(null);
    const isSidebarOpen = ref(false);
    const isModalOpen = ref(false); // 모달 열림 상태 관리
    const dailyGoal = ref(0);
    const weeklyGoal = ref(0);
    const monthlyGoal = ref(0);
    const widgetStore = useWidgetStore(); // Pinia 스토어 사용

    let grid;

    const components = [
      {
        name: "오늘의 집중 시간 2x1",
        component: TodayFocusSmall,
        componentName: "TodayFocusSmall",
        width: 2,
        height: 1,
      },
      {
        name: "오늘의 집중 시간(비교X) 3x1",
        component: TodayFocusBigWithoutComparison,
        componentName: "TodayFocusBigWithoutComparison",
        width: 3,
        height: 1,
      },
      {
        name: "오늘의 집중 시간(비교O) 3x1",
        component: TodayFocusBig,
        componentName: "TodayFocusBig",
        width: 3,
        height: 1,
      },
      {
        name: "이번주 집중 시간 2x1",
        component: WeekFocusSmall,
        componentName: "WeekFocusSmall",
        width: 2,
        height: 1,
      },
      {
        name: "이번주 집중 시간(비교X) 3x1",
        component: WeekFocusBigWithoutComparison,
        componentName: "WeekFocusBigWithoutComparison",
        width: 3,
        height: 1,
      },
      {
        name: "이번주 집중 시간(비교O) 3x1",
        component: WeekFocusBig,
        componentName: "WeekFocusBig",
        width: 3,
        height: 1,
      },
      {
        name: "이번달 집중 시간 2x1",
        component: MonthFocusSmall,
        componentName: "MonthFocusSmall",
        width: 2,
        height: 1,
      },
      {
        name: "이번달 집중 시간(비교X) 3x1",
        component: MonthFocusBigWithoutComparison,
        componentName: "MonthFocusBigWithoutComparison",
        width: 3,
        height: 1,
      },
      {
        name: "이번달 집중 시간(비교O) 3x1",
        component: MonthFocusBig,
        componentName: "MonthFocusBig",
        width: 3,
        height: 1,
      },
      {
        name: "총 집중 시간 2x1",
        component: TotalFocusSmall,
        componentName: "TotalFocusSmall",
        width: 2,
        height: 1,
      },
      {
        name: "총 집중 시간 3x1",
        component: TotalFocusBig,
        componentName: "TotalFocusBig",
        width: 3,
        height: 1,
      },
      {
        name: "일간 목표 달성률 2x1",
        component: TodayAchievementSmall,
        componentName: "TodayAchievementSmall",
        width: 2,
        height: 1,
      },
      {
        name: "일간 목표 달성률 2x2",
        component: TodayAchievementBig,
        componentName: "TodayAchievementBig",
        width: 2,
        height: 2,
      },
      {
        name: "주간 목표 달성률 2x1",
        component: WeekAchievementSmall,
        componentName: "WeekAchievementSmall",
        width: 2,
        height: 1,
      },
      {
        name: "주간 목표 달성률 2x2",
        component: WeekAchievementBig,
        componentName: "WeekAchievementBig",
        width: 2,
        height: 2,
      },
      {
        name: "월간 목표 달성률 2x1",
        component: MonthAchievementSmall,
        componentName: "MonthAchievementSmall",
        width: 2,
        height: 1,
      },
      {
        name: "월간 목표 달성률 2x2",
        component: MonthAchievementBig,
        componentName: "MonthAchievementBig",
        width: 2,
        height: 2,
      },
      {
        name: "일간 목표 집중 시간 2x1",
        component: TodayTargetTime,
        componentName: "TodayTargetTime",
        width: 2,
        height: 1,
      },
      {
        name: "주간 목표 집중 시간 2x1",
        component: WeekTargetTime,
        componentName: "WeekTargetTime",
        width: 2,
        height: 1,
      },
      {
        name: "월간 목표 집중 시간 2x1",
        component: MonthTargetTime,
        componentName: "MonthTargetTime",
        width: 2,
        height: 1,
      },
      {
        name: "스트릭 6x2",
        component: SixMonthStreak,
        componentName: "SixMonthStreak",
        width: 6,
        height: 2,
      },
      {
        name: "집중 백분율 4x3",
        component: PercentileRank,
        componentName: "PercentileRank",
        width: 4,
        height: 3,
      },
      {
        name: "타이머 4x2",
        component: TimerCheck,
        componentName: "TimerCheck",
        width: 4,
        height: 2,
      },
      {
        name: "캘린더 5x4",
        component: CalendarCheck,
        componentName: "CalendarCheck",
        width: 5,
        height: 4,
      },
      {
        name: "프로그램별 집중 시간 6x4",
        component: FocusTimeEachPrograms,
        componentName: "FocusTimeEachPrograms",
        width: 6,
        height: 4,
      },
      {
        name: "프로그램별 집중 시간과 백분율 7x4",
        component: FocusTimeEachProgramsPercentage,
        componentName: "FocusTimeEachProgramsPercentage",
        width: 7,
        height: 4,
      },
      {
        name: "타임라인 7x4",
        component: TimeLine,
        componentName: "TimeLine",
        width: 7,
        height: 4,
      },
      {
        name: "금지 프로그램 목록 5x4",
        component: BannedProgramList,
        componentName: "BannedProgramList",
        width: 5,
        height: 4,
      },
    ];

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveDailyGoal = async (event) => {
      event.preventDefault();
      try {
        await axios.post('/api/saveDailyGoal', { goal: dailyGoal.value });
        Swal.fire({
          title: '성공!',
          text: '일간 목표 집중 시간이 저장되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        });
      } catch (error) {
        Swal.fire({
          title: '오류!',
          text: '저장 중 문제가 발생했습니다.',
          icon: 'error',
          confirmButtonText: '확인'
        });
      }
    };

    const saveWeeklyGoal = async (event) => {
      event.preventDefault();
      try {
        await axios.post('/api/saveWeeklyGoal', { goal: weeklyGoal.value });
        Swal.fire({
          title: '성공!',
          text: '주간 목표 집중 시간이 저장되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        });
      } catch (error) {
        Swal.fire({
          title: '오류!',
          text: '저장 중 문제가 발생했습니다.',
          icon: 'error',
          confirmButtonText: '확인'
        });
      }
    };

    const saveMonthlyGoal = async (event) => {
      event.preventDefault();
      try {
        await axios.post('/api/saveMonthlyGoal', { goal: monthlyGoal.value });
        Swal.fire({
          title: '성공!',
          text: '월간 목표 집중 시간이 저장되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        });
      } catch (error) {
        Swal.fire({
          title: '오류!',
          text: '저장 중 문제가 발생했습니다.',
          icon: 'error',
          confirmButtonText: '확인'
        });
      }
    };

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
      widgetElement.dataset.componentName = componentConfig.componentName; // componentName으로 저장
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

      // Pinia 스토어에 위젯 추가
      widgetStore.addWidget({
        name: componentConfig.componentName, // component의 name으로 저장
        width,
        height,
        x: pos.x || 0,
        y: pos.y || 0,
      });
    };

    const removeWidget = (event) => {
      const widgetElement = event.target.closest(".grid-stack-item");
      const componentName = widgetElement.dataset.componentName;
      grid.removeWidget(widgetElement);

      const componentConfig = availableComponents.value.find(
        (c) => c.componentName === componentName // component의 name으로 찾기
      );
      if (componentConfig) {
        componentConfig.isActive = false;
      }

      // Pinia 스토어에서 위젯 제거
      widgetStore.removeWidget(componentName);
    };

    const toggleComponent = (name) => {
      const componentConfig = availableComponents.value.find(
        (c) => c.componentName === name // 컴포넌트 이름으로 찾기
      );
      if (!componentConfig) return;

      const existingWidget = grid.engine.nodes.find(
        (n) => n.el.dataset.componentName === name // 해당 컴포넌트가 이미 존재하는지 확인
      );
      if (existingWidget) {
        // 위젯이 이미 존재하면 제거
        grid.removeWidget(existingWidget.el);
        componentConfig.isActive = false;
      } else {
        // 위젯이 존재하지 않으면 추가
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

    const saveWidgets = async () => {
      try {
        // 활성화된(대시보드에 떠있는) 위젯만 필터링
        const activeWidgets = widgetStore.widgets.filter(widget => {
          const componentConfig = availableComponents.value.find(
            (c) => c.componentName === widget.name
          );
          return componentConfig && componentConfig.isActive;
        });
        console.log(activeWidgets)
        const response = await axios.post(
          "https://i11a707.p.ssafy.io/api/widgets",
          activeWidgets // 필터링된 위젯만 서버로 전송
        );

        Swal.fire({
          title: '성공!',
          text: '위젯이 성공적으로 저장되었습니다!',
          icon: 'success',
          confirmButtonText: '확인'
        });
      } catch (error) {
        console.log(widgetStore.widgets)
        Swal.fire({
          title: '오류!',
          text: '위젯을 저장하는 중에 문제가 발생했습니다. 나중에 다시 시도해 주세요.',
          icon: 'error',
          confirmButtonText: '확인'
        });
      }
    };

    onMounted(async () => {
      await nextTick(async () => {
        const gridElement = gridstack.value;
        if (!gridElement) {
          console.error("GridStack element not found");
          return;
        }

        grid = GridStack.init({
          column: 12, // 그리드 열 수 설정
          cellHeight: 125, // 셀 높이 설정
          float: true,
        }, gridElement);

        // 이벤트 위임을 사용하여 삭제 버튼 클릭 처리
        gridElement.addEventListener("click", (event) => {
          if (event.target.classList.contains("widget-delete")) {
            removeWidget(event);
          }
        });

        try {
          // 서버에서 저장된 위젯 상태 가져오기
          const response = await axios.get("https://i11a707.p.ssafy.io/api/widgets");
          const storedWidgets = response.data;

          console.log("Stored widgets:", storedWidgets);

          if (storedWidgets.length > 0) {
            // 가져온 위젯 데이터로 위젯 추가
            storedWidgets.forEach(({ name, width, height, x, y }) => {
              const componentConfig = availableComponents.value.find(
                (c) => c.componentName === name // component의 name과 매칭
              );
              if (componentConfig) {
                console.log(`Adding widget: ${name} at (${x}, ${y})`);
                addWidget(componentConfig, width, height, { x, y });
                componentConfig.isActive = true;
              } else {
                console.error(`Component with name ${name} not found.`);
              }
            });
          } else {
            console.log("No widgets found on the server, loading default widgets.");
            loadDefaultWidgets();
          }
        } catch (error) {
          console.error("Error loading widgets:", error);
          Swal.fire({
            title: '오류!',
            text: '위젯을 불러오는 중에 문제가 발생했습니다. 나중에 다시 시도해 주세요.',
            icon: 'error',
            confirmButtonText: '확인'
          });
        }
      });
    });

    const loadDefaultWidgets = () => {
      const defaultComponents = [
        {
          name: "오늘의 집중 시간(비교X) 3x1",
          component: TodayFocusBigWithoutComparison,
          componentName: "TodayFocusBigWithoutComparison",
          width: 3,
          height: 1,
        },
        {
          name: "이번주 집중 시간(비교X) 3x1",
          component: WeekFocusBigWithoutComparison,
          componentName: "WeekFocusBigWithoutComparison",
          width: 3,
          height: 1,
        },
        {
          name: "이번달 집중 시간(비교X) 3x1",
          component: MonthFocusBigWithoutComparison,
          componentName: "MonthFocusBigWithoutComparison",
          width: 3,
          height: 1,
        },
        {
          name: "총 집중 시간 3x1",
          component: TotalFocusBig,
          componentName: "TotalFocusBig",
          width: 3,
          height: 1,
        },
        {
          name: "타임라인 7x4",
          component: TimeLine,
          componentName: "TimeLine",
          width: 7,
          height: 4,
        },
        {
          name: "금지 프로그램 목록 5x4",
          component: BannedProgramList,
          componentName: "BannedProgramList",
          width: 5,
          height: 4,
        },
        {
          name: "프로그램별 집중 시간과 백분율 7x4",
          component: FocusTimeEachProgramsPercentage,
          componentName: "FocusTimeEachProgramsPercentage",
          width: 7,
          height: 4,
        },
        {
          name: "캘린더 5x4",
          component: CalendarCheck,
          componentName: "CalendarCheck",
          width: 5,
          height: 4,
        },
      ];

      defaultComponents.forEach(
        ({ name, component, componentName, width, height }) => {
          addWidget({ name, component, componentName }, width, height);
          const componentConfig = availableComponents.value.find(
            (c) => c.componentName === componentName
          );
          if (componentConfig) {
            componentConfig.isActive = true;
          }
        }
      );
    };

    return {
      gridstack,
      isSidebarOpen,
      availableComponents,
      addWidget,
      toggleComponent,
      isModalOpen,
      dailyGoal,
      weeklyGoal,
      monthlyGoal,
      openModal,
      closeModal,
      saveDailyGoal,
      saveWeeklyGoal,
      saveMonthlyGoal,
      toggleSidebar,
      handleOutsideClick,
      saveWidgets,
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

.save-button {
  position: relative;
  width: 150px;
  height: 60px;
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: right 0.3s ease;
  text-align: center;
  margin-right: 10px;
}

.openModalBtn {
  position: relative;
  width: 150px;
  height: 60px;
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: right 0.3s ease;
  text-align: center;
  margin-right: 10px;
}

.toggle-button {
  position: relative;
  width: 150px;
  height: 60px;
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

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

button {
  background-color: #5865f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
}

button:hover {
  background-color: #4a55d4;
}
</style>