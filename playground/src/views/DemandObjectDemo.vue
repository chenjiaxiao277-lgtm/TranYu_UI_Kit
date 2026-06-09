<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header title="Demands" subtitle="Requirement/Demand object list - Same components as Projects" />
      </template>

      <object-toolbar object-type="demand" @create="handleCreate" @refresh="handleRefresh" @search="handleSearch" />

      <object-table
        object-type="demand"
        :fields="demandFields"
        :records="demands"
        status-field="status"
        :status-options="statusOptions"
        :actions="actions"
        @row-click="handleRowClick"
        @action="handleAction"
      />

      <object-detail-drawer
        :visible="showDetail"
        :record="selectedRecord"
        :fields="demandFields"
        status-field="status"
        :status-options="statusOptions"
        :actions="actions"
        @close="showDetail = false"
      />
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, TrPageHeader } from '@tranyu/ui';
import { ObjectToolbar, ObjectTable, ObjectDetailDrawer, type ObjectField, type ObjectRecord, type ObjectAction, type StatusOption } from '@tranyu/business';

const showSidebar = ref(true);
const showDetail = ref(false);
const selectedRecord = ref<ObjectRecord>();

const demandFields: ObjectField[] = [
  { id: 'name', label: 'Demand Title', type: 'text', required: true },
  { id: 'status', label: 'Status', type: 'status' },
  { id: 'priority', label: 'Priority', type: 'select', options: [{ label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }] },
  { id: 'assignee', label: 'Assignee', type: 'user' },
  { id: 'dueDate', label: 'Due Date', type: 'date' },
  { id: 'estimatedEffort', label: 'Effort (hours)', type: 'number' },
  { id: 'description', label: 'Description', type: 'textarea' },
];

const statusOptions: StatusOption[] = [
  { value: 'backlog', label: 'Backlog', color: 'var(--tr-color-neutral400)' },
  { value: 'todo', label: 'To Do', color: 'var(--tr-color-info)' },
  { value: 'inprogress', label: 'In Progress', color: 'var(--tr-color-warning)' },
  { value: 'done', label: 'Done', color: 'var(--tr-color-success)' },
];

const actions: ObjectAction[] = [
  { id: 'assign', label: 'Assign', type: 'primary' },
  { id: 'delete', label: 'Delete', type: 'danger' },
];

const demands = ref<ObjectRecord[]>([
  {
    id: 'd1',
    objectType: 'demand',
    data: {
      name: 'API Design Review',
      status: 'inprogress',
      priority: 'high',
      assignee: 'David Lee',
      dueDate: '2024-02-15',
      estimatedEffort: 16,
      description: 'Review and finalize API specifications',
    },
  },
  {
    id: 'd2',
    objectType: 'demand',
    data: {
      name: 'Database Optimization',
      status: 'todo',
      priority: 'medium',
      assignee: 'Emma Wilson',
      dueDate: '2024-02-28',
      estimatedEffort: 24,
      description: 'Index and query optimization',
    },
  },
  {
    id: 'd3',
    objectType: 'demand',
    data: {
      name: 'Testing Framework Setup',
      status: 'done',
      priority: 'high',
      assignee: 'Frank Brown',
      dueDate: '2024-02-10',
      estimatedEffort: 8,
      description: 'Configure unit and integration tests',
    },
  },
]);

const handleCreate = () => console.log('Create demand');
const handleSearch = (query: string) => console.log('Search:', query);
const handleRefresh = () => console.log('Refresh demands');
const handleRowClick = (record: ObjectRecord) => {
  selectedRecord.value = record;
  showDetail.value = true;
};
const handleAction = (action: ObjectAction, record: ObjectRecord) => {
  console.log('Action:', action.id, 'on', record.id);
};
</script>

<style scoped>
</style>
