<template>
  <div class="box1">
    <div class="overlap-group1">
      <div class="text-wrapper1">오늘의 집중 시간</div>
      <div class="div1">{{ dailyFocusTime }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const dailyFocusTime = ref("00:00:00");

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time",
          {
            params: {
              period: "day",
            },
          }
        );
        if (response.data.data.totalFocusTime) {
          dailyFocusTime.value = response.data.data.totalFocusTime;
        }
      } catch (error) {
        console.error("TodayFocus1 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchFocusTime();
    });

    return {
      dailyFocusTime,
    };
  },
};
</script>

<style scoped>
.box1 {
  height: 100px;
  width: 100%;
}

.box1 .overlap-group1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  width: 100%;
}

.box1 .text-wrapper1 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom: 5px;
  white-space: nowrap;
}

.box1 .div1 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 25.2px;
  white-space: nowrap;
}
</style>
