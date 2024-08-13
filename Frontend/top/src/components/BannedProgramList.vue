<template>
  <div class="banned-program">
    <div class="header">
      <div class="top-font">금지 프로그램 목록</div>
    </div>
    <div class="pass-list">
      <div class="between">
        <span class="mid-font">Programs</span>
        <span class="mid-font focus-time">사용 시간</span>
      </div>
      <hr />
      <ul>
        <li
          v-for="(program, index) in bannedList"
          :key="index"
          class="li-relative"
        >
          <div class="between">
            <div style="display: flex; align-items: center">
              <img
                class="icon"
                :src="getImagePath(program.name)"
                :alt="program.name"
                @error="handleImageError"
              />
              <div style="font-weight: 700; margin-left: 10px">
                {{ program.name }}
              </div>
            </div>
            <div class="focus-time">{{ formatTime(program.focusTime) }}</div>
          </div>
          <button
            @click="removeprogram(index, program.name)"
            class="image-button image-button-minus"
          >
            <img src="../../static/img/DeleteCircle.svg" alt="삭제" />
          </button>
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      banprogram: "",
      bannedList: [],
      interval: null,
    };
  },
  methods: {
    // 금지 프로그램 목록 불러오기
    async fetchdata() {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/focus-time/ban"
        );
        this.bannedList = response.data.data.map((program) => ({
          ...program,
          imagePath: this.getImagePath(program.name),
        }));
      } catch (error) {
        console.error("Error to fetch data:", error);
      }
    },
    // 금지 프로그램 삭제
    async removeprogram(index, programName) {
      try {
        await axios.delete(`https://i11a707.p.ssafy.io/api/focus-time/ban`, {
          data: { name: programName },
        });
        this.bannedList.splice(index, 1);
      } catch (error) {
        console.error("Error removing program:", error);
      }
    },
    // 시간 형식 변환
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },
    getImagePath(appName) {
      try {
        return require(`../../static/application_icon/${appName}.png`);
      } catch (e) {
        return require("../../static/application_icon/default.png");
      }
    },
    handleImageError(event) {
      event.target.src =
        require("../../static/application_icon/default.png").default;
    },

    startFetching() {
      this.fetchdata();
      this.interval = setInterval(() => {
        this.fetchdata();
      }, 10000);
    },

    stopfetching() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
  },
  mounted() {
    this.fetchdata();
    this.startFetching();

    // 이벤트 리스너 추가
    this.$watch(
      () => eventBus.updateBannedList,
      (newValue) => {
        if (newValue) {
          this.fetchdata(); // 데이터 갱신
          eventBus.updateBannedList = false; // 이벤트 플래그 초기화
        }
      }
    );
  },
  beforeDestroy() {
    this.stopfetching();
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.banned-program {
  height: 100%;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}

.header {
  position: relative;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

hr {
  margin-top: 5px;
}

input::placeholder {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  opacity: 0.8;
  font-size: 14px;
}

.form-program {
  border: 3px solid #5865f2;
  width: 12rem;
  height: 40px;
  border-radius: 15px;
  position: absolute;
  top: 5px;
  left: 50%;
  padding-left: 10px;
}

.pass-list {
  width: 100%;
  height: 80%;
  padding-left: 0px;
}

.top-font {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 30px;
  text-align: left;
  letter-spacing: 0;
  line-height: 25.2px;
}

.image-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.image-button-plus {
  position: absolute;
  top: 15px;
  right: 0%;
}

.image-button-minus {
  position: absolute;
  right: 0px;
  top: 0px;
}

.image-button img {
  display: block;
}

.between {
  display: flex;
  justify-content: space-between;
}

.li-relative {
  position: relative;
}

.mid-font {
  font-family: "Helvetica-BoldOblique", Helvetica;
  color: #a0aec0;
  font-weight: 700;
}

.focus-time {
  padding-right: 30px;
}

.icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
</style>
