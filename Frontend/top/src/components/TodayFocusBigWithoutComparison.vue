<template>
  <div class="box3">
    <div class="overlap-group3">
      <div class="text-wrapper3">오늘의 집중 시간</div>
      <div class="text-and-icon-wrapper">
        <div class="overlap3">
          <div class="div3">{{ dailyFocusTime }}</div>
        </div>
        <div class="icon3">
          <Default class="ionicon-w-wallet3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

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
        dailyFocusTime.value = response.data.data.totalFocusTime;
      } catch (error) {
        console.error(
          "TodayFocus2WithoutID 데이터를 가져오는 중 오류 발생:",
          error
        );
      }
    };

    onMounted(() => {
      fetchFocusTime(); // Fetch immediately on mount
      const intervalId = setInterval(fetchFocusTime, 60000); // Fetch every 1 minute

      // Clean up the interval on component unmount
      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      dailyFocusTime,
    };
  },
};
</script>

<style scoped>
.box3 {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlap-group3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.text-wrapper3 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
  white-space: nowrap;
  text-align: center;
  width: 100%;
  margin-right: 76px;
}

.text-and-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.overlap3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 76px;
}

.div3 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  margin-right: 5px;
}

.icon3 {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.ionicon-w-wallet3 {
  width: 29px;
  height: 29px;
}
</style>
