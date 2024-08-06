<template>
  <div class="bigbox">
    <h2>타임라인</h2>
    <bar-chart ref="chart" class="chart" :data="chartData" :options="chartOptions"></bar-chart>
  </div>
  <div>
    <!-- {{ chartData }} -->
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { reactive, ref, onMounted, watch } from 'vue';
import axios from 'axios';
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  setup() {
    const chart = ref(null);
    const usageData = ref(Array(24).fill(0)); // Initialize usageData with 24 hours of zeros
    
    const chartData = reactive({
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [{
        label: '집중 시간',
        // data: usageData.value, // Directly bind usageData to chart data
        data: [10, 20, 30, 40], // Directly bind usageData to chart data
        backgroundColor: usageData.value.map(() => '#c6d1ff'),
      }]
    });

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
          usageData.value[entry.startTime] = entry.focusTime / 60;
        });

        updateChartData();
      } catch (error) {
        console.error('Error fetching focus time data:', error);
      }
    };
    
    const updateChartData = () => {
      const maxUsage = Math.max(...usageData.value);
      chartData.datasets[0].data = [...usageData.value]; // Reassign the data to trigger reactivity
      chartData.datasets[0].backgroundColor = usageData.value.map(value => value === maxUsage ? '#5865f2' : '#c6d1ff');

      if (chart.value) {
        chart.value.update(); // Manually trigger chart update
      }
    };
    
    onMounted(() => {
      fetchFocusTimeData();
    });
    
    watch(usageData, () => {
      updateChartData();
    }, { flush: 'sync' });
    console.log(chartData)
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
  height: 400px;
  width: 644px;
}

.chart {
  height: 100%;
  width: 100%;
  box-sizing: border-box !important;
}

h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 0px;
}
</style>
