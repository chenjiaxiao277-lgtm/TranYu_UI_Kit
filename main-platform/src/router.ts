import { createRouter, createWebHistory } from 'vue-router';
import WorkbenchHomePage from './pages/WorkbenchHomePage.vue';
import ObjectListPage from './pages/ObjectListPage.vue';
import ProcessTodoPage from './pages/ProcessTodoPage.vue';
import BusinessCockpitPage from './pages/BusinessCockpitPage.vue';
import ProcessGovernancePage from './pages/ProcessGovernancePage.vue';
import RiskWarningPage from './pages/RiskWarningPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/workbench',
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: WorkbenchHomePage,
  },
  {
    path: '/objects',
    name: 'Objects',
    component: ObjectListPage,
  },
  {
    path: '/process-todos',
    name: 'ProcessTodos',
    component: ProcessTodoPage,
  },
  {
    path: '/cockpit/business',
    name: 'BusinessCockpit',
    component: BusinessCockpitPage,
  },
  {
    path: '/cockpit/process-governance',
    name: 'ProcessGovernance',
    component: ProcessGovernancePage,
  },
  {
    path: '/cockpit/risk-warning',
    name: 'RiskWarning',
    component: RiskWarningPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
