<template>
  <div class="process-timeline">
    <div v-for="(node, index) in nodes" :key="node.id" class="process-timeline__item">
      <div class="process-timeline__node" :class="getNodeClass(node)">
        <div class="process-timeline__node-icon">
          {{ getNodeIcon(node) }}
        </div>
        <div class="process-timeline__node-content">
          <div class="process-timeline__node-name">{{ node.name }}</div>
          <div v-if="node.assigneeName" class="process-timeline__node-assignee">
            👤 {{ node.assigneeName }}
          </div>
          <div v-if="node.startTime" class="process-timeline__node-time">
            {{ formatTime(node.startTime) }}
          </div>
          <div v-if="node.remark" class="process-timeline__node-remark">
            {{ node.remark }}
          </div>
        </div>
      </div>
      <div v-if="index < nodes.length - 1" class="process-timeline__connector" :class="getConnectorClass(nodes[index + 1])" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProcessNode } from './types';

interface Props {
  nodes: ProcessNode[];
  currentNodeId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currentNodeId: undefined,
});

const getNodeClass = (node: ProcessNode) => {
  const classes = ['process-timeline__node--base', `process-timeline__node--${node.status}`];
  if (node.id === props.currentNodeId) classes.push('process-timeline__node--current');
  if (node.isOverdue) classes.push('process-timeline__node--overdue');
  return classes;
};

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

const getConnectorClass = (nextNode: ProcessNode) => {
  if (nextNode.status === 'completed') return 'process-timeline__connector--completed';
  if (nextNode.status === 'rejected' || nextNode.status === 'returned') return 'process-timeline__connector--rejected';
  return 'process-timeline__connector--pending';
};

const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.process-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.process-timeline__item {
  position: relative;
  display: flex;
  flex-direction: column;
}

.process-timeline__node {
  display: flex;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border: 1px solid var(--tr-color-neutral200);
  transition: all var(--tr-motion-normal);
}

.process-timeline__node--base {
  background-color: var(--tr-color-neutral50);
  border-color: var(--tr-color-neutral200);
}

.process-timeline__node--completed {
  background-color: var(--tr-color-success);
  border-color: var(--tr-color-success);
  color: var(--tr-color-neutral0);
}

.process-timeline__node--processing {
  background-color: var(--tr-color-primary);
  border-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.process-timeline__node--pending {
  background-color: var(--tr-color-neutral100);
  border-color: var(--tr-color-neutral300);
}

.process-timeline__node--rejected {
  background-color: var(--tr-color-danger);
  border-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.process-timeline__node--returned {
  background-color: var(--tr-color-warning);
  border-color: var(--tr-color-warning);
  color: var(--tr-color-neutral0);
}

.process-timeline__node--overdue {
  background-color: var(--tr-color-danger);
  border-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.process-timeline__node--current {
  box-shadow: 0 0 0 3px var(--tr-color-primary);
}

.process-timeline__node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--tr-radius-md);
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

.process-timeline__node-content {
  flex: 1;
}

.process-timeline__node-name {
  font-weight: 500;
  margin-bottom: var(--tr-spacing-2);
}

.process-timeline__node-assignee {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: var(--tr-spacing-1);
}

.process-timeline__node-time {
  font-size: 11px;
  opacity: 0.7;
  margin-bottom: var(--tr-spacing-1);
}

.process-timeline__node-remark {
  font-size: 12px;
  opacity: 0.8;
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: var(--tr-spacing-2);
}

.process-timeline__connector {
  align-self: flex-start;
  width: 2px;
  height: var(--tr-spacing-6);
  margin-left: 16px;
  background-color: var(--tr-color-neutral300);
}

.process-timeline__connector--completed {
  background-color: var(--tr-color-success);
}

.process-timeline__connector--rejected {
  background-color: var(--tr-color-danger);
}

.process-timeline__connector--pending {
  background-color: var(--tr-color-neutral300);
}
</style>
