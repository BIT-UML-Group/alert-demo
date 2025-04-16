<script setup lang="ts">
import { ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import MapView from './components/MapView.vue';
import AlertCard from './components/AlertCard.vue';
import StatisticsChart from './components/StatisticsChart.vue';
import DecisionDashboard from './components/DecisionDashboard.vue';
import { mockAlerts, type DisasterAlert } from './assets/mockData';

// 当前视图
const currentView = ref('dashboard');

// 选中的预警信息
const selectedAlert = ref(mockAlerts[0]);

// 处理预警选择
const handleAlertSelect = (alert: DisasterAlert) => {
  selectedAlert.value = alert;
};

// 切换视图
const handleViewChange = (view: string) => {
  currentView.value = view;
};
</script>

<template>
  <div class="app-container">
    <HeaderBar @change-view="handleViewChange" />
    
    <div class="main-content">
      <!-- 态势感知视图 -->
      <div v-if="currentView === 'dashboard'" class="dashboard-view">
        <div class="map-section">
          <MapView @select-alert="handleAlertSelect" />
        </div>
        <div class="info-section">
          <h2>当前预警信息</h2>
          <AlertCard v-if="selectedAlert" :alert="selectedAlert" />
          
          <div class="sensor-status">
            <h3>传感器状态</h3>
            <div class="status-items">
              <div class="status-item">
                <div class="status-icon critical"></div>
                <div class="status-text">
                  <div>严重异常</div>
                  <div>2个传感器</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-icon warning"></div>
                <div class="status-text">
                  <div>警告</div>
                  <div>15个传感器</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-icon normal"></div>
                <div class="status-text">
                  <div>正常</div>
                  <div>229个传感器</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 预警管理视图 -->
      <div v-if="currentView === 'alerts'" class="alerts-view">
        <h2>预警管理</h2>
        <div class="alert-list">
          <AlertCard v-for="alert in mockAlerts" :key="alert.id" :alert="alert" />
        </div>
      </div>
      
      <!-- 决策辅助视图 -->
      <div v-if="currentView === 'decision'" class="decision-view">
        <DecisionDashboard />
      </div>
      
      <!-- 数据统计视图 -->
      <div v-if="currentView === 'statistics'" class="statistics-view">
        <h2>灾害数据统计</h2>
        <div class="statistics-container">
          <StatisticsChart />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}

#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html, body, #app {
    background-color: #242424;
    color: rgba(255, 255, 255, 0.87);
  }
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  max-width: 1000px;
  width: 100vw;
  margin: 0 auto;
}

/* 态势感知视图样式 */
.dashboard-view {
  display: flex;
  width: 100%;
  height: 100%;
}

.map-section {
  flex: 3;
  height: 100%;
}

.info-section {
  flex: 1;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  background-color: #f5f7fa;
  border-left: 1px solid #e6e6e6;
}

.info-section h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #303133;
  font-size: 18px;
}

.sensor-status {
  margin-top: 20px;
}

.sensor-status h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
}

.status-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  flex: 1;
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.status-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-icon.critical {
  background-color: #f56c6c;
}

.status-icon.warning {
  background-color: #e6a23c;
}

.status-icon.normal {
  background-color: #67c23a;
}

.status-text {
  font-size: 12px;
}

.status-text div:first-child {
  font-weight: bold;
  margin-bottom: 2px;
}

/* 预警管理视图样式 */
.alerts-view {
  width: 100%;
  padding: 16px;
  overflow-y: auto;
}

.alerts-view h2 {
  margin-top: 0;
  margin-bottom: 16px;
}

.alert-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

/* 决策辅助视图样式 */
.decision-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 数据统计视图样式 */
.statistics-view {
  width: 100%;
  padding: 16px;
  overflow-y: auto;
}

.statistics-view h2 {
  margin-top: 0;
  margin-bottom: 16px;
}

.statistics-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 1200px) {
  .dashboard-view {
    flex-direction: column;
  }
  
  .map-section {
    height: 60%;
  }
  
  .info-section {
    height: 40%;
    border-left: none;
    border-top: 1px solid #e6e6e6;
  }
}

@media (prefers-color-scheme: dark) {
  .info-section {
    color: rgba(255, 255, 255, 0.87);
    background-color: #1a1a1a;
  }
  .info-section h2 {
    color: rgba(255, 255, 255, 0.87);
  }
  .status-item {
    background-color: #272323;
    border: 1px solid #333;
    box-shadow: 0 2px 12px rgba(194, 193, 193, 0.05);
  }
  
  
}
</style>
