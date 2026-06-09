<template>
  <nav class="sidebar">
    <div class="sidebar__menu">
      <a
        v-for="item in menuItems"
        :key="item.id"
        href="#"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': activeItem === item.id }"
        @click.prevent="selectItem(item.id)"
      >
        <span class="sidebar__icon">{{ item.icon }}</span>
        <span class="sidebar__label">{{ item.label }}</span>
      </a>
    </div>
    <div class="sidebar__footer">
      <div class="sidebar__info">Version 0.2.0</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const menuItems = ref<MenuItem[]>([
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'objects', label: 'Objects', icon: '📁' },
  { id: 'reports', label: 'Reports', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'help', label: 'Help', icon: '❓' },
]);

const activeItem = ref('dashboard');

const selectItem = (id: string) => {
  activeItem.value = id;
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
