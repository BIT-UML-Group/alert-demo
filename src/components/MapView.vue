<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockAlerts, mockSensors, alertLevelColors, type DisasterAlert } from '../assets/mockData';

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
const selectedAlert = ref<DisasterAlert | null>(null);

// 用于向父组件传递选中的预警信息
const emit = defineEmits(['select-alert']);

// 自定义图标
const createIcon = (type: string, level: string) => {
  const color = alertLevelColors[level as keyof typeof alertLevelColors] || '#333';
  
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: `disaster-icon disaster-${type}`,
    iconSize: [16, 16]
  });
};

const createSensorIcon = (status: string) => {
  const color = status === 'critical' ? '#ff4d4f' : 
               status === 'warning' ? '#fa8c16' : '#52c41a';
  
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 8px; height: 8px; border-radius: 50%; border: 1px solid white;"></div>`,
    className: 'sensor-icon',
    iconSize: [10, 10]
  });
};

// 初始化地图
onMounted(() => {
  if (mapContainer.value) {
    // 创建地图实例
    map = L.map(mapContainer.value).setView([35.86166, 104.195397], 4);
    
    // 添加地图图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // 添加灾害预警标记
    mockAlerts.forEach(alert => {
      const marker = L.marker(
        [alert.location.lat, alert.location.lng], 
        { icon: createIcon(alert.type, alert.level) }
      ).addTo(map!);
      
      marker.bindTooltip(`${alert.type}: ${alert.title}`);
      
      // 点击事件
      marker.on('click', () => {
        selectedAlert.value = alert;
        emit('select-alert', alert);
      });
    });
    
    // 添加传感器标记
    mockSensors.forEach(sensor => {
      const marker = L.marker(
        [sensor.location.lat, sensor.location.lng], 
        { icon: createSensorIcon(sensor.status) }
      ).addTo(map!);
      
      marker.bindTooltip(`${sensor.type}: ${sensor.value}${sensor.unit}`);
    });
    
    // 添加灾害影响范围（简化为圆形）
    mockAlerts.forEach(alert => {
      const radius = alert.level === 'red' ? 50000 : 
                     alert.level === 'orange' ? 30000 : 
                     alert.level === 'yellow' ? 20000 : 10000;
      
      const color = alertLevelColors[alert.level as keyof typeof alertLevelColors];
      
      L.circle([alert.location.lat, alert.location.lng], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
        weight: 1
      }).addTo(map!);
    });
  }
});

// 清理地图实例
onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
    <div class="map-legend">
      <h4>图例</h4>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #ff4d4f;"></span>
        <span>红色预警</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #fa8c16;"></span>
        <span>橙色预警</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #fadb14;"></span>
        <span>黄色预警</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #1890ff;"></span>
        <span>蓝色预警</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.map-legend h4 {
  margin-top: 0;
  margin-bottom: 8px;
  color:black;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  color:black;
}

.legend-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

@media (prefers-color-scheme: dark) {
  .map-container {
    background-color: #1a1a1a;
    border: 1px solid #444;
  }
  
  .map-overlay {
    background-color: rgba(51, 51, 51, 0.8);
  }
  
  .location-label {
    color: #fff;
    background-color: rgba(51, 51, 51, 0.7);
  }
  
  .controls-container {
    background-color: #333;
    border: 1px solid #444;
  }
  
  .control-label {
    color: rgba(255, 255, 255, 0.87);
  }
}
</style> 
