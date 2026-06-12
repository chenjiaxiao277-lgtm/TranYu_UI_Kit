<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="流程治理驾驶舱" subtitle="工作流健康度与风险监控" />
      </template>

      <tool-bar>
        <template #right>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ 刷新</tr-button>
        </template>
      </tool-bar>

      <div class="governance">
        <!-- Health Metrics -->
        <div class="governance__row">
          <metric-card :metric="healthScoreMetric" @click="handleAction" />
          <metric-card :metric="overdueRateMetric" @click="handleAction" />
          <metric-card :metric="returnRateMetric" @click="handleAction" />
          <metric-card :metric="avgDurationMetric" @click="handleAction" />
        </div>

        <!-- Process Health Overview -->
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

        <!-- Work Distribution -->
        <div class="governance__section">
          <h2 class="governance__section-title">工作分布</h2>
          <tr-card>
            <div class="governance__distribution">
              <div class="governance__distribution-item">
                <div class="governance__distribution-label">待做</div>
                <div class="governance__distribution-bar">
                  <div class="governance__distribution-segment" style="width: 35%; background-color: var(--tr-color-neutral400);">35</div>
                </div>
              </div>
              <div class="governance__distribution-item">
                <div class="governance__distribution-label">进行中</div>
                <div class="governance__distribution-bar">
                  <div class="governance__distribution-segment" style="width: 28%; background-color: var(--tr-color-warning);">28</div>
                </div>
              </div>
              <div class="governance__distribution-item">
                <div class="governance__distribution-label">已完成</div>
                <div class="governance__distribution-bar">
                  <div class="governance__distribution-segment" style="width: 32%; background-color: var(--tr-color-success);">32</div>
                </div>
              </div>
              <div class="governance__distribution-item">
                <div class="governance__distribution-label">逾期</div>
                <div class="governance__distribution-bar">
                  <div class="governance__distribution-segment" style="width: 5%; background-color: var(--tr-color-danger);">5</div>
                </div>
              </div>
            </div>
          </tr-card>
        </div>

        <!-- Bottleneck Analysis -->
        <div class="governance__section">
          <h2 class="governance__section-title">流程瓶颈分析</h2>
          <tr-card>
            <div class="governance__bottleneck-list">
              <div class="governance__bottleneck-item">
                <h4 class="governance__bottleneck-name">需求评审流程 - 评审环节</h4>
                <p class="governance__bottleneck-metrics">平均耗时: 7 天 | 超期率: 15% | 返工率: 18%</p>
                <p class="governance__bottleneck-suggestion">建议增加评审员数量，制定 SLA 强制执行</p>
              </div>
              <div class="governance__bottleneck-item">
                <h4 class="governance__bottleneck-name">项目审批流程 - 主管审批</h4>
                <p class="governance__bottleneck-metrics">平均耗时: 3 天 | 超期率: 8% | 返工率: 12%</p>
                <p class="governance__bottleneck-suggestion">优化审批权限配置，提升审批效率</p>
              </div>
              <div class="governance__bottleneck-item">
                <h4 class="governance__bottleneck-name">风险关闭流程 - 验证环节</h4>
                <p class="governance__bottleneck-metrics">平均耗时: 5 天 | 超期率: 12% | 返工率: 8%</p>
                <p class="governance__bottleneck-suggestion">完善风险验证标准，减少往返次数</p>
              </div>
            </div>
          </tr-card>
        </div>

        <!-- Process Risks -->
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

        <!-- AI Governance Insights -->
        <div class="governance__section">
          <h2 class="governance__section-title">AI治理建议</h2>
          <tr-card>
            <div class="governance__ai-insight">
              <p>📊 流程整体健康分数 85 分，相比上月提升 5 个百分点</p>
              <p>⚠️ 需求评审流程是主要瓶颈，超期率和返工率均超过行业平均 10%</p>
              <p>🔄 建议优化审批流程配置，预计可将平均耗时从 7 天降至 5 天</p>
              <p>✅ 本月流程优化成效显著，项目审批流程超期率下降 3%</p>
            </div>
          </tr-card>
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
import { MetricCard, ProcessHealthCard, RiskWarningCard } from '@tranyu/business/dashboard';
import type { DashboardMetric, ProcessHealthMetric, RiskWarningItem } from '@tranyu/business/dashboard';

const healthScoreMetric: DashboardMetric = {
  id: 'metric-health',
  name: '流程健康分',
  value: 85,
  trend: 'up',
  trendPercent: 5,
  icon: '💚',
};

const overdueRateMetric: DashboardMetric = {
  id: 'metric-overdue',
  name: '超期率',
  value: '8.5%',
  trend: 'down',
  trendPercent: 2,
  icon: '⏰',
};

const returnRateMetric: DashboardMetric = {
  id: 'metric-return',
  name: '返工率',
  value: '12.3%',
  trend: 'down',
  trendPercent: 3,
  icon: '🔄',
};

const avgDurationMetric: DashboardMetric = {
  id: 'metric-duration',
  name: '平均耗时',
  value: '5.2 天',
  trend: 'down',
  trendPercent: 8,
  icon: '⏱️',
};

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
    name: '返工率高',
    level: 'medium',
    status: 'identified',
    probability: 0.6,
    impact: 0.5,
    mitigation: '改进流程指导和模板',
    owner: '质量团队',
  },
];

const handleRefresh = () => {
  console.log('Governance dashboard refreshed');
};

const handleAction = () => {
  console.log('Action triggered');
};
</script>

<style scoped>
.governance {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.governance__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--tr-spacing-4);
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

.governance__distribution {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.governance__distribution-item {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
}

.governance__distribution-label {
  width: 60px;
  color: var(--tr-color-neutral700);
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.governance__distribution-bar {
  flex: 1;
  height: 24px;
  background-color: var(--tr-color-neutral200);
  border-radius: var(--tr-radius-sm);
  overflow: hidden;
}

.governance__distribution-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--tr-color-neutral0);
  font-size: 12px;
  font-weight: 600;
}

.governance__bottleneck-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.governance__bottleneck-item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border-left: 3px solid var(--tr-color-warning);
}

.governance__bottleneck-name {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.governance__bottleneck-metrics {
  color: var(--tr-color-neutral600);
  font-size: 13px;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.governance__bottleneck-suggestion {
  color: var(--tr-color-neutral700);
  font-size: 13px;
  margin: 0;
  font-style: italic;
}

.governance__ai-insight {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.governance__ai-insight p {
  color: var(--tr-color-neutral700);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
}
</style>
