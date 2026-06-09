<template>
  <div class="project-progress-card" :class="`status--${item.status}`">
    <div class="project-progress-card__header">
      <h4 class="project-progress-card__name">{{ item.name }}</h4>
      <span class="project-progress-card__status">{{ formatStatus(item.status) }}</span>
    </div>

    <div class="project-progress-card__progress">
      <div class="project-progress-card__bar">
        <div
          class="project-progress-card__fill"
          :style="{ width: `${item.progress * 100}%` }"
        />
      </div>
      <span class="project-progress-card__percent">{{ (item.progress * 100).toFixed(0) }}%</span>
    </div>

    <div class="project-progress-card__metrics">
      <div v-if="item.budget && item.spent" class="project-progress-card__metric">
        <span class="project-progress-card__metric-label">Budget</span>
        <span class="project-progress-card__metric-value">
          ${{ item.spent.toFixed(0) }} / ${{ item.budget.toFixed(0) }}
        </span>
      </div>

      <div v-if="item.startDate || item.endDate" class="project-progress-card__metric">
        <span class="project-progress-card__metric-label">Timeline</span>
        <span class="project-progress-card__metric-value">
          {{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}
        </span>
      </div>

      <div v-if="item.owner" class="project-progress-card__metric">
        <span class="project-progress-card__metric-label">Owner</span>
        <span class="project-progress-card__metric-value">{{ item.owner }}</span>
      </div>

      <div v-if="item.riskLevel" class="project-progress-card__metric">
        <span class="project-progress-card__metric-label">Risk</span>
        <span class="project-progress-card__metric-value" :class="`risk--${item.riskLevel}`">
          {{ formatRisk(item.riskLevel) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectProgressItem } from './types';

interface Props {
  item: ProjectProgressItem;
}

defineProps<Props>();

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    planning: 'Planning',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return map[status] || status;
};

const formatRisk = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const formatDate = (date?: string) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};
</script>

<style scoped>
.project-progress-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 2px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.status--active {
  border-color: var(--tr-color-success);
}

.status--completed {
  border-color: var(--tr-color-info);
}

.status--cancelled {
  border-color: var(--tr-color-neutral400);
  opacity: 0.75;
}

.project-progress-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--tr-spacing-2);
}

.project-progress-card__name {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.project-progress-card__status {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-neutral700);
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.project-progress-card__progress {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-2);
}

.project-progress-card__bar {
  flex: 1;
  height: 8px;
  background-color: var(--tr-color-neutral200);
  border-radius: var(--tr-radius-full);
  overflow: hidden;
}

.project-progress-card__fill {
  height: 100%;
  background-color: var(--tr-color-primary);
  transition: width var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.project-progress-card__percent {
  color: var(--tr-color-neutral900);
  font-size: 12px;
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

.project-progress-card__metrics {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
}

.project-progress-card__metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.project-progress-card__metric-label {
  color: var(--tr-color-neutral600);
  font-weight: 500;
}

.project-progress-card__metric-value {
  color: var(--tr-color-neutral900);
  font-weight: 500;
  text-align: right;
}

.risk--low {
  color: var(--tr-color-success);
}

.risk--medium {
  color: var(--tr-color-warning);
}

.risk--high {
  color: var(--tr-color-danger);
}
</style>
