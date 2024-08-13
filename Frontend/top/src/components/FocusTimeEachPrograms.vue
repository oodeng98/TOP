<template>
  <div class="box">
    <div class="element">
      <div class="text-wrapper-4">프로그램 별 집중 시간</div>
      <div class="overlap-group">
        <div class="titles">
          <div class="text-wrapper-3">Programs</div>
          <div class="text-wrapper-2">사용 시간</div>
        </div>
        <div class="list">
          <div class="items">
            <div
              v-for="(app, index) in appList"
              :key="index"
              class="soft-UI-XD-1"
            >
              <div class="item-content">
                <img
                  class="icon"
                  :src="app.imagePath"
                  :alt="app.name"
                  @error="handleImageError"
                />
                <div class="app-name">{{ app.name }}</div>
                <div class="text-wrapper">
                  {{ formatTime(app.focusTime) }}
                  <button
                    type="submit"
                    @click.stop="addprogram(app.name)"
                    class="image-button-plus"
                  >
                    <img src="../../static/img/PlusCircle.svg" alt="" />
                  </button>
                </div>
              </div>
              <img class="line" alt="Line" src="../../static/img/line.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      appList: [],
      interval: null,
    };
  },
  mounted() {
    this.startFetching();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/app"
        );
        if (response.status === 200 && response.data.statusCode === 200) {
          this.appList = response.data.data.map((app) => ({
            ...app,
            imagePath: this.getImagePath(app.name),
          }));
        } else {
          console.error("Failed to fetch data:", "데이터 조회에 실패했습니다");
        }
      } catch (error) {
        console.error("FocusTimeEachPrograms API request failed:", error);
      }
    },
    async addprogram(appName) {
      try {
        // 이미 금지된 프로그램인지 확인
        if (this.bannedList.some((program) => program.name === appName)) {
          console.warn(`${appName}은(는) 이미 금지된 프로그램입니다.`);
          return; // 이미 존재하면 중복 요청을 보내지 않음
        }

        // 서버로 POST 요청 보내기
        await axios.post("https://i11a707.p.ssafy.io/api/focus-time/ban", {
          name: appName,
        });

        // 성공적으로 추가되면 로컬 리스트에도 추가
        this.bannedList.push({ name: appName });

        // appList에서 해당 프로그램 삭제
        this.appList = this.appList.filter((app) => app.name !== appName);

        // BannedProgramList.vue 컴포턴트에 갱신 요청
        this.$emit("updateBannedList")

      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.warn(
            `${appName}은(는) 이미 금지된 프로그램으로 등록되어 있습니다.`
          );
        } else {
          console.error("Error adding program:", error);
        }
      }
    },
    formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    },
    getImagePath(appName) {
      try {
        return require(`../../static/application_icon/${appName}.png`);
      } catch (e) {
        return require("../../static/application_icon/default.png"); // 기본 이미지 경로
      }
    },
    handleImageError(event) {
      event.target.src =
        require("../../static/application_icon/default.png").default;
    },
    // 주기적인 사용 시간 데이터 업데이트 시작
    startFetching() {
      this.fetchData();
      this.interval = setInterval(() => {
        this.fetchData();
      }, 60000);
    },
    // 주기적인 업데이트 정지
    stopfetching() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
  },
  beforeDestroy() {
    this.stopfetching();
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}

.box .overlap-group {
  width: 100%;
  background-color: #ffffff; /* 백그라운드 색상 설정 */
}

.box .list {
  margin-top: 20px;
}

.box .items {
  display: flex;
  flex-direction: column;
}

.box .soft-UI-XD-1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
}

.box .item-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* x축 중앙 정렬을 위해 추가 */
  margin-bottom: 10px;
}

.box .icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}

.box .app-name {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 19.6px;
  white-space: nowrap;
  margin-left: 10px;
  flex-grow: 1;
  text-align: left;
}

.box .text-wrapper {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 25.2px;
  white-space: nowrap;
}

.box .line {
  height: 1px;
  width: 100%;
  background-color: #e0e0e0;
  margin-top: 5px;
  margin-bottom: 5px;
}

.box .titles {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.box .text-wrapper-2,
.box .text-wrapper-3 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 15px;
}

.box .text-wrapper-4 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 25.2px;
  margin-bottom: 10px;
  text-align: center;
  margin-left: 20px;
}

.image-button-plus {
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  padding: 0; /* 여백 제거 */
  cursor: pointer; /* 커서 포인터로 변경 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
}
</style>
