<template>
  <div class="ai-insight">
    <div class="ai-insight__header">
      <h1>AI Business Insights</h1>
      <span class="ai-insight__timestamp">Last updated: {{ lastUpdate }}</span>
    </div>

    <div class="ai-insight__content">
      <!-- Summary Stats -->
      <div class="ai-insight__row">
        <metric-card :metric="insightCountMetric" @click="handleAction" />
        <metric-card :metric="avgConfidenceMetric" @click="handleAction" />
        <metric-card :metric="actionableMetric" @click="handleAction" />
      </div>

      <!-- Insights by Category -->
      <div class="ai-insight__section">
        <h2 class="ai-insight__section-title">Opportunities ({{ opportunities.length }})</h2>
        <div class="ai-insight__grid">
          <ai-insight-card
            v-for="insight in opportunities"
            :key="insight.id"
            :item="insight"
            @action="handleAction"
          />
        </div>
      </div>

      <div class="ai-insight__section">
        <h2 class="ai-insight__section-title">Risks ({{ risks.length }})</h2>
        <div class="ai-insight__grid">
          <ai-insight-card
            v-for="insight in risks"
            :key="insight.id"
            :item="insight"
            @action="handleAction"
          />
        </div>
      </div>

      <div class="ai-insight__section">
        <h2 class="ai-insight__section-title">Optimizations ({{ optimizations.length }})</h2>
        <div class="ai-insight__grid">
          <ai-insight-card
            v-for="insight in optimizations"
            :key="insight.id"
            :item="insight"
            @action="handleAction"
          />
        </div>
      </div>

      <div class="ai-insight__section">
        <h2 class="ai-insight__section-title">Recommendations ({{ recommendations.length }})</h2>
        <div class="ai-insight__grid">
          <ai-insight-card
            v-for="insight in recommendations"
            :key="insight.id"
            :item="insight"
            @action="handleAction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MetricCard,
  AiInsightCard,
} from '@tranyu/business/dashboard';
import type {
  DashboardMetric,
  AiInsightItem,
  DashboardEventPayload,
} from '@tranyu/business/dashboard';

const lastUpdate = new Date().toLocaleString();

const insightCountMetric: DashboardMetric = {
  id: 'metric-insights',
  name: 'Total Insights',
  value: 12,
  icon: '🤖',
};

const avgConfidenceMetric: DashboardMetric = {
  id: 'metric-confidence',
  name: 'Avg Confidence',
  value: '87%',
  trend: 'up',
  trendPercent: 5,
};

const actionableMetric: DashboardMetric = {
  id: 'metric-actionable',
  name: 'Actionable',
  value: 8,
  description: '67% of insights',
};

const opportunities: AiInsightItem[] = [
  {
    id: 'opp-1',
    title: 'Cross-sell Opportunity in Manufacturing Sector',
    content: 'Analysis of customer base shows 15 accounts in manufacturing without active service agreements. Potential revenue increase: $200K.',
    type: 'opportunity',
    confidence: 0.92,
    actionable: true,
    actionLabel: 'Create Campaign',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'opp-2',
    title: 'Upsell Potential in Existing Contracts',
    content: 'Customers with Platform Basic could benefit from Premium features. Estimated additional revenue: $150K/year.',
    type: 'opportunity',
    confidence: 0.85,
    actionable: true,
    actionLabel: 'Generate Proposals',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

const risks: AiInsightItem[] = [
  {
    id: 'risk-1',
    title: 'High Churn Risk - Top Customer Alert',
    content: 'Customer ABC Corp shows declining engagement (70% drop in API calls). Historical data suggests 40% churn probability within 3 months.',
    type: 'risk',
    confidence: 0.88,
    riskLevel: 'high',
    actionable: true,
    actionLabel: 'Engage Account Manager',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-2',
    title: 'Payment Default Risk',
    content: '5 accounts show signs of financial stress. Average days-to-pay increasing. Recommended action: tighten payment terms.',
    type: 'risk',
    confidence: 0.82,
    riskLevel: 'medium',
    actionable: true,
    actionLabel: 'Review Credit Risk',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

const optimizations: AiInsightItem[] = [
  {
    id: 'opt-1',
    title: 'Optimize Approval Workflow',
    content: 'Your approval process averages 5 days. Industry benchmark is 2-3 days. Suggested: parallel approvals for low-risk categories.',
    type: 'optimization',
    confidence: 0.91,
    actionable: true,
    actionLabel: 'View Workflow Plan',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'opt-2',
    title: 'Reduce Project Overruns',
    content: '45% of projects exceed budget. Root cause: scope creep. ML analysis recommends stricter change control process.',
    type: 'optimization',
    confidence: 0.79,
    actionable: true,
    actionLabel: 'Implement Guidelines',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

const recommendations: AiInsightItem[] = [
  {
    id: 'rec-1',
    title: 'Hire 2 Senior Engineers',
    content: 'Current team utilization is 95%. Hiring 2 senior engineers will reduce cycle time by 30% and improve code quality.',
    type: 'recommendation',
    confidence: 0.86,
    actionable: true,
    actionLabel: 'Create Job Requisition',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rec-2',
    title: 'Implement Automated Testing',
    content: 'Currently 40% of defects are caught in production. Automated testing could reduce production defects by 85%.',
    type: 'recommendation',
    confidence: 0.81,
    actionable: true,
    actionLabel: 'Schedule Technical Review',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
];

const handleAction = (action: DashboardEventPayload) => {
  console.log('AI Insight Action:', action);
};
</script>

<style scoped>
.ai-insight {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  min-height: 100vh;
}

.ai-insight__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-insight__header h1 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0;
}

.ai-insight__timestamp {
  color: var(--tr-color-neutral600);
  font-size: 12px;
}

.ai-insight__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.ai-insight__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--tr-spacing-4);
}

.ai-insight__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.ai-insight__section-title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.ai-insight__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--tr-spacing-4);
}
</style>
