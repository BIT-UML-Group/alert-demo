<script setup lang="ts">
import { computed } from 'vue';
import { alertLevelColors, disasterIcons } from '../assets/mockData';
import type { DisasterAlert } from '../assets/mockData';
import dayjs from 'dayjs';

const props = defineProps<{
  alert: DisasterAlert
}>();

const levelTextMap = {
  'red': '红色',
  'orange': '橙色',
  'yellow': '黄色',
  'blue': '蓝色'
};

const levelText = computed(() => {
  return levelTextMap[props.alert.level as keyof typeof levelTextMap];
});

const levelColor = computed(() => {
  return alertLevelColors[props.alert.level as keyof typeof alertLevelColors];
});

const disasterIcon = computed(() => {
  return disasterIcons[props.alert.type as keyof typeof disasterIcons] || disasterIcons['其他'];
});

const formattedTime = computed(() => {
  return dayjs(props.alert.timestamp).format('YYYY-MM-DD HH:mm:ss');
});
</script>

<template>
  <div class="alert-card" :style="{ borderColor: levelColor }">
    <div class="alert-header" :style="{ backgroundColor: levelColor }">
      <span class="alert-icon">{{ disasterIcon }}</span>
      <span class="alert-type">{{ alert.type }}</span>
      <span class="alert-level">{{ levelText }}预警</span>
    </div>
    <div class="alert-body">
      <h3 class="alert-title">{{ alert.title }}</h3>
      <p class="alert-description">{{ alert.description }}</p>
      <div class="alert-info">
        <p><strong>位置：</strong>{{ alert.location.address }}</p>
        <p><strong>发布时间：</strong>{{ formattedTime }}</p>
        <p><strong>影响区域：</strong>{{ alert.affectedArea }}</p>
      </div>
      <div class="alert-actions">
        <h4>建议采取的措施：</h4>
        <ul>
          <li v-for="(action, index) in alert.recommendedActions" :key="index">
            {{ action }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-card {
  border: 2px solid;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  background-color: white;
}

.alert-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: white;
}

.alert-icon {
  font-size: 20px;
  margin-right: 8px;
}

.alert-type {
  font-weight: bold;
  margin-right: 8px;
}

.alert-level {
  margin-left: auto;
  font-weight: bold;
}

.alert-body {
  padding: 16px;
}

.alert-title {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
}

.alert-description {
  margin-bottom: 16px;
  color: #333;
}

.alert-info {
  margin-bottom: 16px;
}

.alert-info p {
  margin: 4px 0;
}

.alert-actions h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.alert-actions ul {
  margin: 0;
  padding-left: 20px;
}

.alert-actions li {
  margin-bottom: 4px;
}

@media (prefers-color-scheme: dark) {
  .alert-card {
    background-color: #333;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid #444;
  }
  
  .alert-header h3 {
    color: rgba(255, 255, 255, 0.87);
  }
  
  .alert-meta-item,
  .alert-meta-label,
  .alert-meta-value,
  .alert-description,
  .alert-body {
    color: rgba(255, 255, 255, 0.87);
  }
  
  .alert-footer {
    border-top: 1px solid #444;
  }
}
</style> 
