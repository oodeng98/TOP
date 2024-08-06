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
        const allBannedPrograms = response.data;
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
    console.log(this.targetUrls);
  },

    // 금지 프로그램 삭제
    async removeprogram(index) {
      try {
        const program = this.bannedList[index];
        await axios.delete(`https://i11a707.p.ssafy.io/api/focus-time/ban/${program.id}`); // 특정 프로그램 삭제하는 API 필요
        this.fetchProgramLists();
      } catch (error) {
        console.log('Error removing program:', error);
      }
    },

    // 시간 형식 변환
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
  },

  created() {
    this.fetchProgramLists(); // 초기 상태 확인
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
  margin-bottom: 20px;
}

ul {
      list-style-type: none; /* 기본 점을 제거합니다 */
      padding: 0; /* 기본 패딩 제거 */
      margin: 0; /* 기본 여백 제거 */
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
  text-align: left;
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
