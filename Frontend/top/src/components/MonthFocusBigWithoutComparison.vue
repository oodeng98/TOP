<template>
  <div class="box3">
    <div class="overlap-group3">
      <div class="text-wrapper3">이번달 집중 시간</div>
      <div class="text-and-icon-wrapper">
        <div class="overlap3">
          <div class="div3">{{ monthlyFocusTime }}</div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const monthlyFocusTime = ref("00:00:00");
    const interval = ref(null);

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
        monthlyFocusTime.value = response.data.data.totalFocusTime;
      } catch (error) {
        console.error(
          "MonthFocus2WithoutID 데이터를 가져오는 중 오류 발생:",
          error
        );
      }
    };

    // 주기적인 사용 시간 데이터 업데이트 시작
    const startFetching = () => {
      fetchdata();
      interval = setInterval(() => {
        fetchdata();
      }, 60000);
    }

    // 주기적인 업데이트 정지
    const stopfetching = () => {
      if (interval) {
        clearInterval(interval.value);
      }
    }

    onMounted(() => {
      startFetching();
    });

    onBeforeUnmount(() => {
      stopfetching();
    });

    return {
      monthlyFocusTime,
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
