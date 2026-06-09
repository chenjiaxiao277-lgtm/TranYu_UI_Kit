<template>
  <div class="dashboard-widget" :class="`widget--${widget.type}`">
    <div v-if="showHeader" class="dashboard-widget__header">
      <h3 class="dashboard-widget__title">{{ widget.title }}</h3>
      <button
        v-if="widget.refreshable"
        aria-label="Refresh"
        class="dashboard-widget__refresh"
        @click="handleRefresh"
      >
        ⟳
      </button>
    </div>

    <div class="dashboard-widget__content">
      <metric-card
        v-if="widget.type === 'metric'"
        :metric="widget.data"
        :clickable="widget.clickable"
        @click="handleAction"
      />
      <trend-card v-else-if="widget.type === 'trend'" :trend="widget.data" />
      <chart-card v-else-if="widget.type === 'chart'" :chart="widget.data" />
      <div v-else class="dashboard-widget__empty">Unknown widget type</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MetricCard from './MetricCard.vue';
import TrendCard from './TrendCard.vue';
import ChartCard from './ChartCard.vue';
import type { DashboardWidgetConfig, DashboardEventPayload } from './types';

interface Props {
  widget: DashboardWidgetConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  action: [payload: DashboardEventPayload];
  refresh: [widgetId: string];
}>();

const showHeader = computed(() => {
  return !!props.widget.title || props.widget.refreshable;
});

const handleRefresh = () => {
  emit('refresh', props.widget.id);
};

const handleAction = (payload: DashboardEventPayload) => {
  emit('action', payload);
};
</script>

<style scoped>
.dashboard-widget {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.widget--small {
  grid-column: span 1;
}

.widget--medium {
  grid-column: span 2;
}

.widget--large {
  grid-column: span 3;
}

.dashboard-widget__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-widget__title {
  color: var(--tr-color-neutral900);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.dashboard-widget__refresh {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: transparent;
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-neutral700);
  cursor: pointer;
  font-size: 12px;
  transition: all var(--tr-motion-fast) var(--tr-motion-easeInOut);
}

.dashboard-widget__refresh:hover {
  background-color: var(--tr-color-neutral50);
  border-color: var(--tr-color-neutral400);
  color: var(--tr-color-neutral900);
}

.dashboard-widget__content {
  flex: 1;
  min-height: 100px;
}

.dashboard-widget__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: var(--tr-color-neutral500);
  text-align: center;
  font-size: 12px;
}
</style>
