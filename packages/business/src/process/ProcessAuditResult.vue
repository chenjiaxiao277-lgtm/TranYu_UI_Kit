<template>
  <div class="process-audit-result" :class="`process-audit-result--${log.result || 'success'}`">
    <div class="process-audit-result__header">
      <div class="process-audit-result__action">
        <span class="process-audit-result__action-icon">{{ getActionIcon(log.action) }}</span>
        <span class="process-audit-result__action-name">{{ log.actionName }}</span>
      </div>
      <div class="process-audit-result__time">{{ formatTime(log.timestamp) }}</div>
    </div>
    <div class="process-audit-result__meta">
      <span class="process-audit-result__actor">👤 {{ log.actorName }}</span>
      <span class="process-audit-result__node">📍 {{ log.nodeName }}</span>
      <span v-if="log.duration" class="process-audit-result__duration">⏱ {{ log.duration }}s</span>
    </div>
    <div v-if="log.remark" class="process-audit-result__remark">
      {{ log.remark }}
    </div>
    <div v-if="log.attachments && log.attachments.length > 0" class="process-audit-result__attachments">
      <span v-for="(file, index) in log.attachments" :key="index" class="process-audit-result__attachment">
        📎 {{ file }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProcessLog, ProcessActionType } from './types';

interface Props {
  log: ProcessLog;
}

withDefaults(defineProps<Props>(), {});

const getActionIcon = (action: ProcessActionType) => {
  const icons: Record<ProcessActionType, string> = {
    submit: '➤',
    approve: '✓',
    reject: '✕',
    return: '↶',
    transfer: '↔',
    addSign: '+',
    forcePass: '⚡',
    close: '◉',
    reopen: '↻',
  };
  return icons[action] || '○';
};

const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<style scoped>
.process-audit-result {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
}

.process-audit-result--success {
  border-left: 3px solid var(--tr-color-success);
}

.process-audit-result--failure {
  border-left: 3px solid var(--tr-color-danger);
}

.process-audit-result__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.process-audit-result__action {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-2);
  font-weight: 500;
  color: var(--tr-color-neutral900);
}

.process-audit-result__action-icon {
  font-size: 16px;
}

.process-audit-result__action-name {
  font-size: 14px;
}

.process-audit-result__time {
  font-size: 12px;
  color: var(--tr-color-neutral600);
}

.process-audit-result__meta {
  display: flex;
  gap: var(--tr-spacing-3);
  font-size: 12px;
  color: var(--tr-color-neutral600);
}

.process-audit-result__actor,
.process-audit-result__node,
.process-audit-result__duration {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
}

.process-audit-result__remark {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  font-size: 13px;
  color: var(--tr-color-neutral900);
  line-height: 1.5;
  word-break: break-word;
}

.process-audit-result__attachments {
  display: flex;
  flex-wrap: wrap;
  gap: var(--tr-spacing-2);
  font-size: 12px;
}

.process-audit-result__attachment {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-primary);
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.process-audit-result__attachment:hover {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}
</style>
