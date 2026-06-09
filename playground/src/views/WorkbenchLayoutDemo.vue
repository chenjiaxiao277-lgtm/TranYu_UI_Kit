<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header
          title="Workbench"
          subtitle="Complete workbench layout with dashboard cards and metrics"
        >
          <template #extra>
            <router-link to="/layout-demo" class="nav-link">
              <tr-button type="secondary" size="small">View Layout Demo</tr-button>
            </router-link>
          </template>
        </tr-page-header>
      </template>

      <toolbar>
        <template #left>
          <span style="font-weight: 600; color: var(--tr-color-neutral900)">Dashboard Overview</span>
        </template>
        <template #right>
          <tr-button type="secondary" size="small">Refresh</tr-button>
        </template>
      </toolbar>

      <div class="stats-grid">
        <tr-card class="stat-card">
          <div class="stat-header">Total Objects</div>
          <div class="stat-value">2,458</div>
          <div class="stat-change">+12% this month</div>
        </tr-card>
        <tr-card class="stat-card">
          <div class="stat-header">Active Users</div>
          <div class="stat-value">487</div>
          <div class="stat-change">+8% this month</div>
        </tr-card>
        <tr-card class="stat-card">
          <div class="stat-header">Storage Used</div>
          <div class="stat-value">45 GB</div>
          <div class="stat-change">of 100 GB</div>
        </tr-card>
        <tr-card class="stat-card">
          <div class="stat-header">Performance</div>
          <div class="stat-value">98.5%</div>
          <div class="stat-change">Uptime</div>
        </tr-card>
      </div>

      <div class="section-title">Recent Activities</div>
      <tr-table :columns="activityColumns" :data="activities" :pagination="{ pageSize: 5 }" />

      <div class="section-title" style="margin-top: var(--tr-spacing-8)">Status Overview</div>
      <div class="status-grid">
        <tr-card v-for="status in statuses" :key="status.id" class="status-card">
          <div class="status-badge" :style="{ backgroundColor: status.color }">
            {{ status.count }}
          </div>
          <div class="status-label">{{ status.label }}</div>
        </tr-card>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, Toolbar, TrPageHeader, TrCard, TrButton, TrTable } from '@tranyu/ui';

const showSidebar = ref(true);

const activityColumns = [
  { title: 'Event', dataIndex: 'event' },
  { title: 'User', dataIndex: 'user' },
  { title: 'Time', dataIndex: 'time' },
  { title: 'Status', dataIndex: 'status' },
];

const activities = [
  { event: 'Created new report', user: 'John Doe', time: '2 hours ago', status: 'Success' },
  { event: 'Updated settings', user: 'Jane Smith', time: '4 hours ago', status: 'Success' },
  { event: 'Deleted old data', user: 'Bob Wilson', time: '1 day ago', status: 'Success' },
  { event: 'Exported records', user: 'Alice Brown', time: '2 days ago', status: 'Success' },
  { event: 'Imported database', user: 'Charlie Davis', time: '3 days ago', status: 'Success' },
];

const statuses = [
  { id: 1, label: 'Active', count: 156, color: 'var(--tr-color-success)' },
  { id: 2, label: 'Processing', count: 32, color: 'var(--tr-color-warning)' },
  { id: 3, label: 'Pending', count: 18, color: 'var(--tr-color-info)' },
  { id: 4, label: 'Failed', count: 5, color: 'var(--tr-color-danger)' },
];
</script>

<style scoped>
.nav-link {
  text-decoration: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--tr-spacing-6);
  margin-bottom: var(--tr-spacing-8);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.stat-header {
  font-size: 14px;
  color: var(--tr-color-neutral600);
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--tr-color-primary);
}

.stat-change {
  font-size: 12px;
  color: var(--tr-color-neutral500);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
  margin-bottom: var(--tr-spacing-4);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--tr-spacing-4);
}

.status-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  text-align: center;
}

.status-badge {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tr-color-neutral0);
  font-weight: 600;
  font-size: 20px;
}

.status-label {
  font-size: 14px;
  color: var(--tr-color-neutral600);
  font-weight: 500;
}
</style>
