<template>
  <div class="no-check">
    <div class="header">
      <div class="top-font">금지 프로그램 목록</div>
      <form @submit.prevent="addprogram">
        <input
        class="form-program"
        type="text"
        placeholder="프로그램/URL 입력"
        v-model="banprogram"
        />
        <!-- <button type="submit" class="image-button image-button-plus"><img src="../../static/img/PlusCircle.svg" alt="추가"></button> -->
        <button type="submit" class="image-button image-button-plus"><img src=# alt="#"></button>
      </form>
      <div class="kebob-icon">
        <button type="submit" class="image-button">
          <MoreVert1 />
        </button>
      </div>
    </div>
    <div class="pass-list">
      <div class="between">
        <span class="mid-font">Programs</span>
        <span class="mid-font focus-time">사용 시간</span>
      </div>
      <hr />
      <ul>
        <li v-for="(program, index) in bannedList" :key="index" class="li-relative">
          <div class="between">
            <div style="font-weight: 700;">{{ program.url }}</div>
            <div class="focus-time">{{ formatTime(program.sessionTime) }}</div>
          </div>
          <form @submit.prevent="removeprogram(index)">
            <!-- <button type="submit" class="image-button image-button-minus"><img src="../../static/img/DeleteCircle.svg" alt="삭제"></button> -->
            <button type="submit" class="image-button image-button-minus"><img src="#" alt="#"></button>
          </form>
          <hr/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MoreVert1 from "../icons/MoreVert1/MoreVert1.vue"; // 땡땡땡 아이콘
import { axios } from 'axios';

export default {
  name: "App",
  components: {
    MoreVert1,
  },
  data() {
    return {
      banprogram: "",
      bannedList: [],
      interval: null,
      isActive: true,
      targetUrls: [],
    };
  },
  
  methods: {
    // 금지 프로그램 목록 불러오기
    // async fetchProgramLists() {
    //   try {
    //     const response = await axios.get('https://i11a707.p.ssafy.io/api/focus-time/ban');
    //     this.bannedList = response.data.map(program => ({
    //       ...program,
    //       startTime: null,
    //       sessionTime: 0
    //     }));
    //   } catch (error) {
    //     console.log('Error to fetch data:', error);
    //   }
    // },
          
    // 금지프로그램 저장
    // async addprogram() {
    //   if (this.banprogram.trim() !== '') {
    //     try {
    //       await axios.post('https://i11a707.p.ssafy.io/api/focus-time/ban', {
    //         url: this.banprogram.trim(),
    //         sessionTime: 0,
    //       });
    //       this.banprogram = '';
    //       this.fetchProgramLists();
    //     } catch (error) {
    //       console.log('Error adding program:', error);
    //     }
    //   }
    // },

    // 금지 프로그램 저장(axios 안쓰는거)
    addprogram() {
      if (this.banprogram.trim() !== "") {
        this.bannedList.push ({ // bannedList: []
          url:this.banprogram.trim(),
          sessionTime: 0
        });
        this.targetUrls.push(this.banprogram.trim()); // targetUrls: []
        this.banprogram = "";
      }
    },

    // 금지프로그램 삭제
    async removeprogram(index) {
      const program = this.bannedList[index];
      try {
        await axios.delete('https://i11a707.p.ssafy.io/api/focus-time/ban');
        this.bannedList.splice(index, 1);
      } catch (error) {
        console.log('Error removing program:', error);
      }
    },
    // 금지프로그램 삭제 (non axios)
    // removeprogram(index) {
    //   this.bannedList.splice(index, 1);
    //   this.targetUrls.splice(index, 1);
    // },

    // 창 열리면 시간측정함
    startSession(url) {
      const program = this.bannedList.find(prog => prog.url === url);
      if (program) {
        program.startTime = new Date();
        this.interval = setInterval(() => {
          if (this.isActive && program.startTime) {
            const now = new Date();
            program.sessionTime = Math.floor((now - program.startTime) / 1000); // 시간(초)
          }
        }, 1000);
      }
    },

    endSession(url) {
      const program = this.bannedList.find(prog => prog.url === url);
      if (program && this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.sendSessionTime(program);
      }
    },

    handleVisibilityChange() {
      const currentUrl = window.location.href;
      this.isActive = this.bannedList.some(program => currentUrl.includes(program.url));
      const activeProgram = this.bannedList.find(program => currentUrl.includes(program.url));

      if (this.isActive && activeProgram && !activeProgram.startTime) {
        this.startSession(activeProgram.url);
      } else if (!this.isActive && activeProgram && activeProgram.startTime) {
        this.endSession(activeProgram.url);
      }
    },

    async sendSessionTime(program) {
      if (program.startTime) {
        const sessionDuration = Math.floor((new Date() - program.startTime) / 1000); // 시간(초)
        try {
          await axios.put('https://i11a707.p.ssafy.io/api/focus-time/ban', {
            url: program.url,
            sessionTime: sessionDuration,
          });
          program.startTime = null;
          program.sessionTime = 0;
        } catch (error) {
          console.error('Error logging session:', error);
        }
      }
    },

    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
  },

  created() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    // this.fetchProgramLists(); // 초기 상태 확인
  },

  beforeUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.bannedList.forEach(program => this.endSession(program.url)); // 컴포넌트가 파괴될 때 모든 세션 종료
  }
}
</script>

<style scoped>
.no-check {
  height: 400px;
  width: 483px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
}

.header {
  position: relative;
  margin-bottom: 20px;
}

ul {
      list-style-type: none; /* 기본 점을 제거합니다 */
      padding: 0; /* 기본 패딩 제거 */
      margin: 0; /* 기본 여백 제거 */
    }

.box .banned-programs {
  left: 22px;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 11px;
  white-space: nowrap;
  width: 144px;
}

.kebob-icon {
  position: absolute;
  top: 20px;
  right: 0%;
}

.form-program {
  border: 3px solid #5865f2;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  position: absolute;
  top: 5px;
  left: 45%;
  padding-left: 10px;
}

.pass-list {
  width: 431px;
  height: 310px;
  padding-left: 30px;
  overflow: auto;
}

.top-font {
  font-family: "Helvetica-BoldOblique", Helvetica;
  color: #a0aec0;
  font-weight: 700;
  font-size: 20px;
  padding-top: 10px;
  margin-bottom: 50px;
}

.image-button {
  border: none; /* 테두리 제거 */
  background: none; /* 기본 배경 제거 */
  padding: 0; /* 여백 제거 */
  cursor: pointer; /* 커서를 포인터로 변경 */
}

.image-button-plus {
  position: absolute;
  top: 20px;
  right: 25px;
}

.image-button-minus {
  position: absolute;
  right: 0px;
  top: 0px;
  
}
.image-button img {
  display: block; /* 이미지 주위의 여백 제거 */
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
</style>
