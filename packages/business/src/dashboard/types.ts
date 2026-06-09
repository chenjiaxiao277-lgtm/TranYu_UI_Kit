/**
 * Dashboard Components Types
 * v0.6.0
 */

export interface DashboardMetric {
  id: string;
  name: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercent?: number;
  color?: string;
  icon?: string;
  description?: string;
  timestamp?: string;
}

export interface DashboardTrend {
  id: string;
  name: string;
  data: Array<{
    timestamp: string;
    value: number;
    label?: string;
  }>;
  unit?: string;
  baseline?: number;
  trend?: 'up' | 'down' | 'stable';
  trendPercent?: number;
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  title?: string;
  data: any;
  options?: any;
  height?: number;
}

export interface DashboardWidgetConfig {
  id: string;
  title: string;
  type: 'metric' | 'trend' | 'chart' | 'card';
  size?: 'small' | 'medium' | 'large';
  data: any;
  refreshable?: boolean;
  clickable?: boolean;
}

export interface RiskWarningItem {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  status: 'identified' | 'monitoring' | 'escalated' | 'resolved';
  probability?: number;
  impact?: number;
  mitigation?: string;
  owner?: string;
  dueDate?: string;
  description?: string;
}

export interface TodoSummaryItem {
  id: string;
  type: 'todo' | 'inprogress' | 'completed' | 'overdue';
  count: number;
  percent?: number;
  color?: string;
  description?: string;
}

export interface ProcessHealthMetric {
  id: string;
  processType: string;
  processName: string;
  healthScore: number;
  overdueRate: number;
  returnRate: number;
  avgDuration: number;
  totalCount: number;
  completedCount: number;
  trendPercent?: number;
}

export interface ProjectProgressItem {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  budget?: number;
  spent?: number;
  startDate?: string;
  endDate?: string;
  owner?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface RevenueSummary {
  id: string;
  totalRevenue: number;
  monthRevenue: number;
  yearRevenue: number;
  contractCount: number;
  collectionRate: number;
  overdueAmount: number;
  trend?: 'up' | 'down' | 'stable';
  trendPercent?: number;
}

export interface AiInsightItem {
  id: string;
  title: string;
  content: string;
  type: 'opportunity' | 'risk' | 'optimization' | 'recommendation';
  confidence: number;
  riskLevel?: 'low' | 'medium' | 'high';
  actionable: boolean;
  actionLabel?: string;
  timestamp?: string;
}

export interface DashboardEventPayload {
  id: string;
  action: string;
  data?: any;
  timestamp?: string;
}
