<template>
  <nav class="sidebar">
    <div class="sidebar__menu">
      <a
        v-for="item in menuItems"
        :key="item.id"
        href="#"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': activeItem === item.id }"
        @click.prevent="selectItem(item.id, item.path)"
      >
        <span class="sidebar__icon">{{ item.icon }}</span>
        <span class="sidebar__label">{{ item.label }}</span>
      </a>
    </div>
    <div class="sidebar__footer">
      <div class="sidebar__info">v0.6.1</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const activeItem = ref('workbench');

const menuItems: MenuItem[] = [
  { id: 'workbench', label: '工作台', icon: '🏠', path: '/workbench' },
  { id: 'objects', label: '对象管理', icon: '📁', path: '/objects' },
  { id: 'process', label: '流程待办', icon: '📋', path: '/process-todos' },
  { id: 'business-cockpit', label: '经营驾驶舱', icon: '💼', path: '/cockpit/business' },
  { id: 'process-governance', label: '流程治理驾驶舱', icon: '⚙️', path: '/cockpit/process-governance' },
  { id: 'risk-warning', label: '风险预警中心', icon: '⚠️', path: '/cockpit/risk-warning' },
];

const selectItem = (id: string, path: string) => {
  activeItem.value = id;
  window.location.hash = path;
};

defineEmits<{
  navigate: [id: string];
}>();
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--tr-spacing-6) 0;
}

.sidebar__menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
  padding: 0 var(--tr-spacing-4);
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral400);
  text-decoration: none;
  transition: all var(--tr-motion-normal);
  cursor: pointer;
}

.sidebar__item:hover {
  background-color: var(--tr-color-neutral800);
  color: var(--tr-color-neutral0);
}

.sidebar__item--active {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.sidebar__icon {
  font-size: 18px;
  flex-shrink: 0;
}

.sidebar__label {
  font-size: 14px;
  font-weight: 500;
}

.sidebar__footer {
  padding: var(--tr-spacing-4);
  border-top: 1px solid var(--tr-color-neutral800);
}

.sidebar__info {
  font-size: 12px;
  color: var(--tr-color-neutral500);
  text-align: center;
}
</style>
