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
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  setup() {
    const usageData = [10, 20, 30, 15, 25, 35, 10, 20, 30, 15, 25, 35, 10, 20, 30, 15, 25, 35, 10, 20, 56, 10, 20, 30];
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
      const maxUsageColor = '#FF000080'; // 빨간색 (50% 투명도)
      const defaultColor = '#C0C0C080'; // 연회색 (50% 투명도)
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
  height: 50% ;
  width: 100% ;
  box-sizing: border-box !important;
}

h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 0px;
}
</style>