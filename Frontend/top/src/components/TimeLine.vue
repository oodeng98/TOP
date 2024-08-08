<template>
  <div class="bigbox">
    <h2>타임라인</h2>
    <bar-chart ref="chart" class="chart" :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { reactive, ref, onMounted, computed } from 'vue';
import axios from 'axios';
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  setup() {
    const chart = ref(null);
    const usageData = ref(Array(24).fill(0)); // Initialize usageData with 24 hours of zeros

    const chartData = computed(() => ({
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [{
        label: '집중 시간',
        data: usageData.value,
        backgroundColor: usageData.value.map(value => value === Math.max(...usageData.value) ? '#5865f2' : '#c6d1ff'),
      }]
    }));

    const chartOptions = reactive({
      scales: {
        x: {
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            font: {
              size: 12,
              family: 'Arial'
            },
            padding: 5,
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          max: 60,
          ticks: {
            font: {
              size: 12,
              family: 'Arial'
            },
            padding: 5
          },
          grid: {
            display: true
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: true,
          position: 'nearest',
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
      }
    });

    const fetchFocusTimeData = async () => {
      try {
        const response = await axios.get('https://i11a707.p.ssafy.io/api/dash/stats/focus-time/detail', {
          params: { period: 'day' }
        });

        // Reset usageData to zeros before updating with new data
        usageData.value.fill(0);

        response.data.data.forEach(entry => {
          usageData.value[entry.startTime] = parseFloat((entry.focusTime / 60).toFixed(2));
        });

        updateChart();
      } catch (error) {
        console.error('Error fetching focus time data:', error);
      }
    };

    const updateChart = () => {
      if (chart.value && chart.value.chartInstance) {
        chart.value.chartInstance.data.datasets[0].data = usageData.value;
        chart.value.chartInstance.data.datasets[0].backgroundColor = usageData.value.map(value => value === Math.max(...usageData.value) ? '#5865f2' : '#c6d1ff');
        chart.value.chartInstance.update();
      }
    };

    onMounted(() => {
      fetchFocusTimeData();
    });

    return {
      chart,
      chartData,
      chartOptions
    };
  }
};
</script>

<style scoped>
.bigbox {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3.5px 5.5px #00000005;
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
  box-sizing: border-box !important;
  margin-top: 40px;
}

h2 {
  color: #a0aec0;
  font-family: "Helvetica-BoldOblique", Helvetica;
  font-weight: 700;
  text-align: center; /* 추가: 중앙 정렬을 위해 */
}
</style>
