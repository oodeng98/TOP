<template>
  <div>
    <h2>타임라인</h2>
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  components: {
    'bar-chart': Bar
  },
  data() {
    return {
      usageData: [10, 20, 30, 15, 25, 35, 10, 20, 30, 15, 25, 35, 10, 20, 30, 15, 25, 35, 10, 20, 56, 10, 20, 30],
      chartData: {
        labels: Array.from({ length: 24 }, (_, i) => i.toString()),
        datasets: [{
          label: 'Usage',
          data: [10, 20, 30, 40, 50, 60],
          backgroundColor: [],
        }]
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
            max: 60
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
  },
  mounted() {
    this.updateChartData();
  },
  methods: {
    updateChartData() {
      const maxUsage = Math.max(...this.usageData);
      this.chartData.datasets[0].data = this.usageData;
      // 변경할 색상들
      const maxUsageColor = 'rgba(0, 0, 0, 0)'; // 빨간색
      const defaultColor = 'rgba(0, 0, 0, 0)'; // 연회색
      this.chartData.datasets[0].backgroundColor = this.usageData.map(value => value === maxUsage ? maxUsageColor : defaultColor);
    }
  }
};
</script>

<style>
h2 {
  color: #b0bec5;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>