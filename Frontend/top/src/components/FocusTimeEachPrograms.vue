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
                <div class="text-wrapper">{{ formatTime(app.focusTime) }}</div>
              </div>
              <img class="line" alt="Line" src="../static/img/line.png" />
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
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/app"
        );
        if (response.status === 200 && response.data.statusCode === 200) {
          this.appList = response.data.data.map(app => ({
            ...app,
            imagePath: this.getImagePath(app.name),
          }));
        } else {
          console.error("Failed to fetch data:", '데이터 조회에 실패했습니다');
        }
      } catch (error) {
        console.error("FocusTimeEachPrograms API request failed:", error);
      }
    },
    formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    },
    getImagePath(appName) {
      return require(`../static/img/application_icon/${appName
        .toLowerCase()
        .replace(/\s+/g, "")}.png`).default;
    },
    handleImageError(event) {
      event.target.src = require("../static/img/application_icon/default.png").default;
    },
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
  padding-top: 20px;
}

.box .element {
  height: 400px;
  left: 0;
  top: 0;
  width: 483px;
}

.box .overlap-group {
  height: 400px;
  position: relative;
  width: 483px;
  padding: 20px;
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
  text-align: left;
  margin-left: 20px;
}
</style>
