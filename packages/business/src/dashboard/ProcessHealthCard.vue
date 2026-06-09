<template>
  <div class="process-health-card">
    <div class="process-health-card__header">
      <div>
        <h4 class="process-health-card__name">{{ metric.processName }}</h4>
        <p class="process-health-card__type">{{ metric.processType }}</p>
      </div>
      <div class="process-health-card__score" :class="`score--${scoreLevel}`">
        {{ metric.healthScore }}
      </div>
    </div>

    <div class="process-health-card__metrics">
      <div class="process-health-card__metric">
        <span class="process-health-card__metric-label">Completion Rate</span>
        <div class="process-health-card__metric-value">
          <span class="process-health-card__number">
            {{ completionRate }}%
          </span>
          <span class="process-health-card__detail">({{ metric.completedCount }}/{{ metric.totalCount }})</span>
        </div>
      </div>

      <div class="process-health-card__metric">
        <span class="process-health-card__metric-label">Overdue Rate</span>
        <span class="process-health-card__metric-value" :class="{ 'value--warning': metric.overdueRate > 0.2 }">
          {{ (metric.overdueRate * 100).toFixed(1) }}%
        </span>
      </div>

      <div class="process-health-card__metric">
        <span class="process-health-card__metric-label">Return Rate</span>
        <span class="process-health-card__metric-value" :class="{ 'value--warning': metric.returnRate > 0.15 }">
          {{ (metric.returnRate * 100).toFixed(1) }}%
        </span>
      </div>

      <div class="process-health-card__metric">
        <span class="process-health-card__metric-label">Avg Duration</span>
        <span class="process-health-card__metric-value">{{ metric.avgDuration }} days</span>
      </div>
    </div>

    <div v-if="metric.trendPercent" class="process-health-card__trend" :class="`trend--${trendDirection}`">
      <span class="process-health-card__arrow">{{ trendArrow }}</span>
      <span>{{ Math.abs(metric.trendPercent) }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ProcessHealthMetric } from './types';

interface Props {
  metric: ProcessHealthMetric;
}

const props = defineProps<Props>();

const completionRate = computed(() => {
  if (props.metric.totalCount === 0) return 0;
  return Math.round((props.metric.completedCount / props.metric.totalCount) * 100);
});

const scoreLevel = computed(() => {
  if (props.metric.healthScore >= 80) return 'high';
  if (props.metric.healthScore >= 60) return 'medium';
  return 'low';
});

const trendDirection = computed(() => {
  if (!props.metric.trendPercent) return 'stable';
  return props.metric.trendPercent > 0 ? 'up' : 'down';
});

const trendArrow = computed(() => {
  if (!props.metric.trendPercent) return '→';
  return props.metric.trendPercent > 0 ? '↑' : '↓';
});
</script>

<style scoped>
.process-health-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
}

.process-health-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--tr-spacing-3);
}

.process-health-card__name {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 var(--tr-spacing-1) 0;
}

.process-health-card__type {
  color: var(--tr-color-neutral600);
  font-size: 11px;
  margin: 0;
}

.process-health-card__score {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 24px;
  font-weight: 600;
  border-radius: var(--tr-radius-md);
  flex-shrink: 0;
}

.score--high {
  background-color: rgba(52, 211, 153, 0.1);
  color: var(--tr-color-success);
}

.score--medium {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--tr-color-warning);
}

.score--low {
  background-color: rgba(240, 53, 53, 0.1);
  color: var(--tr-color-danger);
}

.process-health-card__metrics {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.process-health-card__metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--tr-spacing-2);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-sm);
}

.process-health-card__metric-label {
  color: var(--tr-color-neutral600);
  font-size: 11px;
  font-weight: 500;
}

.process-health-card__metric-value {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
  color: var(--tr-color-neutral900);
  font-weight: 600;
  font-size: 12px;
}

.process-health-card__number {
  font-size: 14px;
}

.process-health-card__detail {
  color: var(--tr-color-neutral600);
  font-size: 10px;
  font-weight: normal;
}

.value--warning {
  color: var(--tr-color-danger);
}

.process-health-card__trend {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
  padding: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
  font-size: 12px;
  font-weight: 500;
}

.trend--up {
  color: var(--tr-color-success);
}

.trend--down {
  color: var(--tr-color-danger);
}

.trend--stable {
  color: var(--tr-color-neutral600);
}

.process-health-card__arrow {
  font-size: 14px;
}
</style>
