import { createRouter, createWebHistory } from 'vue-router';
import StyleGuide from './views/StyleGuide.vue';
import ObjectListPage from './views/ObjectListPage.vue';
import LayoutDemo from './views/LayoutDemo.vue';
import WorkbenchLayoutDemo from './views/WorkbenchLayoutDemo.vue';

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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
