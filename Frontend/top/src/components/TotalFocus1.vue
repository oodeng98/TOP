<template>
  <div class="box1">
    <div class="element1">
      <div class="overlap-group1">
        <div class="text-wrapper1">총 집중 시간</div>
        <div class="div1">{{ totalFocusTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const totalFocusTime = ref("00:00:00");

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time/total"
        );
        console.log(response);
        totalFocusTime.value = response.data.totalFocusTime;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    onMounted(() => {
      fetchFocusTime();
    });

    return {
      totalFocusTime,
    };
  },
};
</script>

<style scoped>
.box1 {
  height: 100px;
  width: 161px;
}

.box1 .element1 {
  height: 100px;
  left: 0;
  top: 0; /* Adjust this if needed */
  width: 165px;
}

.box1 .overlap-group1 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 161px;
}

.box1 .text-wrapper1 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 38px;
  letter-spacing: 0;
  line-height: 18px;
  position: absolute;
  top: 25px;
  white-space: nowrap;
  width: 84px;
}

.box1 .div1 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  left: 38px;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 47px;
  white-space: nowrap;
  width: 83px;
}
</style>
