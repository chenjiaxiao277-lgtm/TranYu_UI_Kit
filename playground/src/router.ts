import { createRouter, createWebHistory } from 'vue-router';
import StyleGuide from './views/StyleGuide.vue';

const routes = [
  {
    path: '/',
    name: 'StyleGuide',
    component: StyleGuide,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
