<template>
  <tr-card class="process-task-card">
    <div class="process-task-card__header">
      <div class="process-task-card__title">{{ task.processName }}</div>
      <process-status-tag :status="task.status" :is-overdue="task.isOverdue" />
    </div>
    <div class="process-task-card__body">
      <div class="process-task-card__item">
        <span class="process-task-card__label">Object:</span>
        <span class="process-task-card__value">{{ task.objectName }}</span>
      </div>
      <div class="process-task-card__item">
        <span class="process-task-card__label">Current Node:</span>
        <span class="process-task-card__value">{{ task.currentNode }}</span>
      </div>
      <div class="process-task-card__item">
        <span class="process-task-card__label">Assignee:</span>
        <span class="process-task-card__value">👤 {{ task.assigneeName }}</span>
      </div>
      <div class="process-task-card__item">
        <span class="process-task-card__label">Due Date:</span>
        <span class="process-task-card__value" :class="{ 'process-task-card__overdue': task.isOverdue }">
          {{ formatDate(task.dueDate) }}
        </span>
      </div>
    </div>
    <div class="process-task-card__actions">
      <tr-button
        v-for="action in task.actions"
        :key="action.id"
        :type="action.buttonType || 'secondary'"
        size="small"
        @click="$emit('action', action)"
      >
        {{ action.label }}
      </tr-button>
    </div>
  </tr-card>
</template>

<script setup lang="ts">
import { TrCard, TrButton } from '@tranyu/ui';
import ProcessStatusTag from './ProcessStatusTag.vue';
import type { ProcessTaskCard as TaskType, ProcessAction } from './types';

interface Props {
  task: TaskType;
}

interface Emits {
  (e: 'action', action: ProcessAction): void;
}

withDefaults(defineProps<Props>(), {});
defineEmits<Emits>();

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.process-task-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.process-task-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--tr-spacing-3);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.process-task-card__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.process-task-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.process-task-card__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.process-task-card__label {
  color: var(--tr-color-neutral600);
  font-weight: 500;
}

.process-task-card__value {
  color: var(--tr-color-neutral900);
  text-align: right;
  flex: 1;
  margin-left: var(--tr-spacing-4);
}

.process-task-card__overdue {
  color: var(--tr-color-danger);
  font-weight: 600;
}

.process-task-card__actions {
  display: flex;
  gap: var(--tr-spacing-2);
  padding-top: var(--tr-spacing-3);
  border-top: 1px solid var(--tr-color-neutral200);
  flex-wrap: wrap;
}
</style>
