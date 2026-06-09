import { createRouter, createWebHistory } from 'vue-router';
import StyleGuide from './views/StyleGuide.vue';
import ObjectListPage from './views/ObjectListPage.vue';
import LayoutDemo from './views/LayoutDemo.vue';
import WorkbenchLayoutDemo from './views/WorkbenchLayoutDemo.vue';
import ObjectComponentDemo from './views/ObjectComponentDemo.vue';
import ProjectObjectDemo from './views/ProjectObjectDemo.vue';
import DemandObjectDemo from './views/DemandObjectDemo.vue';
import RiskObjectDemo from './views/RiskObjectDemo.vue';
import ProcessComponentDemo from './views/ProcessComponentDemo.vue';
import ProjectApprovalDemo from './views/ProjectApprovalDemo.vue';
import DemandReviewDemo from './views/DemandReviewDemo.vue';
import RiskCloseDemo from './views/RiskCloseDemo.vue';
import AiComponentDemo from './views/AiComponentDemo.vue';
import RequirementAiGenerateDemo from './views/RequirementAiGenerateDemo.vue';
import StageGateAiCheckDemo from './views/StageGateAiCheckDemo.vue';
import ProjectRiskAiSummaryDemo from './views/ProjectRiskAiSummaryDemo.vue';
import ProcessAuditAiSuggestionDemo from './views/ProcessAuditAiSuggestionDemo.vue';
import DashboardComponentDemo from './views/DashboardComponentDemo.vue';
import BusinessCockpitDemo from './views/BusinessCockpitDemo.vue';
import ProcessGovernanceDashboardDemo from './views/ProcessGovernanceDashboardDemo.vue';
import RiskWarningDashboardDemo from './views/RiskWarningDashboardDemo.vue';
import AiBusinessInsightDemo from './views/AiBusinessInsightDemo.vue';
import DemoHome from './views/DemoHome.vue';

const routes = [
  {
    path: '/',
    name: 'DemoHome',
    component: DemoHome,
  },
  {
    path: '/style-guide',
    name: 'StyleGuide',
    component: StyleGuide,
  },
  {
    path: '/objects',
    name: 'ObjectList',
    component: ObjectListPage,
  },
  {
    path: '/layout-demo',
    name: 'LayoutDemo',
    component: LayoutDemo,
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: WorkbenchLayoutDemo,
  },
  {
    path: '/object-component-demo',
    name: 'ObjectComponentDemo',
    component: ObjectComponentDemo,
  },
  {
    path: '/object-demo/project',
    name: 'ProjectObjectDemo',
    component: ProjectObjectDemo,
  },
  {
    path: '/object-demo/demand',
    name: 'DemandObjectDemo',
    component: DemandObjectDemo,
  },
  {
    path: '/object-demo/risk',
    name: 'RiskObjectDemo',
    component: RiskObjectDemo,
  },
  {
    path: '/process-component-demo',
    name: 'ProcessComponentDemo',
    component: ProcessComponentDemo,
  },
  {
    path: '/process/project-approval',
    name: 'ProjectApprovalDemo',
    component: ProjectApprovalDemo,
  },
  {
    path: '/process/demand-review',
    name: 'DemandReviewDemo',
    component: DemandReviewDemo,
  },
  {
    path: '/process/risk-close',
    name: 'RiskCloseDemo',
    component: RiskCloseDemo,
  },
  {
    path: '/ai-component-demo',
    name: 'AiComponentDemo',
    component: AiComponentDemo,
  },
  {
    path: '/ai/requirement-generate',
    name: 'RequirementAiGenerateDemo',
    component: RequirementAiGenerateDemo,
  },
  {
    path: '/ai/stage-gate-check',
    name: 'StageGateAiCheckDemo',
    component: StageGateAiCheckDemo,
  },
  {
    path: '/ai/project-risk-summary',
    name: 'ProjectRiskAiSummaryDemo',
    component: ProjectRiskAiSummaryDemo,
  },
  {
    path: '/ai/process-audit-suggestion',
    name: 'ProcessAuditAiSuggestionDemo',
    component: ProcessAuditAiSuggestionDemo,
  },
  {
    path: '/dashboard-component-demo',
    name: 'DashboardComponentDemo',
    component: DashboardComponentDemo,
  },
  {
    path: '/dashboard/business-cockpit',
    name: 'BusinessCockpitDemo',
    component: BusinessCockpitDemo,
  },
  {
    path: '/dashboard/process-governance',
    name: 'ProcessGovernanceDashboardDemo',
    component: ProcessGovernanceDashboardDemo,
  },
  {
    path: '/dashboard/risk-warning',
    name: 'RiskWarningDashboardDemo',
    component: RiskWarningDashboardDemo,
  },
  {
    path: '/dashboard/ai-insight',
    name: 'AiBusinessInsightDemo',
    component: AiBusinessInsightDemo,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
