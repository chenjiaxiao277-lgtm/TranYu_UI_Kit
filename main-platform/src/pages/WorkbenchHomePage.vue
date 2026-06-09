<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Workbench" subtitle="My Dashboard" />
      </template>

      <tool-bar>
        <template #left>
          <tr-button type="primary" @click="handleRefresh">⟳ Refresh</tr-button>
        </template>
      </tool-bar>

      <div class="workbench-home">
        <div class="workbench-home__section">
          <h3>📋 My Tasks</h3>
          <div class="workbench-home__tasks">
            <process-task-card
              v-for="task in myTasks"
              :key="task.id"
              :task="task"
              @action="handleTaskAction"
            />
          </div>
        </div>

        <div class="workbench-home__row">
          <div class="workbench-home__column">
            <h3>🎯 My Projects</h3>
            <tr-card>
              <div class="workbench-home__projects-list">
                <div v-for="project in myProjects" :key="project.id" class="workbench-home__project-item">
                  <div class="workbench-home__project-name">{{ project.name }}</div>
                  <object-status-tag :status="project.status" />
                </div>
              </div>
            </tr-card>
          </div>

          <div class="workbench-home__column">
            <h3>⚠️ Risk Warnings</h3>
            <tr-card>
              <div class="workbench-home__risks-list">
                <div v-for="risk in riskWarnings" :key="risk.id" class="workbench-home__risk-item">
                  <div class="workbench-home__risk-header">
                    <span class="workbench-home__risk-name">{{ risk.name }}</span>
                    <span class="workbench-home__risk-level" :class="`risk--${risk.level}`">{{ risk.level }}</span>
                  </div>
                  <div class="workbench-home__risk-status">{{ risk.status }}</div>
                </div>
              </div>
            </tr-card>
          </div>
        </div>

        <div class="workbench-home__section">
          <h3>💡 AI Suggestions</h3>
          <ai-suggestion-panel
            v-if="aiSuggestion"
            :suggestion="aiSuggestion"
            @accept="handleAcceptSuggestion"
            @ignore="handleIgnoreSuggestion"
            @regenerate="handleRegenerateSuggestion"
          />
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
import { ProcessTaskCard } from '@tranyu/business/process';
import { ObjectStatusTag } from '@tranyu/business/object';
import { AiSuggestionPanel } from '@tranyu/business/ai';
import type { ProcessTaskCard as TaskType, AiSuggestion } from '@tranyu/business';

const myTasks = ref<TaskType[]>([
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
    ],
  },
]);

const myProjects = ref([
  { id: 1, name: 'Platform v3.0', status: 'active' },
  { id: 2, name: 'Mobile App Launch', status: 'active' },
  { id: 3, name: 'Data Migration', status: 'completed' },
]);

const riskWarnings = ref([
  { id: 1, name: 'Schedule Delay', level: 'high', status: 'monitoring' },
  { id: 2, name: 'Resource Shortage', level: 'medium', status: 'identified' },
]);

const aiSuggestion = ref<AiSuggestion>({
  id: 'sugg-1',
  title: 'Optimize Approval Flow',
  content: 'Consider implementing parallel approval for better efficiency. Your average approval time is 12 days.',
  rationale: 'Analysis of 50 recent approvals shows sequential flow is the bottleneck.',
  confidence: 0.85,
  riskLevel: 'low',
  references: [
    {
      id: 'ref-1',
      title: 'Best Practices',
      source: 'Internal Wiki',
      relevance: 0.9,
    },
  ],
  modelName: 'GPT-4',
  timestamp: new Date().toISOString(),
});

const handleRefresh = () => {
  console.log('Refresh clicked');
};

const handleTaskAction = (action: unknown) => {
  console.log('Task action:', action);
};

const handleAcceptSuggestion = () => {
  aiSuggestion.value = null;
};

const handleIgnoreSuggestion = () => {
  aiSuggestion.value = null;
};

const handleRegenerateSuggestion = () => {
  console.log('Regenerate suggestion');
};
</script>

<style scoped>
.workbench-home {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.workbench-home__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.workbench-home__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}

.workbench-home__tasks {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.workbench-home__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tr-spacing-6);
}

.workbench-home__column h3 {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  margin: 0 0 var(--tr-spacing-3) 0;
}

.workbench-home__projects-list,
.workbench-home__risks-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.workbench-home__project-item,
.workbench-home__risk-item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
}

.workbench-home__project-name {
  color: var(--tr-color-neutral900);
  font-weight: 500;
  margin-bottom: var(--tr-spacing-2);
}

.workbench-home__risk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--tr-spacing-2);
}

.workbench-home__risk-name {
  color: var(--tr-color-neutral900);
  font-weight: 500;
}

.workbench-home__risk-level {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  border-radius: var(--tr-radius-sm);
  font-size: 11px;
  font-weight: 500;
  color: var(--tr-color-neutral0);
}

.risk--high {
  background-color: var(--tr-color-danger);
}

.risk--medium {
  background-color: var(--tr-color-warning);
}

.risk--low {
  background-color: var(--tr-color-success);
}

.workbench-home__risk-status {
  color: var(--tr-color-neutral600);
  font-size: 12px;
}
</style>
