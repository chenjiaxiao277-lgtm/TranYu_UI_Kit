<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Risk Closure" subtitle="Schedule Delay" />
      </template>

      <div class="risk-close-demo">
        <div class="risk-close-demo__section">
          <h3>Process Timeline</h3>
          <process-timeline :nodes="riskInstance.allNodes" :current-node-id="riskInstance.currentNode.id" />
        </div>

        <div class="risk-close-demo__section">
          <h3>Current Task</h3>
          <process-task-card
            v-for="task in riskTasks"
            :key="task.id"
            :task="task"
            @action="handleTaskAction"
          />
        </div>

        <div class="risk-close-demo__section">
          <h3>Available Actions</h3>
          <process-action-bar :actions="riskInstance.actions" @action="handleAction" />
        </div>

        <div class="risk-close-demo__section">
          <h3>Audit Trail</h3>
          <process-log-list :logs="riskInstance.logs" />
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

const riskInstance = ref<ProcessInstance>({
  id: 'proc-003',
  processType: 'risk-closure',
  processName: 'Risk Closure',
  objectName: 'Schedule Delay',
  currentNode: {
    id: 'node-3',
    name: 'Risk Owner Confirmation',
    nodeName: 'Risk Owner Confirmation',
    nodeType: 'approval',
    assigneeName: 'Eve Risk Manager',
    status: 'processing',
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  allNodes: [
    {
      id: 'node-1',
      name: 'Mitigation Completion',
      nodeName: 'Mitigation Completion',
      nodeType: 'start',
      assigneeName: 'Frank PM',
      status: 'completed',
      startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-2',
      name: 'QA Verification',
      nodeName: 'QA Verification',
      nodeType: 'approval',
      assigneeName: 'Grace QA',
      status: 'completed',
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-3',
      name: 'Risk Owner Confirmation',
      nodeName: 'Risk Owner Confirmation',
      nodeType: 'approval',
      assigneeName: 'Eve Risk Manager',
      status: 'processing',
      startTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-4',
      name: 'Closed',
      nodeName: 'Risk Closure',
      nodeType: 'end',
      status: 'pending',
    },
  ],
  status: 'processing',
  initiatorName: 'Frank PM',
  startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  priority: 'high',
  actions: [
    {
      id: 'approve',
      name: 'approve',
      label: 'Confirm Closed',
      type: 'approve',
      buttonType: 'primary',
      requiresRemark: false,
      icon: '✓',
    },
    {
      id: 'reject',
      name: 'reject',
      label: 'Reopen Risk',
      type: 'reject',
      buttonType: 'danger',
      requiresRemark: true,
      requiresConfirm: true,
      confirmMessage: 'Are you sure you want to reopen this risk?',
      icon: '↻',
    },
    {
      id: 'forcePass',
      name: 'forcePass',
      label: 'Force Close',
      type: 'forcePass',
      buttonType: 'danger',
      requiresRemark: true,
      disabled: true,
      disabledReason: 'Only available to risk committee',
      icon: '⚡',
    },
  ],
  logs: [
    {
      id: 'log-1',
      action: 'submit',
      actionName: 'Closure Submitted',
      actor: 'frank-pm',
      actorName: 'Frank PM',
      nodeName: 'Mitigation Completion',
      remark: 'Schedule recovered through reallocation',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
    },
    {
      id: 'log-2',
      action: 'approve',
      actionName: 'Verified',
      actor: 'grace-qa',
      actorName: 'Grace QA',
      nodeName: 'QA Verification',
      remark: 'All tests passing, schedule met',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
      duration: 86400,
    },
  ],
});

const riskTasks = ref<TaskType[]>([
  {
    id: 'task-3',
    processType: 'risk-closure',
    processName: 'Schedule Delay - Risk Owner Confirmation',
    objectId: 'risk-001',
    objectName: 'Schedule Delay',
    currentNode: 'Risk Owner Confirmation',
    assignee: 'eve-risk',
    assigneeName: 'Eve Risk Manager',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    isOverdue: false,
    actions: [
      { id: 'approve', name: 'approve', label: 'Confirm Closed', type: 'approve', buttonType: 'primary' },
      { id: 'reject', name: 'reject', label: 'Reopen Risk', type: 'reject', buttonType: 'danger' },
    ],
  },
]);

const handleAction = (action: ProcessAction, remark: string) => {
  const log: ProcessLog = {
    id: `log-${Date.now()}`,
    action: action.type,
    actionName: action.label,
    actor: 'eve-risk',
    actorName: 'Eve Risk Manager',
    nodeName: riskInstance.value.currentNode.nodeName,
    remark,
    timestamp: new Date().toISOString(),
    result: 'success',
  };
  riskInstance.value.logs.push(log);
};

const handleTaskAction = (action: ProcessAction) => {
  handleAction(action, '');
};
</script>

<style scoped>
.risk-close-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.risk-close-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.risk-close-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
