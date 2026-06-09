<template>
  <div class="ai-check-result">
    <div v-if="summary" class="ai-check-result__summary">
      {{ summary }}
    </div>
    <div class="ai-check-result__items">
      <div v-for="item in items" :key="item.id" class="ai-check-result__item" :class="getItemClass(item)">
        <div class="ai-check-result__item-header">
          <span class="ai-check-result__item-icon">{{ item.passed ? '✓' : '✕' }}</span>
          <span class="ai-check-result__item-title">{{ item.title }}</span>
          <ai-status-tag :status="'success'" :risk-level="item.riskLevel" />
        </div>
        <div v-if="item.description" class="ai-check-result__item-description">
          {{ item.description }}
        </div>
        <div v-if="item.issues && item.issues.length > 0" class="ai-check-result__item-issues">
          <strong>Issues:</strong>
          <ul>
            <li v-for="(issue, idx) in item.issues" :key="idx">{{ issue }}</li>
          </ul>
        </div>
        <div v-if="item.suggestions && item.suggestions.length > 0" class="ai-check-result__item-suggestions">
          <strong>Suggestions:</strong>
          <ul>
            <li v-for="(suggestion, idx) in item.suggestions" :key="idx">{{ suggestion }}</li>
          </ul>
        </div>
        <div v-if="item.evidence" class="ai-check-result__item-evidence">
          <strong>Evidence:</strong> {{ item.evidence }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiStatusTag from './AiStatusTag.vue';
import type { AiCheckItem } from './types';

interface Props {
  items: AiCheckItem[];
  summary?: string;
}

withDefaults(defineProps<Props>(), {
  summary: '',
});

const getItemClass = (item: AiCheckItem) => {
  const classes = [`ai-check-result__item--${item.riskLevel}`];
  if (item.passed) classes.push('ai-check-result__item--passed');
  return classes;
};
</script>

<style scoped>
.ai-check-result {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.ai-check-result__summary {
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral900);
  font-weight: 500;
}

.ai-check-result__items {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.ai-check-result__item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-left: 3px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
}

.ai-check-result__item--low {
  border-left-color: var(--tr-color-success);
}

.ai-check-result__item--medium {
  border-left-color: var(--tr-color-warning);
}

.ai-check-result__item--high {
  border-left-color: var(--tr-color-danger);
}

.ai-check-result__item--critical {
  border-left-color: var(--tr-color-danger);
  background-color: rgba(214, 72, 72, 0.05);
}

.ai-check-result__item--passed {
  background-color: rgba(91, 173, 51, 0.05);
}

.ai-check-result__item-header {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-2);
  margin-bottom: var(--tr-spacing-2);
  font-weight: 500;
}

.ai-check-result__item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--tr-radius-sm);
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: bold;
}

.ai-check-result__item-title {
  color: var(--tr-color-neutral900);
  flex: 1;
}

.ai-check-result__item-description {
  margin-bottom: var(--tr-spacing-2);
  color: var(--tr-color-neutral700);
  font-size: 13px;
}

.ai-check-result__item-issues,
.ai-check-result__item-suggestions,
.ai-check-result__item-evidence {
  margin-top: var(--tr-spacing-2);
  padding: var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  font-size: 12px;
  color: var(--tr-color-neutral900);
}

.ai-check-result__item-issues ul,
.ai-check-result__item-suggestions ul {
  margin: var(--tr-spacing-2) 0 0 var(--tr-spacing-4);
  padding: 0;
  list-style: disc;
}

.ai-check-result__item-issues li,
.ai-check-result__item-suggestions li {
  margin-bottom: var(--tr-spacing-1);
}
</style>
