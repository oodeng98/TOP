<template>
  <div class="timer">
    <h2>Timer</h2>
    <input type="text" v-model="category" placeholder="카테고리를 입력해주세요">
    <p v-if="warningMessage" class="warning">{{ warningMessage }}</p>
    <p>{{ formattedTime }}</p>
    <button @click="startTimer">집중 시작</button>
    <button @click="stopTimer">일시 정지</button>
    <button @click="resetTimer">시간 저장</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      timer: null,
      category: '',
      warningMessage: ''
    };
  },
  computed: {
    formattedTime() {
      const hours = String(Math.floor(this.time / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((this.time % 3600) / 60)).padStart(2, '0');
      const seconds = String(this.time % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    startTimer() {
      if (!this.category) {
        this.warningMessage = '카테고리를 입력해주세요';
        return;
      }
      this.warningMessage = '';
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
    resetTimer() {
      if (!this.category) {
        this.warningMessage = '카테고리를 입력해주세요';
        return;
      }
      this.warningMessage = '';
      this.category = '';
      this.stopTimer();
      this.time = 0;
    }
  },
  beforeUnmount() {
    this.stopTimer();
  }
};


</script>

<style scoped>
.timer {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, sans-serif;
  height: 300px;
  width: 483px;
}

.timer h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 20px;
}

.timer input {
  margin-bottom: 20px;
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
