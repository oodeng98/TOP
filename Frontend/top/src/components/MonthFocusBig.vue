<template>
  <div class="box3">
    <div class="overlap-group3">
      <div class="text-wrapper3">이번달 집중 시간</div>
      <div class="text-and-icon-wrapper">
        <div class="overlap3">
          <div class="div3">{{ monthlyFocusTime }}</div>
          <div class="text-wrapper-3">{{ focusTimeDifference }}</div>
        </div>
        <div class="alphabet">M</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const monthlyFocusTime = ref("00:00:00");
    const focusTimeDifference = ref("+00:00:00");
    const interval = ref(null);

    const timeStringToSeconds = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const secondsToTimeString = (totalSeconds) => {
      const hours = Math.floor(Math.abs(totalSeconds) / 3600);
      const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
      const seconds = Math.abs(totalSeconds) % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    };

    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time",
          {
            params: {
              period: "month",
            },
          }
        );
        if (response.data.data.lastTotalFocusTime) {
          const lastTotalFocusTime = timeStringToSeconds(
            response.data.data.lastTotalFocusTime
          );
          const totalFocusTime = timeStringToSeconds(
            response.data.data.totalFocusTime
          );
          monthlyFocusTime.value = response.data.data.totalFocusTime;
          const timeDifferenceInSeconds = totalFocusTime - lastTotalFocusTime;
          const sign = timeDifferenceInSeconds >= 0 ? "+" : "-";
          focusTimeDifference.value = `${sign} ${secondsToTimeString(
            timeDifferenceInSeconds
          )}`;
        }
      } catch (error) {
        console.error("MonthFocus2 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    // 주기적인 사용 시간 데이터 업데이트 시작
    const startFetching = () => {
      fetchdata();
      interval.value = setInterval(() => {
        fetchdata();
      }, 1000);
    };

    // 주기적인 업데이트 정지
    const stopfetching = () => {
      if (interval.value) {
        clearInterval(interval.value);
      }
    };

    onMounted(() => {
      startFetching();
    });

    onBeforeUnmount(() => {
      stopfetching();
    });

    return {
      monthlyFocusTime,
      focusTimeDifference,
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

.text-wrapper-3 {
  color: #48bb78;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
}

.alphabet {
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
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 20px;
  font-weight: 900;
  color: white;
}
</style>
