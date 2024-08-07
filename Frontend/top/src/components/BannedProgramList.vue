<template>
  <div class="banned-program">
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
        <button type="submit" class="image-button">
          <MoreVert1 style="width: 25px;height: 25px;"/>
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
            <button type="submit" class="image-button image-button-minus"><img src="../../static/img/DeleteCircle.svg" alt="삭제"></button>
          </form>
          <hr/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MoreVert1 from "../icons/MoreVert1/MoreVert1.vue"; // 땡땡땡 아이콘
import axios from 'axios';

export default {
  name: "App",
  components: {
    MoreVert1,
  },
  data() {
    return {
      banprogram: "",
      bannedList: [],
      targetUrls: [], // 사용자가 추가한 금지 프로그램 목록
    };
  },
  
  methods: {
    // 금지 프로그램 목록 불러오기
    async fetchProgramLists() {
      try {
        const response = await axios.get('https://i11a707.p.ssafy.io/api/focus-time/ban');
        const allBannedPrograms = response.data.data;
        // targetUrls에 있는 URL만 필터링
        this.bannedList = allBannedPrograms.filter(program => 
          this.targetUrls.some(target => program.url.includes(target.url))
        );
      } catch (error) {
        console.log('Error to fetch data:', error);
      }
    },
          
    // 금지 프로그램 추가
    addprogram() {
    const trimmedUrl = this.banprogram.trim();
    // URL이 빈 문자열이거나 targetUrls에 이미 존재하는 경우 추가하지 않음
      if (trimmedUrl !== "" && !this.targetUrls.some(target => target.url === trimmedUrl)) {
        this.targetUrls.push({ url: trimmedUrl });
        this.banprogram = "";
        this.fetchProgramLists(); // 금지 프로그램 추가 후 목록 갱신
        }
    },

    // 금지 프로그램 삭제
    removeprogram(url) {
    // targetUrls 배열에서 URL을 찾아 제거
      const index = this.targetUrls.findIndex(target => target.url === url);
      if (index !== -1) {
        this.targetUrls.splice(index, 1); // 배열에서 URL 제거
        this.fetchProgramLists(); // 목록 갱신
      }
    },

    // 시간 형식 변환
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    // 주기적인 사용 시간 데이터 업데이트 시작
    startPeriodicUpdates() {
      this.interval = setInterval(() => {
        this.fetchProgramLists(); // 10분(600000ms)마다 사용 시간 데이터 업데이트
      }, 600000);
    },
    
    // 주기적인 업데이트 정지
    stopPeriodicUpdates() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },

  },

  created() {
    this.fetchProgramLists(); // 초기 상태 확인
    this.startPeriodicUpdates(); // 주기적인 업데이트 시작
  },

  beforeDestroy() {
    this.stopPeriodicUpdates(); // 컴포넌트가 파괴될 때 주기적인 업데이트 정지
  },
}
</script>


<style scoped>
.banned-program {
  height: 400px;
  width: 483px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
}

.header {
  position: relative;
}

ul {
      list-style-type: none; /* 기본 점을 제거합니다 */
      padding: 0; /* 기본 패딩 제거 */
      margin: 0; /* 기본 여백 제거 */
    }

hr {
  margin-top: 5px;
}

input::placeholder {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  opacity: 0.8; /* placeholder의 불투명도 */
  font-size: 14px;
    }
.kebob-icon {
  position: absolute;
  top: -10px;
  right: -10px;
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
  border: none; /* 테두리 제거 */
  background: none; /* 기본 배경 제거 */
  padding: 0; /* 여백 제거 */
  cursor: pointer; /* 커서를 포인터로 변경 */
}

.image-button-plus {
  position: absolute;
  top: 15px;
  right: 20px;
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
