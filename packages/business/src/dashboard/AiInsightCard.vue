<template>
  <div class="ai-insight-card" :class="`insight--${item.type}`">
    <div class="ai-insight-card__header">
      <h4 class="ai-insight-card__title">{{ item.title }}</h4>
      <span class="ai-insight-card__type">{{ formatType(item.type) }}</span>
    </div>

    <p class="ai-insight-card__content">
      {{ item.content }}
    </p>

    <div class="ai-insight-card__metrics">
      <div class="ai-insight-card__metric">
        <span class="ai-insight-card__metric-label">Confidence</span>
        <div class="ai-insight-card__confidence">
          <div class="ai-insight-card__confidence-bar">
            <div
              class="ai-insight-card__confidence-fill"
              :style="{ width: `${item.confidence * 100}%` }"
            />
          </div>
          <span class="ai-insight-card__confidence-percent">{{ (item.confidence * 100).toFixed(0) }}%</span>
        </div>
      </div>

      <div v-if="item.riskLevel" class="ai-insight-card__metric">
        <span class="ai-insight-card__metric-label">Risk Level</span>
        <span class="ai-insight-card__risk-level" :class="`risk--${item.riskLevel}`">
          {{ formatRisk(item.riskLevel) }}
        </span>
      </div>
    </div>

    <div class="ai-insight-card__footer">
      <span v-if="item.timestamp" class="ai-insight-card__timestamp">
        {{ formatTime(item.timestamp) }}
      </span>

      <button
        v-if="item.actionable && item.actionLabel"
        class="ai-insight-card__action"
        @click="handleAction"
      >
        {{ item.actionLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AiInsightItem, DashboardEventPayload } from './types';

interface Props {
  item: AiInsightItem;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  action: [payload: DashboardEventPayload];
}>();

const formatType = (type: string) => {
  const map: Record<string, string> = {
    opportunity: '💡 Opportunity',
    risk: '⚠️ Risk',
    optimization: '🔧 Optimization',
    recommendation: '✓ Recommendation',
  };
  return map[type] || type;
};

const formatRisk = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const handleAction = () => {
  emit('action', {
    id: props.item.id,
    action: 'apply',
    data: props.item,
    timestamp: new Date().toISOString(),
  });
};
</script>

<style scoped>
.ai-insight-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  border-left: 4px solid var(--tr-color-neutral300);
}

.insight--opportunity {
  border-left-color: var(--tr-color-success);
}

.insight--risk {
  border-left-color: var(--tr-color-danger);
}

.insight--optimization {
  border-left-color: var(--tr-color-warning);
}

.insight--recommendation {
  border-left-color: var(--tr-color-info);
}

.ai-insight-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--tr-spacing-2);
}

.ai-insight-card__title {
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.ai-insight-card__type {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-neutral700);
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.ai-insight-card__content {
  color: var(--tr-color-neutral700);
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.ai-insight-card__metrics {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
  padding: var(--tr-spacing-2) 0;
  border-top: 1px solid var(--tr-color-neutral200);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.ai-insight-card__metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.ai-insight-card__metric-label {
  color: var(--tr-color-neutral600);
  font-weight: 500;
}

.ai-insight-card__confidence {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
  flex: 1;
  max-width: 100px;
  margin-left: var(--tr-spacing-2);
}

.ai-insight-card__confidence-bar {
  flex: 1;
  height: 4px;
  background-color: var(--tr-color-neutral200);
  border-radius: var(--tr-radius-full);
  overflow: hidden;
}

.ai-insight-card__confidence-fill {
  height: 100%;
  background-color: var(--tr-color-success);
}

.ai-insight-card__confidence-percent {
  font-weight: 600;
  color: var(--tr-color-neutral900);
  min-width: 35px;
  text-align: right;
}

.ai-insight-card__risk-level {
  font-weight: 600;
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

.ai-insight-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--tr-spacing-2);
  border-top: 1px solid var(--tr-color-neutral200);
}

.ai-insight-card__timestamp {
  color: var(--tr-color-neutral500);
  font-size: 10px;
}

.ai-insight-card__action {
  padding: var(--tr-spacing-1) var(--tr-spacing-3);
  background-color: var(--tr-color-primary);
  border: none;
  border-radius: var(--tr-radius-sm);
  color: var(--tr-color-neutral0);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--tr-motion-fast) var(--tr-motion-easeInOut);
}

.ai-insight-card__action:hover {
  background-color: var(--tr-color-primary-dark, var(--tr-color-primary));
  transform: translateY(-1px);
}
</style>
