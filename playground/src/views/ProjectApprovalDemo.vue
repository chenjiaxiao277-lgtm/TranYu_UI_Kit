<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Project Approval" subtitle="Platform v3.0" />
      </template>

      <div class="project-approval-demo">
        <div class="project-approval-demo__section">
          <h3>Process Timeline</h3>
          <process-timeline :nodes="projectInstance.allNodes" :current-node-id="projectInstance.currentNode.id" />
        </div>

        <div class="project-approval-demo__section">
          <h3>Current Task</h3>
          <process-task-card
            v-for="task in projectTasks"
            :key="task.id"
            :task="task"
            @action="handleTaskAction"
          />
        </div>

        <div class="project-approval-demo__section">
          <h3>Available Actions</h3>
          <process-action-bar :actions="projectInstance.actions" @action="handleAction" />
        </div>

        <div class="project-approval-demo__section">
          <h3>Audit Trail</h3>
          <process-log-list :logs="projectInstance.logs" />
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, TrPageHeader } from '@tranyu/ui';
import {
  ProcessTimeline,
  ProcessTaskCard,
  ProcessActionBar,
  ProcessLogList,
} from '@tranyu/business/process';
import type { ProcessInstance, ProcessTaskCard as TaskType, ProcessAction, ProcessLog } from '@tranyu/business/process';

const projectInstance = ref<ProcessInstance>({
  id: 'proc-001',
  processType: 'project-initiation',
  processName: 'Project Initiation',
  objectName: 'Platform v3.0',
  currentNode: {
    id: 'node-2',
    name: 'Finance Review',
    nodeName: 'Finance Review',
    nodeType: 'approval',
    assigneeName: 'David Finance',
    status: 'processing',
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  allNodes: [
    {
      id: 'node-1',
      name: 'Initiation',
      nodeName: 'Project Initiation',
      nodeType: 'start',
      assigneeName: 'Alice PM',
      status: 'completed',
      startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-2',
      name: 'Finance Review',
      nodeName: 'Finance Review',
      nodeType: 'approval',
      assigneeName: 'David Finance',
      status: 'processing',
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-3',
      name: 'Board Approval',
      nodeName: 'Board Approval',
      nodeType: 'approval',
      status: 'pending',
    },
    {
      id: 'node-4',
      name: 'Project Setup',
      nodeName: 'Project Setup',
      nodeType: 'sequential',
      status: 'pending',
    },
  ],
  status: 'processing',
  initiatorName: 'Alice PM',
  startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  priority: 'high',
  actions: [
    {
      id: 'approve',
      name: 'approve',
      label: 'Approve',
      type: 'approve',
      buttonType: 'primary',
      requiresRemark: true,
      icon: '✓',
    },
    {
      id: 'reject',
      name: 'reject',
      label: 'Reject',
      type: 'reject',
      buttonType: 'danger',
      requiresRemark: true,
      requiresConfirm: true,
      confirmMessage: 'Are you sure you want to reject this project?',
      icon: '✕',
    },
    {
      id: 'return',
      name: 'return',
      label: 'Return to Initiator',
      type: 'return',
      buttonType: 'secondary',
      requiresRemark: true,
      icon: '↶',
    },
  ],
  logs: [
    {
      id: 'log-1',
      action: 'submit',
      actionName: 'Submitted',
      actor: 'Alice PM',
      actorName: 'Alice PM',
      nodeName: 'Project Initiation',
      remark: 'New platform initiative for v3.0',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
    },
    {
      id: 'log-2',
      action: 'approve',
      actionName: 'Approved',
      actor: 'alice-pm',
      actorName: 'Alice PM',
      nodeName: 'Project Initiation',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
      duration: 1440,
    },
  ],
});

const projectTasks = ref<TaskType[]>([
  {
    id: 'task-1',
    processType: 'project-initiation',
    processName: 'Platform v3.0 - Finance Review',
    objectId: 'proj-001',
    objectName: 'Platform v3.0',
    currentNode: 'Finance Review',
    assignee: 'david-finance',
    assigneeName: 'David Finance',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    isOverdue: false,
    actions: [
      { id: 'approve', name: 'approve', label: 'Approve', type: 'approve', buttonType: 'primary' },
      { id: 'reject', name: 'reject', label: 'Reject', type: 'reject', buttonType: 'danger' },
    ],
  },
]);

const handleAction = (action: ProcessAction, remark: string) => {
  const log: ProcessLog = {
    id: `log-${Date.now()}`,
    action: action.type,
    actionName: action.label,
    actor: 'david-finance',
    actorName: 'David Finance',
    nodeName: projectInstance.value.currentNode.nodeName,
    remark,
    timestamp: new Date().toISOString(),
    result: 'success',
  };
  projectInstance.value.logs.push(log);
};

const handleTaskAction = (action: ProcessAction) => {
  handleAction(action, '');
};
</script>

<style scoped>
.project-approval-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.project-approval-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.project-approval-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
