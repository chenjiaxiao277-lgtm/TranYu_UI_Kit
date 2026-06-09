<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="对象管理" subtitle="项目、需求、风险" />
      </template>

      <tool-bar>
        <template #left>
          <select v-model="selectedObjectType" class="object-list__select" @change="handleObjectTypeChange">
            <option value="project">项目</option>
            <option value="demand">需求</option>
            <option value="risk">风险</option>
          </select>
          <tr-button type="primary" @click="handleCreate">+ 新建</tr-button>
        </template>
        <template #center>
          <input
            type="text"
            placeholder="搜索..."
            class="object-list__search"
            @input="handleSearch"
          >
        </template>
        <template #right>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ 刷新</tr-button>
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
  { id: 'name', name: 'name', label: '名称', type: 'text' },
  { id: 'status', name: 'status', label: '状态', type: 'status' },
  { id: 'budget', name: 'budget', label: '预算', type: 'amount' },
  { id: 'progress', name: 'progress', label: '进度', type: 'percent' },
  { id: 'owner', name: 'owner', label: '负责人', type: 'user' },
];

const demandFields: ObjectField[] = [
  { id: 'name', name: 'name', label: '名称', type: 'text' },
  { id: 'status', name: 'status', label: '状态', type: 'status' },
  { id: 'priority', name: 'priority', label: '优先级', type: 'select', options: [
    { label: '低', value: 'low' },
    { label: '中', value: 'medium' },
    { label: '高', value: 'high' },
  ]},
  { id: 'assignee', name: 'assignee', label: '责任人', type: 'user' },
];

const riskFields: ObjectField[] = [
  { id: 'name', name: 'name', label: '名称', type: 'text' },
  { id: 'status', name: 'status', label: '状态', type: 'status' },
  { id: 'level', name: 'level', label: '等级', type: 'select', options: [
    { label: '低', value: 'low' },
    { label: '中', value: 'medium' },
    { label: '高', value: 'high' },
  ]},
  { id: 'probability', name: 'probability', label: '概率', type: 'percent' },
];

const projectRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'project',
    data: { name: '平台 v3.0', status: 'active', budget: 50000, progress: 0.65, owner: '陈晓芸' },
    status: 'active',
  },
  {
    id: '2',
    objectType: 'project',
    data: { name: '移动应用发布', status: 'active', budget: 30000, progress: 0.45, owner: '白晓明' },
    status: 'active',
  },
  {
    id: '3',
    objectType: 'project',
    data: { name: '数据迁移', status: 'completed', budget: 20000, progress: 1.0, owner: '查理' },
    status: 'completed',
  },
];

const demandRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'demand',
    data: { name: 'API 设计评审', status: 'inprogress', priority: 'high', assignee: '大卫' },
    status: 'inprogress',
  },
  {
    id: '2',
    objectType: 'demand',
    data: { name: '数据库优化', status: 'todo', priority: 'medium', assignee: '伊芙' },
    status: 'todo',
  },
];

const riskRecords: ObjectRecord[] = [
  {
    id: '1',
    objectType: 'risk',
    data: { name: '进度延期', status: 'monitoring', level: 'high', probability: 0.7 },
    status: 'monitoring',
  },
  {
    id: '2',
    objectType: 'risk',
    data: { name: '资源短缺', status: 'identified', level: 'medium', probability: 0.5 },
    status: 'identified',
  },
];

const statusOptions: StatusOption[] = [
  { value: 'active', label: '活跃', color: 'var(--tr-color-success)' },
  { value: 'completed', label: '已完成', color: 'var(--tr-color-info)' },
  { value: 'inprogress', label: '进行中', color: 'var(--tr-color-warning)' },
  { value: 'todo', label: '待做', color: 'var(--tr-color-neutral500)' },
  { value: 'monitoring', label: '监控中', color: 'var(--tr-color-warning)' },
  { value: 'identified', label: '已识别', color: 'var(--tr-color-danger)' },
];

const tableActions: ObjectAction[] = [
  { id: 'edit', name: 'edit', label: '编辑', type: 'primary' },
  { id: 'delete', name: 'delete', label: '删除', type: 'danger' },
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
