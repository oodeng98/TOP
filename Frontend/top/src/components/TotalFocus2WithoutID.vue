<template>
  <div class="box2">
    <div class="element2">
      <div class="overlap-group2">
        <div class="text-wrapper2">총 집중 시간</div>
        <div class="div2">{{ totalFocusTime }}</div>
        <div class="icon2">
          <Default class="ionicon-w-wallet2" />
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
    const totalFocusTime = ref("00:00:00");

    const fetchFocusTime = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io:8082/dash/stats/focus-time/total"
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
.box2 {
  height: 100px;
  width: 322px;
}

.box2 .element2 {
  height: 100px;
  left: 0;
  top: 0;
  width: 326px;
}

.box2 .overlap-group2 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100px;
  position: relative;
  width: 322px;
}

.box2 .text-wrapper2 {
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

.box2 .div2 {
  color: #2d3748;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 18px;
  font-weight: 700;
  left: 20px;
  letter-spacing: 0;
  line-height: 25.2px;
  position: absolute;
  top: 45px;
  width: 149px;
}

.box2 .icon2 {
  background-color: #5865f2;
  border-radius: 12px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 56px;
  left: 245px;
  position: absolute;
  top: 21px;
  width: 59px;
}

.box2 .ionicon-w-wallet2 {
  height: 29px !important;
  left: 14px !important;
  position: absolute !important;
  top: 14px !important;
  width: 31px !important;
}
</style>
