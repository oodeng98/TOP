<template>
  <div class="timer">
    <div class="timer-header">
      <h2>Timer</h2>
      <input
        type="text"
        v-model="category"
        placeholder="카테고리를 입력해주세요"
      />
    </div>
    <p v-if="warningMessage" class="warning">{{ warningMessage }}</p>
    <p>{{ formattedTime }}</p>
    <button @click="startTimer">집중 시작</button>
    <button @click="stopTimer">일시 정지</button>
    <button @click="saveTime">시간 저장</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      time: 0,
      timer: null,
      category: "",
      warningMessage: "",
    };
  },
  computed: {
    formattedTime() {
      const hours = String(Math.floor(this.time / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((this.time % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(this.time % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  methods: {
    startTimer() {
      if (!this.category) {
        this.warningMessage = "카테고리를 입력해주세요";
        return;
      }
      this.warningMessage = "";
      if (this.timer === null) {
        this.timer = setInterval(() => {
          this.time++;
        }, 1000);
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    async saveTime() {
      if (!this.category) {
        this.warningMessage = "카테고리를 입력해주세요";
        return;
      }
      try {
        await axios.post("임시 url", {
          category: this.category,
          time: this.time,
        });
        this.warningMessage = "집중 시간이 저장되었습니다.";
        this.resetTimer();
      } catch (error) {
        this.warningMessage =
          "집중 시간 저장에 실패했습니다. 다시 시도해주세요.";
      }
    },
    resetTimer() {
      this.stopTimer();
      this.time = 0;
      this.category = "";
      this.warningMessage = "";
    },
  },
  beforeUnmount() {
    this.stopTimer();
  },
};
</script>

<style scoped>
.timer {
  text-align: center;
  margin-top: 0px;
  font-family: Arial, sans-serif;
  height: 100%;
  width: 100%;
}

.timer-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-header h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-right: 10px; /* 여백 추가 */
}

.timer input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  text-align: center;
}

.timer input::placeholder {
  color: transparent; /* 기본적으로 플레이스홀더를 투명하게 설정 */
}

.timer input:focus::placeholder {
  color: transparent; /* 포커스가 있을 때 플레이스홀더를 투명하게 유지 */
}

.timer input:not(:focus)::placeholder {
  color: #aaa; /* 포커스가 없을 때 플레이스홀더를 회색으로 설정 */
}

.timer p {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
}

.timer button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.timer button:hover {
  background-color: #e0e0e0;
}

.timer .warning {
  color: red;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}
</style>
