<template>
  <div class="demo-container">
    <h1>Dashboard Components</h1>
    <p>All dashboard components with props-based data injection.</p>

    <div class="demo-section">
      <h2>MetricCard</h2>
      <div class="demo-grid">
        <metric-card
          :metric="metricExample1"
          @click="handleAction"
        />
        <metric-card
          :metric="metricExample2"
          @click="handleAction"
        />
        <metric-card
          :metric="metricExample3"
          @click="handleAction"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2>TrendCard</h2>
      <div class="demo-grid">
        <trend-card :trend="trendExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>ChartCard</h2>
      <div class="demo-grid">
        <chart-card :chart="chartExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>DashboardWidget</h2>
      <div class="demo-grid">
        <dashboard-widget
          :widget="widgetExample"
          @action="handleAction"
          @refresh="handleRefresh"
        />
      </div>
    </div>

    <div class="demo-section">
      <h2>RiskWarningCard</h2>
      <div class="demo-grid">
        <risk-warning-card :item="riskExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>TodoSummaryCard</h2>
      <div class="demo-grid">
        <todo-summary-card :items="todoItems" @click="handleAction" />
      </div>
    </div>

    <div class="demo-section">
      <h2>ProcessHealthCard</h2>
      <div class="demo-grid">
        <process-health-card :metric="processHealthExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>ProjectProgressCard</h2>
      <div class="demo-grid">
        <project-progress-card :item="projectExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>RevenueSummaryCard</h2>
      <div class="demo-grid">
        <revenue-summary-card :summary="revenueExample" />
      </div>
    </div>

    <div class="demo-section">
      <h2>AiInsightCard</h2>
      <div class="demo-grid">
        <ai-insight-card :item="aiInsightExample" @action="handleAction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MetricCard,
  TrendCard,
  ChartCard,
  DashboardWidget,
  RiskWarningCard,
  TodoSummaryCard,
  ProcessHealthCard,
  ProjectProgressCard,
  RevenueSummaryCard,
  AiInsightCard,
} from '@tranyu/business/dashboard';
import type {
  DashboardMetric,
  DashboardTrend,
  ChartData,
  DashboardWidgetConfig,
  RiskWarningItem,
  TodoSummaryItem,
  ProcessHealthMetric,
  ProjectProgressItem,
  RevenueSummary,
  AiInsightItem,
} from '@tranyu/business/dashboard';

const metricExample1: DashboardMetric = {
  id: 'metric-1',
  name: 'Total Revenue',
  value: '$2.5M',
  unit: 'USD',
  trend: 'up',
  trendPercent: 12,
  icon: '📈',
};

const metricExample2: DashboardMetric = {
  id: 'metric-2',
  name: 'Active Projects',
  value: 24,
  trend: 'stable',
  description: '4 at risk',
};

const metricExample3: DashboardMetric = {
  id: 'metric-3',
  name: 'Approval Rate',
  value: '94.5%',
  trend: 'down',
  trendPercent: 3,
};

const trendExample: DashboardTrend = {
  id: 'trend-1',
  name: 'Monthly Revenue Trend',
  unit: 'USD K',
  trend: 'up',
  trendPercent: 8,
  data: [
    { timestamp: '2024-01-01', value: 500 },
    { timestamp: '2024-02-01', value: 450 },
    { timestamp: '2024-03-01', value: 600 },
    { timestamp: '2024-04-01', value: 750 },
    { timestamp: '2024-05-01', value: 900 },
    { timestamp: '2024-06-01', value: 1100 },
  ],
};

const chartExample: ChartData = {
  id: 'chart-1',
  type: 'bar',
  title: 'Project Distribution',
  height: 300,
  data: {},
};

const widgetExample: DashboardWidgetConfig = {
  id: 'widget-1',
  title: 'Key Metric',
  type: 'metric',
  size: 'medium',
  data: metricExample1,
  refreshable: true,
  clickable: true,
};

const riskExample: RiskWarningItem = {
  id: 'risk-1',
  name: 'Schedule Delay - Platform v3.0',
  level: 'high',
  status: 'monitoring',
  probability: 0.7,
  impact: 0.8,
  mitigation: 'Add 2 developers to accelerate development phase',
  owner: 'Alice Chen',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
};

const todoItems: TodoSummaryItem[] = [
  { id: 'todo-1', type: 'todo', count: 18, percent: 30, color: 'var(--tr-color-neutral400)' },
  { id: 'todo-2', type: 'inprogress', count: 12, percent: 20, color: 'var(--tr-color-warning)' },
  { id: 'todo-3', type: 'completed', count: 48, percent: 80, color: 'var(--tr-color-success)' },
  { id: 'todo-4', type: 'overdue', count: 2, percent: 100, color: 'var(--tr-color-danger)' },
];

const processHealthExample: ProcessHealthMetric = {
  id: 'process-1',
  processType: 'Approval',
  processName: 'Project Approval',
  healthScore: 85,
  overdueRate: 0.08,
  returnRate: 0.12,
  avgDuration: 5,
  totalCount: 150,
  completedCount: 142,
  trendPercent: 5,
};

const projectExample: ProjectProgressItem = {
  id: 'proj-1',
  name: 'Platform v3.0',
  status: 'active',
  progress: 0.65,
  budget: 500000,
  spent: 325000,
  startDate: '2024-01-15',
  endDate: '2024-12-31',
  owner: 'Bob Smith',
  riskLevel: 'medium',
};

const revenueExample: RevenueSummary = {
  id: 'revenue-1',
  totalRevenue: 2500000,
  monthRevenue: 180000,
  yearRevenue: 1800000,
  contractCount: 45,
  collectionRate: 0.94,
  overdueAmount: 50000,
  trend: 'up',
  trendPercent: 12,
};

const aiInsightExample: AiInsightItem = {
  id: 'insight-1',
  title: 'Optimize approval workflow',
  content: 'Analysis shows your average approval time is 5 days. Industry best practice is 2-3 days. Consider parallel approvals.',
  type: 'optimization',
  confidence: 0.92,
  riskLevel: 'low',
  actionable: true,
  actionLabel: 'Apply Suggestion',
  timestamp: new Date().toISOString(),
};

const handleAction = (_action: DashboardEventPayload) => {
  console.log('Action triggered');
};

const handleRefresh = (_widgetId: string) => {
  console.log('Refresh widget');
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
.demo-container {
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  min-height: 100vh;
}

.demo-container h1 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.demo-container > p {
  color: var(--tr-color-neutral600);
  margin: 0 0 var(--tr-spacing-6) 0;
}

.demo-section {
  margin-bottom: var(--tr-spacing-8);
}

.demo-section h2 {
  color: var(--tr-color-neutral900);
  font-size: 18px;
  margin: 0 0 var(--tr-spacing-4) 0;
  padding-bottom: var(--tr-spacing-2);
  border-bottom: 2px solid var(--tr-color-primary);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--tr-spacing-4);
}
</style>
