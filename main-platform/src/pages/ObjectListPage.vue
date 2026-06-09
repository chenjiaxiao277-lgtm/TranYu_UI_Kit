<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Objects" subtitle="Projects, Demands, Risks" />
      </template>

      <tool-bar>
        <template #left>
          <select v-model="selectedObjectType" class="object-list__select" @change="handleObjectTypeChange">
            <option value="project">Projects</option>
            <option value="demand">Demands</option>
            <option value="risk">Risks</option>
          </select>
          <tr-button type="primary" @click="handleCreate">+ Create</tr-button>
        </template>
        <template #center>
          <input
            type="text"
            placeholder="Search..."
            class="object-list__search"
            @input="handleSearch"
          >
        </template>
        <template #right>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ Refresh</tr-button>
        </template>
      </tool-bar>

      <tr-card>
        <object-table
          :object-type="selectedObjectType"
          :fields="currentFields"
          :records="currentRecords"
          :status-field="statusField"
          :status-options="statusOptions"
          :actions="tableActions"
          @row-click="handleRowClick"
          @action="handleTableAction"
        />

        <object-detail-drawer
          :visible="drawerVisible"
          :record="selectedRecord"
          :fields="currentFields"
          :status-field="statusField"
          :status-options="statusOptions"
          :actions="tableActions"
          @close="drawerVisible = false"
          @action="handleDrawerAction"
        />
      </tr-card>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
import { ObjectTable, ObjectDetailDrawer } from '@tranyu/business/object';
import type { ObjectField, ObjectRecord, StatusOption, ObjectAction } from '@tranyu/business/object';

const selectedObjectType = ref('project');
const drawerVisible = ref(false);
const selectedRecord = ref<ObjectRecord | undefined>();

const projectFields: ObjectField[] = [
  { id: 'name', name: 'name', label: 'Name', type: 'text' },
  { id: 'status', name: 'status', label: 'Status', type: 'status' },
  { id: 'budget', name: 'budget', label: 'Budget', type: 'amount' },
  { id: 'progress', name: 'progress', label: 'Progress', type: 'percent' },
  { id: 'owner', name: 'owner', label: 'Owner', type: 'user' },
];

const demandFields: ObjectField[] = [
  { id: 'name', name: 'name', label: 'Name', type: 'text' },
  { id: 'status', name: 'status', label: 'Status', type: 'status' },
  { id: 'priority', name: 'priority', label: 'Priority', type: 'select', options: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ]},
  { id: 'assignee', name: 'assignee', label: 'Assignee', type: 'user' },
];

const riskFields: ObjectField[] = [
  { id: 'name', name: 'name', label: 'Name', type: 'text' },
  { id: 'status', name: 'status', label: 'Status', type: 'status' },
  { id: 'level', name: 'level', label: 'Level', type: 'select', options: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ]},
  { id: 'probability', name: 'probability', label: 'Probability', type: 'percent' },
];

const projectRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'project',
    data: { name: 'Platform v3.0', status: 'active', budget: 50000, progress: 0.65, owner: 'Alice' },
    status: 'active',
  },
  {
    id: '2',
    objectType: 'project',
    data: { name: 'Mobile App Launch', status: 'active', budget: 30000, progress: 0.45, owner: 'Bob' },
    status: 'active',
  },
  {
    id: '3',
    objectType: 'project',
    data: { name: 'Data Migration', status: 'completed', budget: 20000, progress: 1.0, owner: 'Charlie' },
    status: 'completed',
  },
];

const demandRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'demand',
    data: { name: 'API Design Review', status: 'inprogress', priority: 'high', assignee: 'David' },
    status: 'inprogress',
  },
  {
    id: '2',
    objectType: 'demand',
    data: { name: 'Database Optimization', status: 'todo', priority: 'medium', assignee: 'Eve' },
    status: 'todo',
  },
];

const riskRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'risk',
    data: { name: 'Schedule Delay', status: 'monitoring', level: 'high', probability: 0.7 },
    status: 'monitoring',
  },
  {
    id: '2',
    objectType: 'risk',
    data: { name: 'Resource Shortage', status: 'identified', level: 'medium', probability: 0.5 },
    status: 'identified',
  },
];

const statusOptions: StatusOption[] = [
  { value: 'active', label: 'Active', color: 'var(--tr-color-success)' },
  { value: 'completed', label: 'Completed', color: 'var(--tr-color-info)' },
  { value: 'inprogress', label: 'In Progress', color: 'var(--tr-color-warning)' },
  { value: 'todo', label: 'To Do', color: 'var(--tr-color-neutral500)' },
  { value: 'monitoring', label: 'Monitoring', color: 'var(--tr-color-warning)' },
  { value: 'identified', label: 'Identified', color: 'var(--tr-color-danger)' },
];

const tableActions: ObjectAction[] = [
  { id: 'edit', name: 'edit', label: 'Edit', type: 'primary' },
  { id: 'delete', name: 'delete', label: 'Delete', type: 'danger' },
];

const currentFields = computed(() => {
  switch (selectedObjectType.value) {
    case 'demand':
      return demandFields;
    case 'risk':
      return riskFields;
    default:
      return projectFields;
  }
});

const currentRecords = computed(() => {
  switch (selectedObjectType.value) {
    case 'demand':
      return demandRecords;
    case 'risk':
      return riskRecords;
    default:
      return projectRecords;
  }
});

const statusField = 'status';

const handleObjectTypeChange = () => {
  selectedRecord.value = undefined;
};

const handleCreate = () => {
  console.log('Create', selectedObjectType.value);
};

const handleSearch = (event: Event) => {
  console.log('Search:', (event.target as HTMLInputElement).value);
};

const handleRefresh = () => {
  console.log('Refresh');
};

const handleRowClick = (record: ObjectRecord) => {
  selectedRecord.value = record;
  drawerVisible.value = true;
};

const handleTableAction = (action: ObjectAction, record: ObjectRecord) => {
  console.log('Action:', action.id, 'Record:', record.id);
};

const handleDrawerAction = (action: ObjectAction) => {
  console.log('Drawer action:', action.id);
  drawerVisible.value = false;
};
</script>

<style scoped>
.object-list__select {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  background-color: var(--tr-color-neutral0);
  color: var(--tr-color-neutral900);
  font-size: 13px;
  cursor: pointer;
}

.object-list__search {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-size: 13px;
  width: 200px;
}
</style>
