<template>
  <div class="trend-card">
    <div class="trend-card__header">
      <h3 class="trend-card__title">{{ trend.name }}</h3>
      <div v-if="trend.trend" class="trend-card__summary" :class="`trend--${trend.trend}`">
        <span class="trend-card__arrow">{{ trendArrow }}</span>
        <span v-if="trend.trendPercent" class="trend-card__percent">{{ trend.trendPercent }}%</span>
      </div>
    </div>

    <div class="trend-card__chart">
      <svg class="trend-card__svg" viewBox="0 0 100 60" preserveAspectRatio="none">
        <polyline
          :points="chartPoints"
          fill="none"
          stroke="var(--tr-color-primary)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
        <polyline
          :points="chartPoints"
          fill="url(#gradient)"
          opacity="0.1"
          vector-effect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: var(--tr-color-primary); stop-opacity: 0.3" />
            <stop offset="100%" style="stop-color: var(--tr-color-primary); stop-opacity: 0" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div v-if="trend.unit" class="trend-card__footer">
      <span class="trend-card__unit">{{ trend.unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardTrend } from './types';

interface Props {
  trend: DashboardTrend;
}

const props = defineProps<Props>();

const trendArrow = computed(() => {
  switch (props.trend.trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
});

const chartPoints = computed(() => {
  if (!props.trend.data || props.trend.data.length === 0) return '';

  const values = props.trend.data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return props.trend.data
    .map((d, i) => {
      const x = (i / (props.trend.data.length - 1 || 1)) * 100;
      const y = 60 - ((d.value - min) / range) * 60;
      return `${x},${y}`;
    })
    .join(' ');
});
</script>

<style scoped>
.trend-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
}

.trend-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend-card__title {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

.trend-card__summary {
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

.trend-card__arrow {
  font-size: 14px;
}

.trend-card__percent {
  font-weight: 600;
}

.trend-card__chart {
  height: 60px;
  margin: var(--tr-spacing-2) 0;
}

.trend-card__svg {
  width: 100%;
  height: 100%;
}

.trend-card__footer {
  color: var(--tr-color-neutral500);
  font-size: 11px;
  text-align: right;
}

.trend-card__unit {
  font-weight: 500;
}
</style>
