<template>
  <div class="metric-card" :class="{ 'metric-card--clickable': clickable }" @click="handleClick">
    <div class="metric-card__header">
      <span class="metric-card__name">{{ metric.name }}</span>
      <span v-if="metric.icon" class="metric-card__icon">{{ metric.icon }}</span>
    </div>

    <div class="metric-card__value">
      <span class="metric-card__number">{{ metric.value }}</span>
      <span v-if="metric.unit" class="metric-card__unit">{{ metric.unit }}</span>
    </div>

    <div v-if="metric.trend" class="metric-card__trend" :class="`trend--${metric.trend}`">
      <span class="metric-card__arrow">{{ trendArrow }}</span>
      <span v-if="metric.trendPercent" class="metric-card__percent">{{ metric.trendPercent }}%</span>
    </div>

    <div v-if="metric.description" class="metric-card__description">
      {{ metric.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardMetric, DashboardEventPayload } from './types';

interface Props {
  metric: DashboardMetric;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
});

const emit = defineEmits<{
  click: [payload: DashboardEventPayload];
}>();

const trendArrow = computed(() => {
  switch (props.metric.trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
});

const handleClick = () => {
  if (props.clickable) {
    emit('click', {
      id: props.metric.id,
      action: 'click',
      data: props.metric,
      timestamp: new Date().toISOString(),
    });
  }
};
</script>

<style scoped>
.metric-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.metric-card--clickable {
  cursor: pointer;
}

.metric-card--clickable:hover {
  border-color: var(--tr-color-primary);
  box-shadow: var(--tr-shadow-sm);
  transform: translateY(-2px);
}

.metric-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-card__name {
  color: var(--tr-color-neutral700);
  font-size: 12px;
  font-weight: 500;
}

.metric-card__icon {
  font-size: 16px;
}

.metric-card__value {
  display: flex;
  align-items: baseline;
  gap: var(--tr-spacing-2);
}

.metric-card__number {
  color: var(--tr-color-neutral900);
  font-size: 24px;
  font-weight: 600;
}

.metric-card__unit {
  color: var(--tr-color-neutral600);
  font-size: 12px;
}

.metric-card__trend {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
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

.metric-card__arrow {
  font-size: 14px;
}

.metric-card__percent {
  font-weight: 600;
}

.metric-card__description {
  color: var(--tr-color-neutral500);
  font-size: 11px;
  line-height: 1.4;
}
</style>
