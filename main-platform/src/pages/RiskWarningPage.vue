<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="风险预警中心" subtitle="风险监控和管理" />
      </template>

      <tool-bar>
        <template #right>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ 刷新</tr-button>
        </template>
      </tool-bar>

      <div class="risk-center">
        <!-- Key Metrics -->
        <div class="risk-center__row">
          <metric-card :metric="totalRisksMetric" @click="handleAction" />
          <metric-card :metric="criticalMetric" @click="handleAction" />
          <metric-card :metric="escalatedMetric" @click="handleAction" />
          <metric-card :metric="resolvedMetric" @click="handleAction" />
        </div>

        <!-- Risk Distribution Charts -->
        <div class="risk-center__row">
          <div class="risk-center__card">
            <h3 class="risk-center__card-title">风险等级分布</h3>
            <tr-card>
              <div class="risk-center__chart-placeholder">
                <p>风险等级分布图表</p>
              </div>
            </tr-card>
          </div>
          <div class="risk-center__card">
            <h3 class="risk-center__card-title">责任人分布</h3>
            <tr-card>
              <div class="risk-center__chart-placeholder">
                <p>各责任人风险数量分布</p>
              </div>
            </tr-card>
          </div>
        </div>

        <!-- High Risk Items -->
        <div class="risk-center__section">
          <h2 class="risk-center__section-title">高风险事项 ({{ sortedRisks.length }})</h2>
          <div class="risk-center__grid">
            <risk-warning-card
              v-for="risk in sortedRisks"
              :key="risk.id"
              :item="risk"
            />
          </div>
        </div>

        <!-- Overdue Risks -->
        <div class="risk-center__section">
          <h2 class="risk-center__section-title">超期风险</h2>
          <tr-card>
            <div class="risk-center__overdue-list">
              <div v-for="risk in overdueRisks" :key="risk.id" class="risk-center__overdue-item">
                <div class="risk-center__overdue-header">
                  <h4 class="risk-center__overdue-name">{{ risk.name }}</h4>
                  <span class="risk-center__overdue-tag" :class="`risk-level-${risk.level}`">{{ risk.level }}</span>
                </div>
                <p class="risk-center__overdue-owner">责任人: {{ risk.owner }}</p>
              </div>
            </div>
          </tr-card>
        </div>

        <!-- AI Risk Insights -->
        <div class="risk-center__section">
          <h2 class="risk-center__section-title">AI风险建议</h2>
          <tr-card>
            <div class="risk-center__ai-insight">
              <p>⚠️ 关键风险 2 项需立即处理，包括平台 v3.0 进度延期和数据安全漏洞</p>
              <p>📊 高风险事项中 50% 涉及资源短缺，建议优先加强人力投入</p>
              <p>🔔 3 项风险已超期 3 天，建议立即启动应急预案</p>
              <p>✅ 本月已解决风险 4 项，解决率 67%，继续保持</p>
            </div>
          </tr-card>
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
import { MetricCard, RiskWarningCard } from '@tranyu/business/dashboard';
import type { DashboardMetric, RiskWarningItem } from '@tranyu/business/dashboard';

const totalRisksMetric: DashboardMetric = {
  id: 'metric-total-risks',
  name: '总风险数',
  value: 12,
  trend: 'down',
  trendPercent: 8,
  icon: '⚠️',
};

const criticalMetric: DashboardMetric = {
  id: 'metric-critical',
  name: '严重风险',
  value: 2,
  trend: 'stable',
  icon: '🔴',
};

const escalatedMetric: DashboardMetric = {
  id: 'metric-escalated',
  name: '已上报',
  value: 3,
  trend: 'up',
  trendPercent: 50,
  icon: '📈',
};

const resolvedMetric: DashboardMetric = {
  id: 'metric-resolved',
  name: '本月已解决',
  value: 4,
  trend: 'up',
  trendPercent: 25,
  icon: '✓',
};

const risks: RiskWarningItem[] = [
  {
    id: 'risk-1',
    name: '进度延期 - 平台 v3.0',
    level: 'critical',
    status: 'escalated',
    probability: 0.8,
    impact: 0.9,
    mitigation: '紧急资源调配，加快审批流程',
    owner: '陈晓芸',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-2',
    name: '资源短缺',
    level: 'high',
    status: 'monitoring',
    probability: 0.7,
    impact: 0.7,
    mitigation: '加快招聘，聘用承包商',
    owner: '人力资源团队',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-3',
    name: '预算超支',
    level: 'high',
    status: 'monitoring',
    probability: 0.6,
    impact: 0.8,
    mitigation: '范围缩减，成本优化',
    owner: '财务团队',
  },
  {
    id: 'risk-4',
    name: '技术债累积',
    level: 'medium',
    status: 'identified',
    probability: 0.5,
    impact: 0.6,
    mitigation: '分配 20% 冲刺容量处理技术债',
    owner: '技术主管',
  },
  {
    id: 'risk-5',
    name: '关键人员依赖',
    level: 'medium',
    status: 'monitoring',
    probability: 0.3,
    impact: 0.7,
    mitigation: '交叉培训团队成员',
    owner: '经理',
  },
  {
    id: 'risk-6',
    name: '数据安全漏洞',
    level: 'critical',
    status: 'escalated',
    probability: 0.4,
    impact: 0.95,
    mitigation: '安全审计，补丁部署',
    owner: '安全团队',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const sortedRisks = computed(() => {
  const levelOrder: Record<string, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  return [...risks].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
});

const overdueRisks = computed(() => {
  const now = Date.now();
  return sortedRisks.value.filter(r => r.dueDate && new Date(r.dueDate).getTime() < now);
});

const handleRefresh = () => {
  console.log('Risk center refreshed');
};

const handleAction = () => {
  console.log('Action triggered');
};
</script>

<style scoped>
.risk-center {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.risk-center__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--tr-spacing-4);
}

.risk-center__card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  min-width: 0;
}

.risk-center__card-title {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.risk-center__chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral600);
}

.risk-center__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.risk-center__section-title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.risk-center__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--tr-spacing-4);
}

.risk-center__overdue-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.risk-center__overdue-item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border-left: 3px solid var(--tr-color-danger);
}

.risk-center__overdue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--tr-spacing-2);
}

.risk-center__overdue-name {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.risk-center__overdue-tag {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  border-radius: var(--tr-radius-sm);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.risk-center__overdue-tag.risk-level-critical {
  background-color: rgba(240, 53, 53, 0.15);
  color: var(--tr-color-danger);
}

.risk-center__overdue-tag.risk-level-high {
  background-color: rgba(250, 173, 20, 0.15);
  color: var(--tr-color-warning);
}

.risk-center__overdue-owner {
  color: var(--tr-color-neutral600);
  font-size: 13px;
  margin: 0;
}

.risk-center__ai-insight {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.risk-center__ai-insight p {
  color: var(--tr-color-neutral700);
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
}
</style>
