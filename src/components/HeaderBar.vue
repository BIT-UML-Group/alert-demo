<script setup lang="ts">
import { ref } from 'vue';

const currentTime = ref(new Date().toLocaleString('zh-CN'));

// 更新当前时间
setInterval(() => {
  currentTime.value = new Date().toLocaleString('zh-CN');
}, 1000);

// 模拟系统状态
const systemStatus = ref({
  status: 'normal',
  activeSensors: 246,
  activeAlerts: 4,
  lastUpdate: '1分钟前'
});

defineEmits(['change-view']);
</script>

<template>
  <div class="header-container">
    <div class="logo-section">
      <div class="logo">⚠️</div>
      <h1>灾害预警系统</h1>
    </div>
    
    <div class="nav-section">
      <el-menu mode="horizontal" :ellipsis="false" default-active="1" class="main-menu">
        <el-menu-item index="1" @click="$emit('change-view', 'dashboard')">
          <i class="el-icon-menu"></i>
          <span>态势感知</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$emit('change-view', 'alerts')">
          <i class="el-icon-alarm-clock"></i>
          <span>预警管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$emit('change-view', 'decision')">
          <i class="el-icon-s-help"></i>
          <span>决策辅助</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$emit('change-view', 'statistics')">
          <i class="el-icon-pie-chart"></i>
          <span>数据统计</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <div class="status-section">
      <div class="system-status">
        <div class="status-indicator" :class="systemStatus.status"></div>
        <div class="status-text">
          <div class="status-main">系统正常</div>
          <div class="status-details">
            <span>{{ systemStatus.activeSensors }}个传感器在线</span>
            <span>{{ systemStatus.activeAlerts }}个活跃预警</span>
          </div>
        </div>
      </div>
      <div class="time-display">{{ currentTime }}</div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 32px;
  margin-right: 12px;
}

.logo-section h1 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.nav-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-menu {
  border-bottom: none;
}

.status-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.normal {
  background-color: #67c23a;
}

.status-indicator.warning {
  background-color: #e6a23c;
}

.status-indicator.error {
  background-color: #f56c6c;
}

.status-text {
  display: flex;
  flex-direction: column;
}

.status-main {
  font-weight: bold;
  font-size: 14px;
}

.status-details {
  font-size: 12px;
  color: #909399;
  display: flex;
  gap: 8px;
}

.time-display {
  font-size: 14px;
  color: #606266;
}
</style> 
