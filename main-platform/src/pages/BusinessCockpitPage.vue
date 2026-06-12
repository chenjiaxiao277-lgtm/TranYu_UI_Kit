<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="经营驾驶舱" subtitle="业务关键指标总览" />
      </template>

      <tool-bar>
        <template #right>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ 刷新</tr-button>
        </template>
      </tool-bar>

      <div class="cockpit">
        <!-- Key Metrics -->
        <div class="cockpit__row">
          <metric-card :metric="totalRevenueMetric" @click="handleAction" />
          <metric-card :metric="monthRevenueMetric" @click="handleAction" />
          <metric-card :metric="contractCountMetric" @click="handleAction" />
          <metric-card :metric="collectionRateMetric" @click="handleAction" />
        </div>

        <!-- Revenue Summary & Trend -->
        <div class="cockpit__row">
          <div class="cockpit__card">
            <h3 class="cockpit__card-title">收入趋势</h3>
            <tr-card>
              <div class="cockpit__chart-placeholder">
                <p>收入月度趋势图表</p>
              </div>
            </tr-card>
          </div>
          <div class="cockpit__card">
            <h3 class="cockpit__card-title">合同签约</h3>
            <tr-card>
              <div class="cockpit__chart-placeholder">
                <p>合同签约月度趋势</p>
              </div>
            </tr-card>
          </div>
        </div>

        <!-- Projects Section -->
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

        <!-- Risk Warnings Section -->
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

        <!-- AI Insights -->
        <div class="cockpit__section">
          <h2 class="cockpit__section-title">AI经营洞察</h2>
          <tr-card>
            <div class="cockpit__ai-insight">
              <p>📊 收入环比增长 18%，主要驱动力来自签约合同数量增加</p>
              <p>💼 活跃合同数 45 份，回款率 94.5%，逾期金额 5 万元</p>
              <p>⚠️ 平台 v3.0 项目存在进度延期风险，需增加开发资源</p>
              <p>✅ 建议优先推进资源短缺风险的招聘计划</p>
            </div>
          </tr-card>
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
import { MetricCard, ProjectProgressCard, RiskWarningCard } from '@tranyu/business/dashboard';
import type { DashboardMetric, ProjectProgressItem, RiskWarningItem } from '@tranyu/business/dashboard';

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

const handleAction = () => {
  console.log('Action triggered');
};
</script>

<style scoped>
.cockpit {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.cockpit__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tr-spacing-4);
}

.cockpit__card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  min-width: 0;
}

.cockpit__card-title {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.cockpit__chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral600);
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

.cockpit__ai-insight {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.cockpit__ai-insight p {
  color: var(--tr-color-neutral700);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
}
</style>
