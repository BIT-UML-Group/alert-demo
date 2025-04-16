export interface DisasterAlert {
  id: string;
  type: string;
  level: 'red' | 'orange' | 'yellow' | 'blue';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  affectedArea: string;
  recommendedActions: string[];
}

export interface SensorData {
  id: string;
  type: string;
  value: number;
  unit: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

// 模拟灾害预警数据
export const mockAlerts: DisasterAlert[] = [
  {
    id: '1',
    type: '地震',
    level: 'red',
    title: '四川省绵阳市发生5.2级地震',
    description: '预计将有强烈震感，可能导致建筑物损坏和次生灾害',
    location: {
      lat: 31.4706,
      lng: 104.7417,
      address: '四川省绵阳市安州区'
    },
    timestamp: '2024-10-15T08:30:00Z',
    affectedArea: '绵阳市及周边地区',
    recommendedActions: [
      '请立即远离建筑物和危险物体',
      '避免在开阔地带停留',
      '保持通讯畅通，等待官方指示'
    ]
  },
  {
    id: '2',
    type: '台风',
    level: 'orange',
    title: '台风"灿都"即将登陆',
    description: '预计风力可达12级，将带来强降雨和风暴潮',
    location: {
      lat: 24.8801,
      lng: 121.2269,
      address: '台湾省宜兰县附近海域'
    },
    timestamp: '2024-10-16T10:20:00Z',
    affectedArea: '台湾东部及福建沿海地区',
    recommendedActions: [
      '沿海居民注意防范风暴潮',
      '加固门窗，准备足够的食物和饮用水',
      '避免外出，特别是海边和山区'
    ]
  },
  {
    id: '3',
    type: '洪水',
    level: 'yellow',
    title: '长江中下游地区洪水预警',
    description: '持续降雨导致水位上涨，部分地区可能发生洪涝灾害',
    location: {
      lat: 30.2489,
      lng: 115.0468,
      address: '湖北省武汉市'
    },
    timestamp: '2024-10-14T15:45:00Z',
    affectedArea: '武汉市及周边长江沿岸地区',
    recommendedActions: [
      '低洼地区居民注意转移',
      '远离河道和危险区域',
      '关注官方发布的预警信息'
    ]
  },
  {
    id: '4',
    type: '地质灾害',
    level: 'blue',
    title: '山西省太原市地质灾害预警',
    description: '近期降雨可能引发局部山体滑坡和泥石流',
    location: {
      lat: 37.8706,
      lng: 112.5489,
      address: '山西省太原市尖草坪区'
    },
    timestamp: '2024-10-13T20:10:00Z',
    affectedArea: '太原市山区及丘陵地带',
    recommendedActions: [
      '山区居民注意观察周围环境变化',
      '发现异常及时撤离',
      '保持警惕，做好防范准备'
    ]
  }
];

// 模拟传感器数据
export const mockSensors: SensorData[] = [
  {
    id: 's1',
    type: '地震监测站',
    value: 0.8,
    unit: 'g',
    location: {
      lat: 31.4706,
      lng: 104.7417
    },
    timestamp: '2024-10-15T08:29:30Z',
    status: 'critical'
  },
  {
    id: 's2',
    type: '风力监测站',
    value: 35.2,
    unit: 'm/s',
    location: {
      lat: 24.9801,
      lng: 121.3269
    },
    timestamp: '2024-10-16T10:15:00Z',
    status: 'warning'
  },
  {
    id: 's3',
    type: '水位监测站',
    value: 28.5,
    unit: 'm',
    location: {
      lat: 30.2489,
      lng: 115.0468
    },
    timestamp: '2024-10-14T15:40:00Z',
    status: 'warning'
  },
  {
    id: 's4',
    type: '雨量监测站',
    value: 120.5,
    unit: 'mm/h',
    location: {
      lat: 37.8706,
      lng: 112.5489
    },
    timestamp: '2024-10-13T20:00:00Z',
    status: 'normal'
  }
];

// 灾害类型图标映射
export const disasterIcons = {
  '地震': '🔴',
  '台风': '🌀',
  '洪水': '💧',
  '地质灾害': '⛰️',
  '火灾': '🔥',
  '其他': '⚠️'
};

// 预警等级颜色映射
export const alertLevelColors = {
  'red': '#ff4d4f',
  'orange': '#fa8c16',
  'yellow': '#fadb14',
  'blue': '#1890ff'
};

// 历史灾害统计数据
export const disasterStatistics = [
  { month: '1月', count: 3 },
  { month: '2月', count: 5 },
  { month: '3月', count: 8 },
  { month: '4月', count: 12 },
  { month: '5月', count: 15 },
  { month: '6月', count: 20 },
  { month: '7月', count: 25 },
  { month: '8月', count: 30 },
  { month: '9月', count: 18 },
  { month: '10月', count: 12 },
  { month: '11月', count: 7 },
  { month: '12月', count: 4 }
]; 
