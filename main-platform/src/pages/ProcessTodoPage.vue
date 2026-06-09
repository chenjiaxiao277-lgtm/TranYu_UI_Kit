<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Process Todos" subtitle="My Approvals" />
      </template>

      <tool-bar>
        <template #left>
          <tr-button type="secondary" size="small" @click="handleRefresh">⟳ Refresh</tr-button>
        </template>
      </tool-bar>

      <div class="process-todo">
        <div v-if="selectedProcess" class="process-todo__main">
          <div class="process-todo__timeline-section">
            <h3>Timeline</h3>
            <process-timeline :nodes="selectedProcess.allNodes" :current-node-id="selectedProcess.currentNode.id" />
          </div>

          <div class="process-todo__actions-section">
            <h3>Actions</h3>
            <process-action-bar :actions="selectedProcess.actions" @action="handleAction" />
          </div>

          <div class="process-todo__logs-section">
            <h3>Audit Trail</h3>
            <process-log-list :logs="selectedProcess.logs" />
          </div>
        </div>

        <div class="process-todo__sidebar">
          <h3>My Todos</h3>
          <div class="process-todo__todo-list">
            <process-task-card
              v-for="task in todoList"
              :key="task.id"
              :task="task"
              @action="handleTaskAction(task, $event)"
            />
          </div>
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton } from '@tranyu/ui';
import { ProcessTaskCard, ProcessTimeline, ProcessActionBar, ProcessLogList } from '@tranyu/business/process';
import type { ProcessInstance, ProcessTaskCard as TaskType, ProcessAction } from '@tranyu/business/process';

const todoList = ref<TaskType[]>([
  {
    id: 'task-1',
    processType: 'approval',
    processName: 'Platform v3.0 - Finance Review',
    objectId: 'proj-001',
    objectName: 'Platform v3.0',
    currentNode: 'Finance Review',
    assignee: 'alice',
    assigneeName: 'Alice Chen',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    isOverdue: false,
    actions: [
      { id: 'approve', name: 'approve', label: 'Approve', type: 'approve', buttonType: 'primary' },
      { id: 'reject', name: 'reject', label: 'Reject', type: 'reject', buttonType: 'danger' },
    ],
  },
  {
    id: 'task-2',
    processType: 'review',
    processName: 'API Design Review',
    objectId: 'dem-001',
    objectName: 'API Design Review',
    currentNode: 'Tech Review',
    assignee: 'bob',
    assigneeName: 'Bob Smith',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    isOverdue: false,
    actions: [
      { id: 'approve', name: 'approve', label: 'Approve', type: 'approve', buttonType: 'primary' },
    ],
  },
]);

const selectedProcess = ref<ProcessInstance | null>(null);

const handleRefresh = () => {
  console.log('Refresh');
};

const handleTaskAction = (task: TaskType, _action: ProcessAction) => {
  selectedProcess.value = {
    id: `proc-${task.id}`,
    processType: task.processType,
    processName: task.processName,
    objectName: task.objectName,
    currentNode: {
      id: 'node-1',
      name: task.currentNode,
      nodeName: task.currentNode,
      nodeType: 'approval',
      assigneeName: task.assigneeName,
      status: 'processing',
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: task.dueDate,
    },
    allNodes: [
      {
        id: 'node-0',
        name: 'Initiated',
        nodeName: 'Initiated',
        nodeType: 'start',
        status: 'completed',
        endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'node-1',
        name: task.currentNode,
        nodeName: task.currentNode,
        nodeType: 'approval',
        assigneeName: task.assigneeName,
        status: 'processing',
        startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: task.dueDate,
      },
      {
        id: 'node-2',
        name: 'Completed',
        nodeName: 'Completed',
        nodeType: 'end',
        status: 'pending',
      },
    ],
    status: 'processing',
    initiatorName: 'System',
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    logs: [
      {
        id: 'log-1',
        action: 'submit',
        actionName: 'Submitted',
        actor: 'system',
        actorName: 'System',
        nodeName: 'Initiated',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        result: 'success',
      },
    ],
    actions: task.actions,
  };
};

const handleAction = (_action: ProcessAction, _remark: string) => {
  console.log('Process action executed');
};
</script>

<style scoped>
.process-todo {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.process-todo__main {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.process-todo__timeline-section,
.process-todo__actions-section,
.process-todo__logs-section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.process-todo__timeline-section h3,
.process-todo__actions-section h3,
.process-todo__logs-section h3,
.process-todo__sidebar h3 {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  margin: 0;
}

.process-todo__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.process-todo__todo-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}
</style>
