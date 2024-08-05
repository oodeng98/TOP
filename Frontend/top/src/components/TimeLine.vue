<template>
  <div class="bigbox">
    <h2>타임라인</h2>
    <bar-chart class="chart" :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { reactive, onMounted, watchEffect } from 'vue';
import axios from 'axios';
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  setup() {
    const usageData = reactive(Array(24).fill(0)); // Initialize usageData with 24 hours of zeros
    const chartData = reactive({
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [{
        label: '집중 시간',
        data: [],
        backgroundColor: [],
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

    const updateChartData = () => {
      const maxUsage = Math.max(...usageData);
      chartData.datasets[0].data = usageData;
      const maxUsageColor = '#5865f2';
      const defaultColor = '#c6d1ff';
      chartData.datasets[0].backgroundColor = usageData.map(value => value === maxUsage ? maxUsageColor : defaultColor);
    };

    const fetchFocusTimeData = async () => {
      try {
        const response = await axios.get('/api/dash/stats/focus-time/detail', {
          params: { period: 'day' }
        });
        const focusTimeList = response.data.data.focusTimeList;

        // Reset usageData to zeros before updating with new data
        usageData.fill(0);
        
        focusTimeList.forEach(entry => {
          usageData[entry.startHour] = entry.focusTime / 60; // Assuming focusTime is in seconds, convert to minutes
        });

        updateChartData();
      } catch (error) {
        console.error('Error fetching focus time data:', error);
      }
    };

    onMounted(() => {
      fetchFocusTimeData();
    });

    watchEffect(() => {
      updateChartData();
    });

    return {
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
  width: 100% ;
  box-sizing: border-box !important;
}

h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 0px;
}
</style>





<!-- <template>
  <div class="bigbox">
    <h2>타임라인</h2>
    <bar-chart class="chart" :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { reactive, onMounted, watchEffect } from 'vue';
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  setup() {
    // 이곳에 데이터가 들어가야 한다.
    const usageData = [];
    const chartData = reactive({
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [{
        label: '집중 시간',
        data: [],
        backgroundColor: [],
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

    const updateChartData = () => {
      const maxUsage = Math.max(...usageData);
      chartData.datasets[0].data = usageData;
      const maxUsageColor = '#5865f2';
      const defaultColor = '#c6d1ff';
      chartData.datasets[0].backgroundColor = usageData.map(value => value === maxUsage ? maxUsageColor : defaultColor);
    };

    onMounted(() => {
      updateChartData();
    });

    watchEffect(() => {
      updateChartData();
    });

    return {
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
  width: 100% ;
  box-sizing: border-box !important;
}

h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 0px;
}
</style> -->