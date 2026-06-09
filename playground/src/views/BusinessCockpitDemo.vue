<template>
  <div class="cockpit">
    <div class="cockpit__header">
      <h1>经营驾驶舱</h1>
      <button class="cockpit__refresh" @click="handleRefresh">⟳ 刷新</button>
    </div>

    <div class="cockpit__content">
      <!-- Key Metrics Row -->
      <div class="cockpit__row">
        <metric-card :metric="totalRevenueMetric" @click="handleAction" />
        <metric-card :metric="monthRevenueMetric" @click="handleAction" />
        <metric-card :metric="contractCountMetric" @click="handleAction" />
        <metric-card :metric="collectionRateMetric" @click="handleAction" />
      </div>

      <!-- Trends -->
      <div class="cockpit__row">
        <trend-card :trend="revenueTrend" />
        <trend-card :trend="contractTrend" />
      </div>

      <!-- Revenue Summary -->
      <div class="cockpit__row cockpit__row--full">
        <revenue-summary-card :summary="revenueSummary" />
      </div>

      <!-- Project Progress -->
      <div class="cockpit__section">
        <h2 class="cockpit__section-title">活跃项目</h2>
        <div class="cockpit__grid">
          <project-progress-card
            v-for="project in projects"
            :key="project.id"
            :item="project"
          />
        </div>
      </div>

      <!-- Risk Warnings -->
      <div class="cockpit__section">
        <h2 class="cockpit__section-title">风险预警</h2>
        <div class="cockpit__grid">
          <risk-warning-card
            v-for="risk in risks"
            :key="risk.id"
            :item="risk"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MetricCard,
  TrendCard,
  RiskWarningCard,
  ProjectProgressCard,
  RevenueSummaryCard,
} from '@tranyu/business/dashboard';
import type {
  DashboardMetric,
  DashboardTrend,
  RiskWarningItem,
  ProjectProgressItem,
  RevenueSummary,
} from '@tranyu/business/dashboard';

const totalRevenueMetric: DashboardMetric = {
  id: 'metric-revenue',
  name: '总收入',
  value: '$2.5M',
  trend: 'up',
  trendPercent: 18,
  icon: '💰',
};

const monthRevenueMetric: DashboardMetric = {
  id: 'metric-month',
  name: '本月',
  value: '$180K',
  trend: 'up',
  trendPercent: 8,
};

const contractCountMetric: DashboardMetric = {
  id: 'metric-contracts',
  name: '活跃合同',
  value: 45,
  trend: 'stable',
};

const collectionRateMetric: DashboardMetric = {
  id: 'metric-collection',
  name: '回款率',
  value: '94.5%',
  trend: 'down',
  trendPercent: 2,
};

const revenueTrend: DashboardTrend = {
  id: 'trend-revenue',
  name: '收入趋势',
  unit: '美元 K',
  trend: 'up',
  trendPercent: 12,
  data: [
    { timestamp: '2024-01-01', value: 1200, label: '1月' },
    { timestamp: '2024-02-01', value: 1450, label: '2月' },
    { timestamp: '2024-03-01', value: 1600, label: '3月' },
    { timestamp: '2024-04-01', value: 1850, label: '4月' },
    { timestamp: '2024-05-01', value: 2100, label: '5月' },
    { timestamp: '2024-06-01', value: 2500, label: '6月' },
  ],
};

const contractTrend: DashboardTrend = {
  id: 'trend-contracts',
  name: '签约合同',
  unit: '份数',
  trend: 'up',
  trendPercent: 25,
  data: [
    { timestamp: '2024-01-01', value: 8, label: '1月' },
    { timestamp: '2024-02-01', value: 10, label: '2月' },
    { timestamp: '2024-03-01', value: 9, label: '3月' },
    { timestamp: '2024-04-01', value: 12, label: '4月' },
    { timestamp: '2024-05-01', value: 14, label: '5月' },
    { timestamp: '2024-06-01', value: 15, label: '6月' },
  ],
};

const revenueSummary: RevenueSummary = {
  id: 'revenue-summary',
  totalRevenue: 2500000,
  monthRevenue: 180000,
  yearRevenue: 1800000,
  contractCount: 45,
  collectionRate: 0.945,
  overdueAmount: 50000,
  trend: 'up',
  trendPercent: 12,
};

const projects: ProjectProgressItem[] = [
  {
    id: 'proj-1',
    name: '平台 v3.0',
    status: 'active',
    progress: 0.65,
    budget: 500000,
    spent: 325000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    owner: '陈晓芸',
    riskLevel: 'medium',
  },
  {
    id: 'proj-2',
    name: '移动应用发布',
    status: 'active',
    progress: 0.45,
    budget: 300000,
    spent: 135000,
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    owner: '白晓明',
    riskLevel: 'low',
  },
  {
    id: 'proj-3',
    name: '数据迁移',
    status: 'completed',
    progress: 1.0,
    budget: 200000,
    spent: 200000,
    startDate: '2023-10-01',
    endDate: '2024-05-30',
    owner: '布朗查理',
    riskLevel: 'low',
  },
];

const risks: RiskWarningItem[] = [
  {
    id: 'risk-1',
    name: '进度延期 - 平台 v3.0',
    level: 'high',
    status: 'monitoring',
    probability: 0.7,
    impact: 0.8,
    mitigation: '新增 2 名开发者，优化冲刺计划',
    owner: '陈晓芸',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-2',
    name: '资源短缺',
    level: 'medium',
    status: 'identified',
    probability: 0.5,
    impact: 0.6,
    mitigation: '规划 Q3 招聘计划',
    owner: '人力资源团队',
  },
];

const handleRefresh = () => {
  console.log('Dashboard refreshed');
};

const handleAction = (_action: DashboardEventPayload) => {
  console.log('Action triggered');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DashboardEventPayload {
  id: string;
  action: string;
  data?: Record<string, any>;
  timestamp?: string;
}
</script>

<style scoped>
.cockpit {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  min-height: 100vh;
}

.cockpit__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cockpit__header h1 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0;
}

.cockpit__refresh {
  padding: var(--tr-spacing-2) var(--tr-spacing-4);
  background-color: var(--tr-color-primary);
  border: none;
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral0);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.cockpit__refresh:hover {
  transform: translateY(-2px);
  box-shadow: var(--tr-shadow-md);
}

.cockpit__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.cockpit__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tr-spacing-4);
}

.cockpit__row--full {
  grid-template-columns: 1fr;
}

.cockpit__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.cockpit__section-title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.cockpit__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--tr-spacing-4);
}
</style>
