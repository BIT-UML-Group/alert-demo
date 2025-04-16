<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { disasterStatistics } from '../assets/mockData';

const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartContainer.value) {
    // 初始化图表
    chart = echarts.init(chartContainer.value);
    
    // 设置图表配置项
    const option = {
      title: {
        text: '灾害预警统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: disasterStatistics.map(item => item.month)
      },
      yAxis: {
        type: 'value',
        name: '预警次数'
      },
      series: [
        {
          name: '预警次数',
          type: 'bar',
          data: disasterStatistics.map(item => item.count),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          }
        }
      ]
    };
    
    // 使用配置项设置图表
    chart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', handleResize);
  }
});

// 处理窗口大小变化
const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};

// 组件卸载时清理
onUnmounted(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="statistics-container">
    <div ref="chartContainer" class="chart"></div>
  </div>
</template>

<style scoped>
.statistics-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1;
  min-height: 300px;
}
</style> 
