<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Demand Review" subtitle="API Design Review" />
      </template>

      <div class="demand-review-demo">
        <div class="demand-review-demo__section">
          <h3>Process Timeline</h3>
          <process-timeline :nodes="demandInstance.allNodes" :current-node-id="demandInstance.currentNode.id" />
        </div>

        <div class="demand-review-demo__section">
          <h3>Current Task</h3>
          <process-task-card
            v-for="task in demandTasks"
            :key="task.id"
            :task="task"
            @action="handleTaskAction"
          />
        </div>

        <div class="demand-review-demo__section">
          <h3>Available Actions</h3>
          <process-action-bar :actions="demandInstance.actions" @action="handleAction" />
        </div>

        <div class="demand-review-demo__section">
          <h3>Audit Trail</h3>
          <process-log-list :logs="demandInstance.logs" />
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

const demandInstance = ref<ProcessInstance>({
  id: 'proc-002',
  processType: 'demand-review',
  processName: 'Demand Review',
  objectName: 'API Design Review',
  currentNode: {
    id: 'node-2',
    name: 'Tech Review',
    nodeName: 'Tech Review',
    nodeType: 'approval',
    assigneeName: 'Charlie Tech Lead',
    status: 'processing',
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  allNodes: [
    {
      id: 'node-1',
      name: 'Demand Creation',
      nodeName: 'Demand Creation',
      nodeType: 'start',
      assigneeName: 'Bob Analyst',
      status: 'completed',
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-2',
      name: 'Tech Review',
      nodeName: 'Tech Review',
      nodeType: 'approval',
      assigneeName: 'Charlie Tech Lead',
      status: 'processing',
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'node-3',
      name: 'QA Review',
      nodeName: 'QA Review',
      nodeType: 'approval',
      status: 'pending',
    },
    {
      id: 'node-4',
      name: 'Approved',
      nodeName: 'Approved',
      nodeType: 'end',
      status: 'pending',
    },
  ],
  status: 'processing',
  initiatorName: 'Bob Analyst',
  startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  priority: 'normal',
  actions: [
    {
      id: 'approve',
      name: 'approve',
      label: 'Approve',
      type: 'approve',
      buttonType: 'primary',
      requiresRemark: false,
      icon: '✓',
    },
    {
      id: 'reject',
      name: 'reject',
      label: 'Request Changes',
      type: 'reject',
      buttonType: 'secondary',
      requiresRemark: true,
      icon: '✎',
    },
    {
      id: 'addSign',
      name: 'addSign',
      label: 'Add Signer',
      type: 'addSign',
      buttonType: 'secondary',
      requiresRemark: false,
      icon: '+',
    },
  ],
  logs: [
    {
      id: 'log-1',
      action: 'submit',
      actionName: 'Submitted',
      actor: 'bob-analyst',
      actorName: 'Bob Analyst',
      nodeName: 'Demand Creation',
      remark: 'API design review for microservices',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
    },
    {
      id: 'log-2',
      action: 'approve',
      actionName: 'Approved',
      actor: 'bob-analyst',
      actorName: 'Bob Analyst',
      nodeName: 'Demand Creation',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      result: 'success',
      duration: 2880,
    },
  ],
});

const demandTasks = ref<TaskType[]>([
  {
    id: 'task-2',
    processType: 'demand-review',
    processName: 'API Design Review - Tech Review',
    objectId: 'demand-001',
    objectName: 'API Design Review',
    currentNode: 'Tech Review',
    assignee: 'charlie-lead',
    assigneeName: 'Charlie Tech Lead',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    isOverdue: false,
    actions: [
      { id: 'approve', name: 'approve', label: 'Approve', type: 'approve', buttonType: 'primary' },
      { id: 'reject', name: 'reject', label: 'Request Changes', type: 'reject', buttonType: 'secondary' },
    ],
  },
]);

const handleAction = (action: ProcessAction, remark: string) => {
  const log: ProcessLog = {
    id: `log-${Date.now()}`,
    action: action.type,
    actionName: action.label,
    actor: 'charlie-lead',
    actorName: 'Charlie Tech Lead',
    nodeName: demandInstance.value.currentNode.nodeName,
    remark,
    timestamp: new Date().toISOString(),
    result: 'success',
  };
  demandInstance.value.logs.push(log);
};

const handleTaskAction = (action: ProcessAction) => {
  handleAction(action, '');
};
</script>

<style scoped>
.demand-review-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.demand-review-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.demand-review-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
