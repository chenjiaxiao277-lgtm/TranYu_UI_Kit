<template>
  <app-layout :show-sidebar="true" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header
          title="Layout Components"
          subtitle="Demonstration of layout system with AppLayout, Toolbar, and FilterBar"
        />
      </template>

      <toolbar>
        <template #left>
          <tr-button type="primary">New Item</tr-button>
        </template>
        <template #center>
          <div style="font-size: 14px; color: var(--tr-color-neutral600)">
            Total: {{ items.length }} items
          </div>
        </template>
        <template #right>
          <tr-button type="secondary">Export</tr-button>
        </template>
      </toolbar>

      <filter-bar>
        <select v-model="filterType" class="filter-select">
          <option value="">All Types</option>
          <option value="A">Type A</option>
          <option value="B">Type B</option>
          <option value="C">Type C</option>
        </select>
        <select v-model="filterStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </filter-bar>

      <div class="demo-grid">
        <tr-card v-for="(item, index) in filteredItems" :key="index" :title="item.name" class="demo-card">
          <p>Type: {{ item.type }}</p>
          <p>
            Status:
            <tr-tag :color="item.status === 'Active' ? 'green' : 'gray'">
              {{ item.status }}
            </tr-tag>
          </p>
          <div style="margin-top: var(--tr-spacing-4); display: flex; gap: var(--tr-spacing-2)">
            <tr-button type="primary" size="small">Edit</tr-button>
            <tr-button type="secondary" size="small">Delete</tr-button>
          </div>
        </tr-card>
      </div>

      <action-bar>
        <tr-button type="secondary">Cancel</tr-button>
        <tr-button type="primary">Confirm</tr-button>
      </action-bar>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  AppLayout,
  PageContainer,
  Toolbar,
  FilterBar,
  ActionBar,
  TrButton,
  TrCard,
  TrTag,
} from '@tranyu/ui';

const showSidebar = ref(true);
const filterType = ref('');
const filterStatus = ref('');

const items = ref([
  { name: 'Item 1', type: 'A', status: 'Active' },
  { name: 'Item 2', type: 'B', status: 'Active' },
  { name: 'Item 3', type: 'A', status: 'Inactive' },
  { name: 'Item 4', type: 'C', status: 'Active' },
  { name: 'Item 5', type: 'B', status: 'Inactive' },
  { name: 'Item 6', type: 'C', status: 'Active' },
]);

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const typeMatch = !filterType.value || item.type === filterType.value;
    const statusMatch = !filterStatus.value || item.status === filterStatus.value;
    return typeMatch && statusMatch;
  });
});
</script>

<style scoped>
.filter-select {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  background-color: var(--tr-color-neutral0);
  color: var(--tr-color-neutral900);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.filter-select:focus {
  outline: none;
  border-color: var(--tr-color-primary);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--tr-spacing-6);
  margin-bottom: var(--tr-spacing-6);
}

.demo-card {
  height: 100%;
}

.demo-card p {
  margin: var(--tr-spacing-2) 0;
  font-size: 14px;
  color: var(--tr-color-neutral600);
}
</style>
