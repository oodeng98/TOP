<template>
  <div class="box1">
    <div class="overlap-group1">
      <div class="text-wrapper1">이번달 집중 시간</div>
      <div class="div1">{{ monthlyFocusTime }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const monthlyFocusTime = ref("00:00:00");

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time",
          {
            params: {
              period: "month",
            },
          }
        );
        if (response.data.data.totalFocusTime) {
          monthlyFocusTime.value = response.data.data.totalFocusTime;
        }
      } catch (error) {
        console.error("MonthFocus1 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchFocusTime();
    });

    return {
      monthlyFocusTime,
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
  font-size: 12px;
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
