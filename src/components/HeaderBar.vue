<script setup lang="ts">
import { ref } from 'vue';
import { Menu as IconMenu, AlarmClock, Help, PieChart, Fold, Expand } from '@element-plus/icons-vue';

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

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

    <!-- 移动端菜单按钮 -->
    <div class="mobile-menu-btn" @click="toggleMobileMenu">
      <el-icon class="toggle-icon">
        <expand v-if="isMobileMenuOpen" />
        <fold v-else />
      </el-icon>
    </div>

    <div class="nav-section" :class="{ 'mobile-nav': isMobileMenuOpen }">
      <el-menu mode="horizontal" :ellipsis="false" default-active="1" class="main-menu">
        <el-menu-item index="1" @click="$emit('change-view', 'dashboard')">
          <el-icon><icon-menu /></el-icon>
          <span>态势感知</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$emit('change-view', 'alerts')">
          <el-icon><alarm-clock /></el-icon>
          <span>预警管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$emit('change-view', 'decision')">
          <el-icon><help /></el-icon>
          <span>决策辅助</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$emit('change-view', 'statistics')">
          <el-icon><pie-chart /></el-icon>
          <span>数据统计</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <div class="status-section" :class="{ 'mobile-status': isMobileMenuOpen }">
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

.mobile-menu-btn {
  display: none;
  cursor: pointer;
  padding: 8px;
  font-size: 24px;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

@media screen and (max-width: 768px) {
  .header-container {
    position: relative;
    flex-wrap: wrap;
  }

  .logo-section h1 {
    font-size: 18px;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
  }

  .nav-section {
    display: none;
    width: 100%;
    position: absolute;
    top: 64px;
    left: 0;
    background-color: #fff;
    z-index: 1000;
  }

  .nav-section.mobile-nav {
    display: block;
  }

  .main-menu {
    width: 100%;
  }

  :deep(.el-menu) {
    flex-direction: column;
  }

  :deep(.el-menu-item) {
    width: 100%;
    justify-content: flex-start;
    height: 50px;
    line-height: 50px;
  }

  .status-section {
    display: none;
  }

  .status-section.mobile-status {
    display: flex;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #eee;
    flex-direction: column;
    gap: 12px;

    z-index: 800;
    width: 100vw;
    position: absolute;
    left: 0;
    right: 0;
    top: 264px;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .el-menu--horizontal {
    height: unset !important;
  }
}

@media (prefers-color-scheme: dark) {
  .header-container {
    background-color: #1a1a1a;
    border-bottom: 1px solid #333;
  }
  
  .logo-section h1 {
    color: rgba(255, 255, 255, 0.87);
  }
  
  :deep(.el-menu) {
    --el-menu-bg-color: #1a1a1a !important;
    --el-menu-text-color: rgba(255, 255, 255, 0.6) !important;
    --el-menu-hover-text-color: rgba(255, 255, 255, 0.87) !important;
    --el-menu-active-color: #67c23a !important;
    background-color: #1a1a1a !important;
    border-bottom: none !important;
  }
  
  :deep(.el-menu-item) {
    background-color: #1a1a1a !important;
    border-bottom-color: transparent !important;
  }
  
  :deep(.el-menu-item.is-active) {
    color: #67c23a !important;
    border-bottom-color: #67c23a !important;
  }
  
  .status-main {
    color: rgba(255, 255, 255, 0.87);
  }
  
  .status-details {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .time-display {
    color: rgba(255, 255, 255, 0.87);
  }

  @media screen and (max-width: 768px) {
    .nav-section {
      background-color: #1a1a1a;
    }

    .status-section.mobile-status {
      background-color: #1a1a1a;
      border-top: 1px solid #333;
    }
  }
}
</style>
