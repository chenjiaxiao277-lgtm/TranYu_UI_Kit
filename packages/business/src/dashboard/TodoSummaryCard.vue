<template>
  <div class="todo-summary-card">
    <h3 class="todo-summary-card__title">Todo Summary</h3>

    <div class="todo-summary-card__items">
      <div
        v-for="item in items"
        :key="item.id"
        class="todo-summary-card__item"
        :class="`item--${item.type}`"
        @click="handleItemClick(item.id)"
      >
        <div class="todo-summary-card__item-header">
          <span class="todo-summary-card__item-type">{{ formatType(item.type) }}</span>
          <span class="todo-summary-card__item-count">{{ item.count }}</span>
        </div>

        <div v-if="item.percent" class="todo-summary-card__item-progress">
          <div class="todo-summary-card__progress-bar">
            <div
              class="todo-summary-card__progress-fill"
              :style="{ width: `${item.percent}%`, backgroundColor: item.color }"
            />
          </div>
          <span class="todo-summary-card__percent">{{ item.percent }}%</span>
        </div>

        <div v-if="item.description" class="todo-summary-card__item-description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoSummaryItem, DashboardEventPayload } from './types';

interface Props {
  items: TodoSummaryItem[];
}

defineProps<Props>();

const emit = defineEmits<{
  click: [payload: DashboardEventPayload];
}>();

const formatType = (type: string) => {
  const typeMap: Record<string, string> = {
    todo: 'To Do',
    inprogress: 'In Progress',
    completed: 'Completed',
    overdue: 'Overdue',
  };
  return typeMap[type] || type;
};

const handleItemClick = (itemId: string) => {
  emit('click', {
    id: itemId,
    action: 'click',
    timestamp: new Date().toISOString(),
  });
};
</script>

<style scoped>
.todo-summary-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
}

.todo-summary-card__title {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.todo-summary-card__items {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.todo-summary-card__item {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-sm);
  cursor: pointer;
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.todo-summary-card__item:hover {
  background-color: var(--tr-color-neutral100);
  transform: translateX(2px);
}

.item--todo {
  border-left: 3px solid var(--tr-color-neutral400);
}

.item--inprogress {
  border-left: 3px solid var(--tr-color-warning);
}

.item--completed {
  border-left: 3px solid var(--tr-color-success);
}

.item--overdue {
  border-left: 3px solid var(--tr-color-danger);
}

.todo-summary-card__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-summary-card__item-type {
  color: var(--tr-color-neutral700);
  font-size: 12px;
  font-weight: 500;
}

.todo-summary-card__item-count {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  font-weight: 600;
}

.todo-summary-card__item-progress {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-2);
}

.todo-summary-card__progress-bar {
  flex: 1;
  height: 6px;
  background-color: var(--tr-color-neutral200);
  border-radius: var(--tr-radius-full);
  overflow: hidden;
}

.todo-summary-card__progress-fill {
  height: 100%;
  transition: width var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.todo-summary-card__percent {
  color: var(--tr-color-neutral600);
  font-size: 11px;
  font-weight: 500;
  min-width: 30px;
  text-align: right;
}

.todo-summary-card__item-description {
  color: var(--tr-color-neutral600);
  font-size: 11px;
}
</style>
