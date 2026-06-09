<template>
  <div class="governance">
    <div class="governance__header">
      <h1>流程治理驾驶舱</h1>
    </div>

    <div class="governance__content">
      <!-- Health Metrics -->
      <div class="governance__section">
        <h2 class="governance__section-title">流程健康概览</h2>
        <div class="governance__grid">
          <process-health-card
            v-for="process in processMetrics"
            :key="process.id"
            :metric="process"
          />
        </div>
      </div>

      <!-- Todo Summary -->
      <div class="governance__section">
        <h2 class="governance__section-title">工作分布</h2>
        <div class="governance__row">
          <todo-summary-card :items="todoSummary" @click="handleAction" />
        </div>
      </div>

      <!-- Risk Monitoring -->
      <div class="governance__section">
        <h2 class="governance__section-title">流程风险</h2>
        <div class="governance__grid">
          <risk-warning-card
            v-for="risk in processRisks"
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
  ProcessHealthCard,
  TodoSummaryCard,
  RiskWarningCard,
} from '@tranyu/business/dashboard';
import type {
  ProcessHealthMetric,
  TodoSummaryItem,
  RiskWarningItem,
} from '@tranyu/business/dashboard';

const processMetrics: ProcessHealthMetric[] = [
  {
    id: 'process-approval',
    processType: '审批',
    processName: '项目审批',
    healthScore: 85,
    overdueRate: 0.08,
    returnRate: 0.12,
    avgDuration: 5,
    totalCount: 150,
    completedCount: 142,
    trendPercent: 5,
  },
  {
    id: 'process-review',
    processType: '评审',
    processName: '需求评审',
    healthScore: 78,
    overdueRate: 0.15,
    returnRate: 0.18,
    avgDuration: 7,
    totalCount: 80,
    completedCount: 68,
    trendPercent: -3,
  },
  {
    id: 'process-closure',
    processType: '关闭',
    processName: '风险关闭',
    healthScore: 92,
    overdueRate: 0.02,
    returnRate: 0.05,
    avgDuration: 3,
    totalCount: 45,
    completedCount: 44,
    trendPercent: 8,
  },
];

const todoSummary: TodoSummaryItem[] = [
  { id: 'todo-1', type: '待做', count: 35, percent: 35, color: 'var(--tr-color-neutral400)' },
  { id: 'todo-2', type: '进行中', count: 28, percent: 28, color: 'var(--tr-color-warning)' },
  { id: 'todo-3', type: '已完成', count: 32, percent: 32, color: 'var(--tr-color-success)' },
  { id: 'todo-4', type: '逾期', count: 5, percent: 5, color: 'var(--tr-color-danger)' },
];

const processRisks: RiskWarningItem[] = [
  {
    id: 'risk-overdue',
    name: '评审流程超期率高',
    level: 'high',
    status: 'monitoring',
    probability: 0.8,
    impact: 0.7,
    mitigation: '增加评审员数量，设置 SLA 执行',
    owner: '流程负责人',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-return',
    name: '退回率高',
    level: 'medium',
    status: 'identified',
    probability: 0.6,
    impact: 0.5,
    mitigation: '改进流程指导和模板',
    owner: '质量团队',
  },
];

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
.governance {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  min-height: 100vh;
}

.governance__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.governance__header h1 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0;
}

.governance__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.governance__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.governance__section-title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.governance__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--tr-spacing-4);
}

.governance__row {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
