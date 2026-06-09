<template>
  <div
    class="process-node-card"
    :class="[`process-node-card--${node.status}`, { 'process-node-card--active': isActive }]"
    @click="$emit('nodeClick', node.id)"
  >
    <div class="process-node-card__icon">
      {{ getNodeIcon(node) }}
    </div>
    <div class="process-node-card__content">
      <div class="process-node-card__name">{{ node.name }}</div>
      <div v-if="node.assigneeName" class="process-node-card__assignee">
        👤 {{ node.assigneeName }}
      </div>
      <div v-if="node.startTime" class="process-node-card__time">
        {{ formatTime(node.startTime) }}
      </div>
    </div>
    <div v-if="node.isOverdue" class="process-node-card__overdue">⚠</div>
  </div>
</template>

<script setup lang="ts">
import type { ProcessNode } from './types';

interface Props {
  node: ProcessNode;
  isActive?: boolean;
}

interface Emits {
  (e: 'nodeClick', nodeId: string): void;
}

withDefaults(defineProps<Props>(), {
  isActive: false,
});

defineEmits<Emits>();

const getNodeIcon = (node: ProcessNode) => {
  const icons: Record<string, string> = {
    completed: '✓',
    processing: '→',
    pending: '◯',
    rejected: '✕',
    returned: '↶',
    overdue: '⚠',
  };
  return icons[node.status] || '◯';
};

const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

<style scoped>
.process-node-card {
  display: flex;
  gap: var(--tr-spacing-3);
  align-items: flex-start;
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.process-node-card:hover {
  background-color: var(--tr-color-neutral100);
  border-color: var(--tr-color-primary);
}

.process-node-card--active {
  background-color: var(--tr-color-primary);
  border-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.process-node-card--completed {
  border-left: 3px solid var(--tr-color-success);
}

.process-node-card--processing {
  border-left: 3px solid var(--tr-color-primary);
}

.process-node-card--pending {
  border-left: 3px solid var(--tr-color-neutral300);
}

.process-node-card--rejected {
  border-left: 3px solid var(--tr-color-danger);
}

.process-node-card--returned {
  border-left: 3px solid var(--tr-color-warning);
}

.process-node-card--overdue {
  border-left: 3px solid var(--tr-color-danger);
}

.process-node-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--tr-radius-sm);
  background-color: rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  font-weight: bold;
}

.process-node-card__content {
  flex: 1;
}

.process-node-card__name {
  font-weight: 500;
  font-size: 14px;
}

.process-node-card__assignee {
  font-size: 12px;
  opacity: 0.7;
  margin-top: var(--tr-spacing-1);
}

.process-node-card__time {
  font-size: 11px;
  opacity: 0.6;
  margin-top: var(--tr-spacing-1);
}

.process-node-card__overdue {
  font-size: 18px;
  color: var(--tr-color-danger);
}
</style>
