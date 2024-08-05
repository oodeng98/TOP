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
        <button type="submit" class="image-button image-button-plus"><img src="../../static/img/PlusCircle.svg" alt="추가"></button>
      </form>
      <div class="kebob-icon">
        <button type="submit">:</button>
        <!-- <MoreVert1 /> 아이콘 추가 -->
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
            <div class="focus-time">{{ program.sessionTime  }}</div>
          </div>
          <form @submit.prevent="removeprogram(index)">
            <button type="submit" class="image-button image-button-minus"><img src="../../static/img/DeleteCircle.svg" alt="삭제"></button>
          </form>
          <hr/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import MoreVert1 from "./icons/MoreVert1/MoreVert1.vue"; // 땡땡땡 아이콘
// import { axios } from 'axios';

export default {
  // name: "App",
  // components: {
  //   MoreVert1,
  // }
  data() {
    return {
      banprogram: "",
      bannedList: [],
      startTime: null,
      sessionTime: 0,
      interval: null,
      isActive: true,
      targetUrls: [],
    };
  },
  
  methods: {
    // 금지 프로그램 목록 불러오기
    // async fetchProgramLists() {
    //   try {
    //       const response = await axios.get('https://i11a707.p.ssafy.io/api/focus-time/ban');
    //       this.bannedList = response.data;
    //       console.log(this.bannedList);
    //   } catch (error) {
    //       console.log('Error to fetchdata:' , error);
    //   }
    // },
          
      // 금지프로그램 저장
    // async addprogram() {
    //   if (this.banprogram.trim() !== '') {
    //     try {
    //         await axios.post('https://i11a707.p.ssafy.io/api/focus-time/ban',
    //         { url: this.banprogram.trim(),
    //           sessionTime: 0,
    //         });
    //         this.banprogram = '';
    //         this.fetchProgramLists();
    //     } catch (error) {
    //         console.log('Error adding program: ', error);
    //       }
    //   }
    // },
    // 금지 프로그램 저장(axios 안쓰는거)
    addprogram() {
      if (this.banprogram.trim() !== "") {
        this.bannedList.push ({
          url:this.banprogram.trim(),
          sessionTime: this.sessionTime
        });
        this.targetUrls.push(this.banprogram.trim());
        this.banprogram = "";
      }
    },
    // 금지프로그램 삭제
    removeprogram(index) {
      this.bannedList.splice(index, 1);
      this.targetUrls.splice(index, 1);
    },
    // 창 열리면 시간측정함
    startSession() {
      this.startTime = new Date();
      this.interval = setInterval(() => {
        if (this.isActive && this.startTime) {
          const now = new Date();
          this.sessionTime = Math.floor((now - this.startTime) / 1000); // 시간(초)
        }
      }, 1000);
    },

    endSession() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.sendSessionTime();
      }
    },

    handleVisibilityChange() {
      const currentUrl = window.location.href;
      this.isActive = this.targetUrls.some(url => currentUrl.includes(url));
      if (this.isActive && !this.startTime) {
        this.startSession();
      } else if (!this.isActive && this.startTime) {
        this.endSession();
      }
    },

  //   async sendSessionTime() {
  //     if (this.startTime) {
  //       const sessionDuration = Math.floor((new Date() - this.startTime) / 1000); // 시간(초)
  //       try {
  //         await axios.put('https://i11a707.p.ssafy.io/api/focus-time/ban', {
  //           url: window.location.href,
  //           sessionTime: sessionDuration,
  //         });
  //       } catch (error) {
  //         console.error('Error logging session:', error);
  //       }
  //     }
  //   },
  // },
},

created() {
  document.addEventListener('visibilitychange', this.handleVisibilityChange);
  // this.handleVisibilityChange(); // 초기 상태 확인
},

beforeUnmount() {
  document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  this.endSession(); // 컴포넌트가 파괴될 때 세션 종료
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
