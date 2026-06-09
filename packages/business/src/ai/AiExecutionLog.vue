<template>
  <div class="ai-execution-log">
    <div v-if="loading" class="ai-execution-log__loading">Loading...</div>
    <div v-else-if="items.length === 0" class="ai-execution-log__empty">No execution logs</div>
    <div v-else class="ai-execution-log__items">
      <div v-for="item in items" :key="item.id" class="ai-execution-log__item">
        <div class="ai-execution-log__item-header">
          <div>
            <div class="ai-execution-log__action">{{ item.actionName }}</div>
            <div class="ai-execution-log__type">{{ item.actionType }}</div>
          </div>
          <ai-status-tag :status="item.status" />
        </div>
        <div class="ai-execution-log__meta">
          <span class="ai-execution-log__model">🤖 {{ item.modelName }}</span>
          <span class="ai-execution-log__duration">⏱ {{ item.duration }}ms</span>
          <span v-if="item.tokenUsage" class="ai-execution-log__tokens">
            🔢 {{ item.tokenUsage.total }} tokens
          </span>
          <span class="ai-execution-log__time">{{ formatTime(item.timestamp) }}</span>
        </div>
        <div v-if="item.errorMessage" class="ai-execution-log__error">
          ❌ {{ item.errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiStatusTag from './AiStatusTag.vue';
import type { AiExecutionLogItem } from './types';

interface Props {
  items: AiExecutionLogItem[];
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

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
.ai-execution-log {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.ai-execution-log__loading {
  text-align: center;
  padding: var(--tr-spacing-8);
  color: var(--tr-color-neutral600);
}

.ai-execution-log__empty {
  text-align: center;
  padding: var(--tr-spacing-8);
  color: var(--tr-color-neutral400);
}

.ai-execution-log__items {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.ai-execution-log__item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border-left: 3px solid var(--tr-color-neutral300);
}

.ai-execution-log__item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--tr-spacing-2);
}

.ai-execution-log__action {
  font-weight: 500;
  color: var(--tr-color-neutral900);
  font-size: 14px;
}

.ai-execution-log__type {
  font-size: 12px;
  color: var(--tr-color-neutral600);
  margin-top: var(--tr-spacing-1);
}

.ai-execution-log__meta {
  display: flex;
  gap: var(--tr-spacing-3);
  font-size: 12px;
  color: var(--tr-color-neutral600);
  padding-bottom: var(--tr-spacing-2);
}

.ai-execution-log__model,
.ai-execution-log__duration,
.ai-execution-log__tokens,
.ai-execution-log__time {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
}

.ai-execution-log__error {
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
  color: var(--tr-color-danger);
  font-size: 12px;
}
</style>
