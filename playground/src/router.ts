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

const routes = [
  {
    path: '/',
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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
