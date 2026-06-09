import { createRouter, createWebHistory } from 'vue-router';
import StyleGuide from './views/StyleGuide.vue';
import ObjectListPage from './views/ObjectListPage.vue';

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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
