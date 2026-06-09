import { createRouter, createWebHistory } from 'vue-router';
import WorkbenchHomePage from './pages/WorkbenchHomePage.vue';
import ObjectListPage from './pages/ObjectListPage.vue';
import ProcessTodoPage from './pages/ProcessTodoPage.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
