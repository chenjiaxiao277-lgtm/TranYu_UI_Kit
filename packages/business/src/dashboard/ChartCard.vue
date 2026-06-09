<template>
  <div class="chart-card">
    <div v-if="chart.title" class="chart-card__header">
      <h3 class="chart-card__title">{{ chart.title }}</h3>
    </div>

    <div class="chart-card__content" :style="{ height: `${chart.height || 300}px` }">
      <div class="chart-card__placeholder">
        <span class="chart-card__type">{{ chart.type }}</span>
        <span class="chart-card__hint">Chart data rendering</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartData } from './types';

interface Props {
  chart: ChartData;
}

defineProps<Props>();
</script>

<style scoped>
.chart-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
}

.chart-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-card__title {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 500;
  margin: 0;
}

.chart-card__content {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-sm);
}

.chart-card__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tr-spacing-2);
  color: var(--tr-color-neutral500);
  text-align: center;
}

.chart-card__type {
  font-size: 14px;
  font-weight: 500;
  color: var(--tr-color-neutral700);
}

.chart-card__hint {
  font-size: 12px;
}
</style>
