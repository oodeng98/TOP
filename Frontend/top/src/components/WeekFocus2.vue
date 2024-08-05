<template>
  <div class="box3">
    <div class="element3">
      <div class="overlap-group3">
        <div class="text-wrapper3">이번주 집중 시간</div>
        <div class="overlap3">
          <div class="div3">{{ weeklyFocusTime }}</div>
          <div class="text-wrapper-3">{{ focusTimeDifference }}</div>
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
import { ref, onMounted } from "vue";

export default {
  setup() {
    const weeklyFocusTime = ref("00:00:00");
    const focusTimeDifference = ref("+ 00:00:00");

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

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io:8082/dash/stats/focus-time",
          {
            params: {
              period: "week",
            },
          }
        );
        console.log(response);

        const lastTotalFocusTime = timeStringToSeconds(
          response.data.lastTotalFocusTime
        );
        const totalFocusTime = timeStringToSeconds(
          response.data.totalFocusTime
        );

        weeklyFocusTime.value = response.data.totalFocusTime;
        const timeDifferenceInSeconds = totalFocusTime - lastTotalFocusTime;
        const sign = timeDifferenceInSeconds >= 0 ? "+" : "-";
        focusTimeDifference.value = `${sign} ${secondsToTimeString(
          timeDifferenceInSeconds
        )}`;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchFocusTime();
    });

    return {
      weeklyFocusTime,
      focusTimeDifference,
    };
  },
};
</script>

<style scoped>
.box3 {
  height: 100px;
  width: 322px;
}

.box3 .element3 {
  height: 100px;
  left: 0;
  top: 0;
  width: 328px;
}

.box3 .overlap-group3 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 322px;
}

.box3 .text-wrapper3 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 20px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 21px;
  width: 151px;
}

.box3 .overlap3 {
  height: 31px;
  left: 20px;
  position: absolute;
  top: 45px;
  width: 192px;
}

.box3 .div3 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  left: 0;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 0;
  width: 149px;
}

.box3 .text-wrapper-3 {
  color: #48bb78;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 14px;
  font-weight: 700;
  left: 104px;
  letter-spacing: 0;
  line-height: 19.6px;
  position: absolute;
  top: 5px;
  width: 88px;
}

.box3 .icon3 {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 56px;
  left: 245px;
  position: absolute;
  top: 21px;
  width: 59px;
}

.box3 .ionicon-w-wallet3 {
  height: 29px !important;
  left: 14px !important;
  position: absolute !important;
  top: 14px !important;
  width: 31px !important;
}
</style>
