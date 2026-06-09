<template>
  <div class="risk-dashboard">
    <div class="risk-dashboard__header">
      <h1>Risk Warning Dashboard</h1>
      <div class="risk-dashboard__stats">
        <div class="stat critical">{{ risks.filter((r) => r.level === 'critical').length }} Critical</div>
        <div class="stat high">{{ risks.filter((r) => r.level === 'high').length }} High</div>
        <div class="stat medium">{{ risks.filter((r) => r.level === 'medium').length }} Medium</div>
      </div>
    </div>

    <div class="risk-dashboard__content">
      <!-- Key Risk Metrics -->
      <div class="risk-dashboard__row">
        <metric-card :metric="totalRiskMetric" @click="handleAction" />
        <metric-card :metric="criticalMetric" @click="handleAction" />
        <metric-card :metric="escalatedMetric" @click="handleAction" />
        <metric-card :metric="resolvedMetric" @click="handleAction" />
      </div>

      <!-- Risk List -->
      <div class="risk-dashboard__section">
        <h2 class="risk-dashboard__section-title">All Risks ({{ risks.length }})</h2>
        <div class="risk-dashboard__list">
          <risk-warning-card
            v-for="risk in sortedRisks"
            :key="risk.id"
            :item="risk"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  MetricCard,
  RiskWarningCard,
} from '@tranyu/business/dashboard';
import type {
  DashboardMetric,
  RiskWarningItem,
} from '@tranyu/business/dashboard';

const totalRiskMetric: DashboardMetric = {
  id: 'metric-total-risks',
  name: 'Total Risks',
  value: 12,
  trend: 'down',
  trendPercent: 8,
  icon: '⚠️',
};

const criticalMetric: DashboardMetric = {
  id: 'metric-critical',
  name: 'Critical Risks',
  value: 2,
  trend: 'stable',
  icon: '🔴',
};

const escalatedMetric: DashboardMetric = {
  id: 'metric-escalated',
  name: 'Escalated',
  value: 3,
  trend: 'up',
  trendPercent: 50,
  icon: '📈',
};

const resolvedMetric: DashboardMetric = {
  id: 'metric-resolved',
  name: 'Resolved This Month',
  value: 4,
  trend: 'up',
  trendPercent: 25,
  icon: '✓',
};

const risks: RiskWarningItem[] = [
  {
    id: 'risk-1',
    name: 'Schedule Delay - Platform v3.0',
    level: 'critical',
    status: 'escalated',
    probability: 0.8,
    impact: 0.9,
    mitigation: 'Emergency resource allocation, expedited approvals',
    owner: 'Alice Chen',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-2',
    name: 'Resource Shortage',
    level: 'high',
    status: 'monitoring',
    probability: 0.7,
    impact: 0.7,
    mitigation: 'Accelerate recruitment, hire contractors',
    owner: 'HR Team',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'risk-3',
    name: 'Budget Overrun',
    level: 'high',
    status: 'monitoring',
    probability: 0.6,
    impact: 0.8,
    mitigation: 'Scope reduction, cost optimization',
    owner: 'Finance Team',
  },
  {
    id: 'risk-4',
    name: 'Technical Debt Accumulation',
    level: 'medium',
    status: 'identified',
    probability: 0.5,
    impact: 0.6,
    mitigation: 'Allocate 20% sprint capacity to tech debt',
    owner: 'Tech Lead',
  },
  {
    id: 'risk-5',
    name: 'Key Person Dependency',
    level: 'medium',
    status: 'monitoring',
    probability: 0.3,
    impact: 0.7,
    mitigation: 'Cross-train team members',
    owner: 'Manager',
  },
  {
    id: 'risk-6',
    name: 'Data Security Vulnerability',
    level: 'critical',
    status: 'escalated',
    probability: 0.4,
    impact: 0.95,
    mitigation: 'Security audit, patch deployment',
    owner: 'Security Team',
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
.risk-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  min-height: 100vh;
}

.risk-dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.risk-dashboard__header h1 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0;
}

.risk-dashboard__stats {
  display: flex;
  gap: var(--tr-spacing-3);
}

.stat {
  padding: var(--tr-spacing-2) var(--tr-spacing-4);
  border-radius: var(--tr-radius-md);
  font-size: 12px;
  font-weight: 600;
}

.stat.critical {
  background-color: rgba(240, 53, 53, 0.15);
  color: var(--tr-color-danger);
}

.stat.high {
  background-color: rgba(250, 173, 20, 0.15);
  color: var(--tr-color-warning);
}

.stat.medium {
  background-color: rgba(52, 211, 153, 0.15);
  color: var(--tr-color-success);
}

.risk-dashboard__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.risk-dashboard__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--tr-spacing-4);
}

.risk-dashboard__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.risk-dashboard__section-title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.risk-dashboard__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--tr-spacing-4);
}
</style>
