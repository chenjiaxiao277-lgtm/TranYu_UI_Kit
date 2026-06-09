import { createRouter, createWebHistory } from 'vue-router';
import StyleGuide from './views/StyleGuide.vue';
import ObjectListPage from './views/ObjectListPage.vue';
import LayoutDemo from './views/LayoutDemo.vue';
import WorkbenchLayoutDemo from './views/WorkbenchLayoutDemo.vue';
import ObjectComponentDemo from './views/ObjectComponentDemo.vue';
import ProjectObjectDemo from './views/ProjectObjectDemo.vue';
import DemandObjectDemo from './views/DemandObjectDemo.vue';
import RiskObjectDemo from './views/RiskObjectDemo.vue';

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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
