<template>
  <div class="risk-warning-card" :class="`risk--${item.level}`">
    <div class="risk-warning-card__header">
      <h4 class="risk-warning-card__name">{{ item.name }}</h4>
      <span class="risk-warning-card__level">{{ item.level }}</span>
    </div>

    <div class="risk-warning-card__status">
      Status: <strong>{{ item.status }}</strong>
    </div>

    <div v-if="item.probability || item.impact" class="risk-warning-card__metrics">
      <div v-if="item.probability" class="risk-warning-card__metric">
        <span class="risk-warning-card__metric-label">Probability:</span>
        <span class="risk-warning-card__metric-value">{{ (item.probability * 100).toFixed(0) }}%</span>
      </div>
      <div v-if="item.impact" class="risk-warning-card__metric">
        <span class="risk-warning-card__metric-label">Impact:</span>
        <span class="risk-warning-card__metric-value">{{ (item.impact * 100).toFixed(0) }}%</span>
      </div>
    </div>

    <div v-if="item.mitigation" class="risk-warning-card__mitigation">
      <span class="risk-warning-card__label">Mitigation:</span>
      <p class="risk-warning-card__text">{{ item.mitigation }}</p>
    </div>

    <div v-if="item.owner || item.dueDate" class="risk-warning-card__footer">
      <span v-if="item.owner" class="risk-warning-card__owner">Owner: {{ item.owner }}</span>
      <span v-if="item.dueDate" class="risk-warning-card__due">Due: {{ formatDate(item.dueDate) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RiskWarningItem } from './types';

interface Props {
  item: RiskWarningItem;
}

defineProps<Props>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

<style scoped>
.risk-warning-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border-left: 4px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.risk--low {
  border-left-color: var(--tr-color-success);
  background-color: rgba(var(--tr-color-success-rgb, 52, 211, 153), 0.05);
}

.risk--medium {
  border-left-color: var(--tr-color-warning);
  background-color: rgba(var(--tr-color-warning-rgb, 250, 173, 20), 0.05);
}

.risk--high {
  border-left-color: var(--tr-color-danger);
  background-color: rgba(var(--tr-color-danger-rgb, 240, 53, 53), 0.05);
}

.risk--critical {
  border-left-color: var(--tr-color-danger);
  background-color: rgba(var(--tr-color-danger-rgb, 240, 53, 53), 0.1);
}

.risk-warning-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--tr-spacing-2);
}

.risk-warning-card__name {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.risk-warning-card__level {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-neutral700);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  text-transform: uppercase;
}

.risk-warning-card__status {
  color: var(--tr-color-neutral700);
  font-size: 12px;
}

.risk-warning-card__metrics {
  display: flex;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-2) 0;
  border-top: 1px solid var(--tr-color-neutral200);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.risk-warning-card__metric {
  display: flex;
  gap: var(--tr-spacing-2);
  font-size: 12px;
}

.risk-warning-card__metric-label {
  color: var(--tr-color-neutral600);
}

.risk-warning-card__metric-value {
  color: var(--tr-color-neutral900);
  font-weight: 600;
}

.risk-warning-card__mitigation {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-1);
}

.risk-warning-card__label {
  color: var(--tr-color-neutral700);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
}

.risk-warning-card__text {
  color: var(--tr-color-neutral700);
  font-size: 12px;
  margin: 0;
  line-height: 1.5;
}

.risk-warning-card__footer {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--tr-color-neutral600);
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
}

.risk-warning-card__owner,
.risk-warning-card__due {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
}
</style>
