<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header title="Risks" subtitle="Risk object list - Reusing ObjectTable, ObjectDetailDrawer" />
      </template>

      <object-toolbar object-type="risk" @create="handleCreate" @refresh="handleRefresh" @search="handleSearch" />

      <object-table
        object-type="risk"
        :fields="riskFields"
        :records="risks"
        status-field="status"
        :status-options="statusOptions"
        :actions="actions"
        @row-click="handleRowClick"
        @action="handleAction"
      />

      <object-detail-drawer
        :visible="showDetail"
        :record="selectedRecord"
        :fields="riskFields"
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

const riskFields: ObjectField[] = [
  { id: 'name', label: 'Risk Name', type: 'text', required: true },
  { id: 'status', label: 'Status', type: 'status' },
  { id: 'level', label: 'Level', type: 'select', options: [{ label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }] },
  { id: 'probability', label: 'Probability', type: 'percent' },
  { id: 'impact', label: 'Impact', type: 'select', options: [{ label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }] },
  { id: 'owner', label: 'Owner', type: 'user' },
  { id: 'mitigation', label: 'Mitigation Plan', type: 'textarea' },
];

const statusOptions: StatusOption[] = [
  { value: 'identified', label: 'Identified', color: 'var(--tr-color-warning)' },
  { value: 'monitoring', label: 'Monitoring', color: 'var(--tr-color-info)' },
  { value: 'mitigated', label: 'Mitigated', color: 'var(--tr-color-success)' },
  { value: 'closed', label: 'Closed', color: 'var(--tr-color-neutral500)' },
];

const actions: ObjectAction[] = [
  { id: 'mitigate', label: 'Update Mitigation', type: 'primary' },
  { id: 'close', label: 'Close Risk', type: 'secondary' },
  { id: 'escalate', label: 'Escalate', type: 'danger' },
];

const risks = ref<ObjectRecord[]>([
  {
    id: 'r1',
    objectType: 'risk',
    data: {
      name: 'Schedule Delay',
      status: 'monitoring',
      level: 'high',
      probability: 0.4,
      impact: 'high',
      owner: 'George Kim',
      mitigation: 'Add buffer time, increase resources',
    },
  },
  {
    id: 'r2',
    objectType: 'risk',
    data: {
      name: 'Resource Shortage',
      status: 'identified',
      level: 'critical',
      probability: 0.6,
      impact: 'high',
      owner: 'Helen Zhang',
      mitigation: 'Hire contractors, redistribute tasks',
    },
  },
  {
    id: 'r3',
    objectType: 'risk',
    data: {
      name: 'Technical Debt',
      status: 'mitigated',
      level: 'medium',
      probability: 0.3,
      impact: 'medium',
      owner: 'Ivan Petrov',
      mitigation: 'Code review and refactoring plan',
    },
  },
]);

const handleCreate = () => console.log('Create risk');
const handleSearch = (query: string) => console.log('Search:', query);
const handleRefresh = () => console.log('Refresh risks');
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
