<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header title="Projects" subtitle="Project object list with dynamic rendering" />
      </template>

      <object-toolbar
        object-type="project"
        @create="handleCreate"
        @refresh="handleRefresh"
        @search="handleSearch"
      />

      <object-table
        object-type="project"
        :fields="projectFields"
        :records="projects"
        status-field="status"
        :status-options="statusOptions"
        :actions="actions"
        @row-click="handleRowClick"
        @action="handleAction"
      />

      <object-detail-drawer
        :visible="showDetail"
        :record="selectedRecord"
        :fields="projectFields"
        status-field="status"
        :status-options="statusOptions"
        :actions="actions"
        @close="showDetail = false"
        @action="handleDetailAction"
      />
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  AppLayout,
  PageContainer,
  TrPageHeader,
} from '@tranyu/ui';
import {
  ObjectToolbar,
  ObjectTable,
  ObjectDetailDrawer,
  type ObjectField,
  type ObjectRecord,
  type ObjectAction,
  type StatusOption,
} from '@tranyu/business';

const showSidebar = ref(true);
const showDetail = ref(false);
const selectedRecord = ref<ObjectRecord>();

const projectFields: ObjectField[] = [
  { id: 'name', label: 'Project Name', type: 'text', required: true },
  { id: 'status', label: 'Status', type: 'status' },
  { id: 'budget', label: 'Budget', type: 'amount' },
  { id: 'progress', label: 'Progress', type: 'percent' },
  { id: 'owner', label: 'Owner', type: 'user' },
  { id: 'department', label: 'Department', type: 'department' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'endDate', label: 'End Date', type: 'date' },
  { id: 'description', label: 'Description', type: 'textarea' },
];

const statusOptions: StatusOption[] = [
  { value: 'planning', label: 'Planning', color: 'var(--tr-color-warning)' },
  { value: 'active', label: 'Active', color: 'var(--tr-color-success)' },
  { value: 'completed', label: 'Completed', color: 'var(--tr-color-info)' },
  { value: 'canceled', label: 'Canceled', color: 'var(--tr-color-neutral500)' },
];

const actions: ObjectAction[] = [
  { id: 'edit', label: 'Edit', type: 'primary' },
  { id: 'delete', label: 'Delete', type: 'danger', requiresConfirm: true, confirmMessage: 'Delete this project?' },
];

const projects = ref<ObjectRecord[]>([
  {
    id: 'p1',
    objectType: 'project',
    data: {
      name: 'Platform v3.0',
      status: 'active',
      budget: 100000,
      progress: 0.65,
      owner: 'Alice Chen',
      department: 'Engineering',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      description: 'Platform infrastructure upgrade',
    },
  },
  {
    id: 'p2',
    objectType: 'project',
    data: {
      name: 'Mobile App Launch',
      status: 'planning',
      budget: 80000,
      progress: 0.2,
      owner: 'Bob Smith',
      department: 'Product',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      description: 'Native mobile app development',
    },
  },
  {
    id: 'p3',
    objectType: 'project',
    data: {
      name: 'Data Migration',
      status: 'completed',
      budget: 50000,
      progress: 1.0,
      owner: 'Carol White',
      department: 'Operations',
      startDate: '2023-09-01',
      endDate: '2024-01-31',
      description: 'Legacy system data migration',
    },
  },
]);

const handleCreate = () => {
  console.log('Create project');
};

const handleSearch = (query: string) => {
  console.log('Search:', query);
};

const handleRefresh = () => {
  console.log('Refresh projects');
};

const handleRowClick = (record: ObjectRecord) => {
  selectedRecord.value = record;
  showDetail.value = true;
};

const handleAction = (action: ObjectAction, record: ObjectRecord) => {
  console.log('Action:', action.id, 'on', record.id);
};

const handleDetailAction = (action: ObjectAction) => {
  console.log('Detail action:', action.id);
  showDetail.value = false;
};
</script>

<style scoped>
</style>
