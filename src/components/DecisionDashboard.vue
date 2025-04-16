<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElProgress, ElTag } from 'element-plus';

const activeTab = ref('current');

// 模拟AI风险评分
const riskScores = ref([
  { location: '四川省绵阳市', score: 85, factors: ['震感强烈', '多个前震', '电力设施受损风险高'] },
  { location: '台湾省宜兰县', score: 70, factors: ['风速持续增强', '降雨量大', '潮位异常'] },
  { location: '湖北省武汉市', score: 62, factors: ['上游持续降雨', '水位上涨迅速', '部分堤坝老化'] },
  { location: '山西省太原市', score: 45, factors: ['土壤含水量高', '地形陡峭', '历史发生记录'] }
]);

// 依据风险分数获取推荐的预警级别
const getAlertLevel = (score: number) => {
  if (score >= 80) return { level: 'red', text: '红色预警' };
  if (score >= 60) return { level: 'orange', text: '橙色预警' };
  if (score >= 40) return { level: '预预警', text: '黄色预警' };
  return { level: 'blue', text: '蓝色预警' };
};

// 根据预警级别获取推荐应对措施
const getRecommendedActions = (level: string) => {
  switch (level) {
    case 'red':
      return [
        '立即启动最高级别应急响应',
        '组织受影响区域人员紧急疏散',
        '调动全部救援力量待命',
        '持续监测灾情发展',
        '准备救灾物资与设备'
      ];
    case 'orange':
      return [
        '启动二级应急响应',
        '通知危险区域人员准备疏散',
        '加强关键地点监测频率',
        '召开应急指挥部会议',
        '检查应急设备与物资'
      ];
    case 'yellow':
      return [
        '启动三级应急响应',
        '发布预警信息到受影响区域',
        '增加监测频率',
        '通知应急人员待命',
        '准备应急资源'
      ];
    case 'blue':
      return [
        '密切关注灾害发展',
        '发布预警信息',
        '检查监测设备状态',
        '评估可能的影响范围',
        '准备初步应急响应'
      ];
    default:
      return ['保持正常监测', '定期评估风险'];
  }
};

// 历史预警处置效果评估
const historyEffectiveness = [
  { date: '2024-09-10', location: '贵州省遵义市', type: '地质灾害', level: 'orange', effectiveness: 85, notes: '提前预警成功避免人员伤亡' },
  { date: '2024-08-25', location: '广东省茂名市', type: '台风', level: 'red', effectiveness: 92, notes: '及时疏散群众，减少财产损失' },
  { date: '2024-07-15', location: '河南省郑州市', type: '洪水', level: 'red', effectiveness: 75, notes: '部分地区预警不及时，需改进' },
  { date: '2024-06-23', location: '云南省大理市', type: '地震', level: 'yellow', effectiveness: 80, notes: '预警信息传递通道需优化' }
];

// 模拟实时专家判断意见
const expertOpinions = ref([
  { expert: '李教授（地震专家）', opinion: '根据前震活动频率，主震概率增高，建议发布红色预警', time: '10分钟前' },
  { expert: '张工程师（水文专家）', opinion: '上游降雨持续，预计12小时后洪峰抵达，建议做好防范', time: '25分钟前' },
  { expert: '王研究员（气象专家）', opinion: '台风路径有西偏趋势，风力可能超过预期，需密切关注', time: '40分钟前' }
]);

// 模拟决策推荐
const decisionRecommendations = computed(() => {
  return riskScores.value.map(risk => {
    const alertLevel = getAlertLevel(risk.score);
    return {
      location: risk.location,
      score: risk.score,
      level: alertLevel.level,
      levelText: alertLevel.text,
      factors: risk.factors,
      actions: getRecommendedActions(alertLevel.level)
    };
  });
});
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h2>多级预警决策看板</h2>
      <div class="tab-group">
        <el-tag 
          :effect="activeTab === 'current' ? 'dark' : 'plain'" 
          @click="activeTab = 'current'"
          class="tab-item"
        >
          当前预警分析
        </el-tag>
        <el-tag 
          :effect="activeTab === 'history' ? 'dark' : 'plain'" 
          @click="activeTab = 'history'"
          class="tab-item"
        >
          历史预警评估
        </el-tag>
      </div>
    </div>
    
    <div v-if="activeTab === 'current'" class="dashboard-content">
      <div class="decision-section">
        <h3>风险评估与预警建议</h3>
        <div v-for="(decision, index) in decisionRecommendations" :key="index" class="decision-card">
          <div class="decision-header">
            <div>
              <h4>{{ decision.location }}</h4>
              <div class="risk-score">
                <span>风险评分：</span>
                <el-progress 
                  :percentage="decision.score" 
                  :color="decision.score >= 80 ? '#F56C6C' : 
                          decision.score >= 60 ? '#E6A23C' : 
                          decision.score >= 40 ? '#EABE4B' : '#409EFF'" 
                  :stroke-width="18"
                />
              </div>
            </div>
            <el-tag 
              :type="decision.level === 'red' ? 'danger' : 
                    decision.level === 'orange' ? 'warning' : 
                    decision.level === 'yellow' ? 'warning' : 'info'"
              size="large"
            >
              {{ decision.levelText }}
            </el-tag>
          </div>
          
          <div class="decision-body">
            <div class="risk-factors">
              <h5>风险因素：</h5>
              <ul>
                <li v-for="(factor, fIndex) in decision.factors" :key="fIndex">
                  {{ factor }}
                </li>
              </ul>
            </div>
            
            <div class="recommended-actions">
              <h5>建议措施：</h5>
              <ul>
                <li v-for="(action, aIndex) in decision.actions" :key="aIndex">
                  {{ action }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="expert-section">
        <h3>专家意见</h3>
        <div v-for="(opinion, index) in expertOpinions" :key="index" class="expert-card">
          <div class="expert-header">
            <h4>{{ opinion.expert }}</h4>
            <span class="opinion-time">{{ opinion.time }}</span>
          </div>
          <p class="expert-opinion">{{ opinion.opinion }}</p>
        </div>
      </div>
    </div>
    
    <div v-if="activeTab === 'history'" class="dashboard-content">
      <h3>历史预警处置效果评估</h3>
      <div class="history-table">
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>地点</th>
              <th>灾害类型</th>
              <th>预警等级</th>
              <th>处置效果</th>
              <th>评估备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in historyEffectiveness" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.type }}</td>
              <td>
                <el-tag 
                  :type="item.level === 'red' ? 'danger' : 
                        item.level === 'orange' ? 'warning' : 
                        item.level === 'yellow' ? 'warning' : 'info'"
                  size="small"
                >
                  {{ item.level }}
                </el-tag>
              </td>
              <td>
                <el-progress 
                  :percentage="item.effectiveness" 
                  :color="item.effectiveness >= 90 ? '#67C23A' : 
                          item.effectiveness >= 80 ? '#409EFF' : 
                          item.effectiveness >= 70 ? '#E6A23C' : '#F56C6C'" 
                />
              </td>
              <td>{{ item.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="lessons-learned">
        <h3>主要经验教训</h3>
        <ul>
          <li>预警信息的精准性与时效性是关键，需持续提升预测模型准确度</li>
          <li>多渠道发布预警信息可有效提高覆盖率，尤其是对老人与偏远地区居民</li>
          <li>提前部署专业应急队伍能显著提高救援效率</li>
          <li>预警后的应急指令需要更加清晰、具体，避免模糊表述</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-header h2 {
  margin: 0;
}

.tab-group {
  display: flex;
  gap: 10px;
}

.tab-item {
  cursor: pointer;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

@media (max-width: 1000px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

.decision-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.decision-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.decision-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.decision-header h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.risk-score {
  display: flex;
  align-items: center;
  gap: 10px;
}

.risk-score :deep(.el-progress) {
  width: 200px;
}

.decision-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.risk-factors h5,
.recommended-actions h5 {
  margin-top: 0;
  margin-bottom: 8px;
}

.risk-factors ul,
.recommended-actions ul {
  margin: 0;
  padding-left: 20px;
}

.risk-factors li,
.recommended-actions li {
  margin-bottom: 4px;
}

.expert-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expert-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.expert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.expert-header h4 {
  margin: 0;
  font-size: 16px;
}

.opinion-time {
  font-size: 12px;
  color: #909399;
}

.expert-opinion {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.history-table {
  overflow-x: auto;
  margin-bottom: 20px;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.history-table th {
  background-color: #f5f7fa;
  font-weight: bold;
}

.lessons-learned ul {
  padding-left: 20px;
}

.lessons-learned li {
  margin-bottom: 8px;
}
</style> 
