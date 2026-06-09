<template>
  <div class="revenue-summary-card">
    <div class="revenue-summary-card__header">
      <h3 class="revenue-summary-card__title">Revenue Summary</h3>
      <div v-if="summary.trend" class="revenue-summary-card__trend" :class="`trend--${summary.trend}`">
        <span class="revenue-summary-card__arrow">{{ trendArrow }}</span>
        <span v-if="summary.trendPercent">{{ summary.trendPercent }}%</span>
      </div>
    </div>

    <div class="revenue-summary-card__metrics">
      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">Total Revenue</span>
        <span class="revenue-summary-card__metric-value">
          ${{ formatNumber(summary.totalRevenue) }}
        </span>
      </div>

      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">This Month</span>
        <span class="revenue-summary-card__metric-value">
          ${{ formatNumber(summary.monthRevenue) }}
        </span>
      </div>

      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">This Year</span>
        <span class="revenue-summary-card__metric-value">
          ${{ formatNumber(summary.yearRevenue) }}
        </span>
      </div>
    </div>

    <div class="revenue-summary-card__divider" />

    <div class="revenue-summary-card__secondary">
      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">Contracts</span>
        <span class="revenue-summary-card__metric-value">{{ summary.contractCount }}</span>
      </div>

      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">Collection Rate</span>
        <span class="revenue-summary-card__metric-value">{{ (summary.collectionRate * 100).toFixed(1) }}%</span>
      </div>

      <div class="revenue-summary-card__metric-item">
        <span class="revenue-summary-card__metric-label">Overdue Amount</span>
        <span class="revenue-summary-card__metric-value warning">
          ${{ formatNumber(summary.overdueAmount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RevenueSummary } from './types';

interface Props {
  summary: RevenueSummary;
}

const props = defineProps<Props>();

const trendArrow = computed(() => {
  switch (props.summary.trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
});

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
};
</script>

<style scoped>
.revenue-summary-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
}

.revenue-summary-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.revenue-summary-card__title {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.revenue-summary-card__trend {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
  font-size: 12px;
  font-weight: 600;
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

.revenue-summary-card__arrow {
  font-size: 14px;
}

.revenue-summary-card__metrics {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.revenue-summary-card__metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.revenue-summary-card__metric-label {
  color: var(--tr-color-neutral600);
  font-size: 12px;
}

.revenue-summary-card__metric-value {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 600;
}

.revenue-summary-card__metric-value.warning {
  color: var(--tr-color-danger);
}

.revenue-summary-card__divider {
  height: 1px;
  background-color: var(--tr-color-neutral200);
}

.revenue-summary-card__secondary {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
}
</style>
