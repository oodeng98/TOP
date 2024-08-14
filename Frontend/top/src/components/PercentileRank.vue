<template>
  <div class="subbox4">
    <div class="box4">
      <div class="title">집중 백분위</div>
      <div class="group4">
        <div class="overlap4">
          <div class="overlap-group4">
            <div class="chart4">
              <div class="div4">
                <div class="ellipse4"></div>
                <div class="text4">{{ dailyPercentile }}%</div>
                <img
                  class="img4"
                  alt="Ellipse"
                  src="../../static/img/ellipse-17-1.svg"
                />
                <div class="text-wrapper4">일간 백분위</div>
              </div>
            </div>
            <div class="overlap-wrapper4">
              <div class="overlap-4-2">
                <div class="ellipse-4-2"></div>
                <div class="text-4-2">{{ weeklyPercentile }}%</div>
                <div class="text-4-3">월간 백분위</div>
                <img
                  class="ellipse-4-3"
                  alt="Ellipse"
                  src="../../static/img/ellipse-17-2.svg"
                />
              </div>
            </div>
          </div>
          <div class="overlap-group-wrapper4">
            <div class="overlap-4-3">
              <div class="ellipse-4-4"></div>
              <div class="text-4-4">{{ monthlyPercentile }}%</div>
              <div class="text-4-5">주간 백분위</div>
              <img
                class="ellipse-4-5"
                alt="Ellipse"
                src="../../static/img/ellipse-17.svg"
              />
            </div>
          </div>
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
    const dailyPercentile = ref("0");
    const weeklyPercentile = ref("0");
    const monthlyPercentile = ref("0");

    const fetchPercentile = async () => {
      try {
        const response = await axios.get(
          "https://i11a707.p.ssafy.io/api/dash/stats/focus-time/percent"
        );
        dailyPercentile.value = response.data.data.dayPercent;
        weeklyPercentile.value = response.data.data.weekPercent;
        monthlyPercentile.value = response.data.data.monthPercent;
      } catch (error) {
        console.error("PercentileRank 데이터를 가져오는 중 오류 발생:", error);
        return 0;
      }
    };

    onMounted(() => {
      fetchPercentile();
      const intervalId = setInterval(fetchPercentile, 1000);

      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      dailyPercentile,
      weeklyPercentile,
      monthlyPercentile,
    };
  },
};
</script>

<style scoped>
.subbox4 {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin-top: -60px;
  margin-bottom: 20px;
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 20px;
  font-weight: 700;
}

.box4 {
  height: 241px;
  width: 302px;
  padding-top: 25px;
  padding-left: 10px;
}

.box4 .group4 {
  height: 241px;
  left: 0;
  top: 10px;
  width: 302px;
}

.box4 .overlap4 {
  height: 241px;
  position: relative;
  width: 306px;
}

.box4 .overlap-group4 {
  height: 199px;
  left: 49px;
  position: absolute;
  top: 0;
  width: 257px;
}

.box4 .chart4 {
  height: 179px;
  left: 81px;
  position: absolute;
  top: 20px;
  width: 176px;
}

.box4 .div4 {
  height: 181px;
  position: relative;
  top: -1px;
  width: 173px;
}

.box4 .ellipse4 {
  background-color: #5865f254;
  border: 1.05px solid;
  border-radius: 84.36px;
  height: 169px;
  left: 0;
  opacity: 0.9;
  position: absolute;
  top: 6px;
  width: 169px;
}

.box4 .text4 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 33.7px;
  font-weight: 700;
  left: 53px;
  letter-spacing: 0.53px;
  line-height: 33.7px;
  position: absolute;
  top: 65px;
  white-space: nowrap;
  width: 70px;
}

.box4 .text-wrapper4 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12.7px;
  font-weight: 700;
  left: 50px;
  letter-spacing: 0.53px;
  line-height: 12.7px;
  position: absolute;
  top: 105px;
  white-space: nowrap;
  width: 74px;
}

.box4 .img4 {
  height: 181px;
  left: 6px;
  position: absolute;
  top: 1px;
  width: 170px;
}

.box4 .overlap-wrapper4 {
  height: 110px;
  left: 0;
  position: absolute;
  top: 0;
  width: 111px;
}

.box4 .overlap-4-2 {
  height: 112px;
  position: relative;
  top: -1px;
  width: 108px;
}

.box4 .ellipse-4-2 {
  background-color: #5865f2;
  border-radius: 51.88px;
  height: 104px;
  left: 0;
  opacity: 0.8;
  position: absolute;
  top: 4px;
  width: 104px;
}

.box4 .text-4-2 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 20.8px;
  font-weight: 700;
  left: 32px;
  letter-spacing: 0.32px;
  line-height: 20.8px;
  position: absolute;
  top: 38px;
  white-space: nowrap;
  width: 43px;
}

.box4 .text-4-3 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 22px;
  letter-spacing: 0.32px;
  line-height: 7.8px;
  position: absolute;
  top: 67px;
  white-space: nowrap;
}

.box4 .ellipse-4-3 {
  height: 112px;
  left: 3px;
  position: absolute;
  top: 0;
  width: 105px;
}

.box4 .overlap-group-wrapper4 {
  height: 130px;
  left: 0;
  position: absolute;
  top: 111px;
  width: 128px;
}

.box4 .overlap-4-3 {
  height: 132px;
  position: relative;
  top: -1px;
  width: 125px;
}

.box4 .ellipse-4-4 {
  background-color: #5865f2a8;
  border-radius: 61.18px;
  height: 122px;
  left: 0;
  opacity: 0.9;
  position: absolute;
  top: 5px;
  width: 122px;
}

.box4 .text-4-4 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 24px;
  font-weight: 700;
  left: 40px;
  letter-spacing: 0.38px;
  line-height: 24px;
  position: absolute;
  top: 47px;
  white-space: nowrap;
}

.box4 .text-4-5 {
  color: #ffffff;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-size: 12px;
  font-weight: 700;
  left: 28px;
  letter-spacing: 0.38px;
  line-height: 12px;
  position: absolute;
  top: 78px;
  white-space: nowrap;
}

.box4 .ellipse-4-5 {
  height: 132px;
  left: 2px;
  position: absolute;
  top: 0;
  width: 123px;
}
</style>
`
