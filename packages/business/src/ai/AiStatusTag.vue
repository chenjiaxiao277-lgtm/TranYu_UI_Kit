<template>
  <div class="ai-status-tag" :class="[statusClass, riskClass]">
    {{ statusLabel }}
    <span v-if="riskLevel" class="ai-status-tag__risk">{{ getRiskIcon(riskLevel) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AiExecutionStatus, AiRiskLevel } from './types';

interface Props {
  status: AiExecutionStatus;
  riskLevel?: AiRiskLevel;
}

const props = withDefaults(defineProps<Props>(), {
  riskLevel: undefined,
});

const statusClass = computed(() => `ai-status-tag--${props.status}`);
const riskClass = computed(() => (props.riskLevel ? `ai-status-tag--risk-${props.riskLevel}` : ''));

const statusLabel = computed(() => {
  const labels: Record<AiExecutionStatus, string> = {
    pending: 'Pending',
    loading: 'Loading',
    success: 'Success',
    failed: 'Failed',
    partial: 'Partial',
  };
  return labels[props.status] || props.status;
});

const getRiskIcon = (risk: AiRiskLevel) => {
  const icons: Record<AiRiskLevel, string> = {
    low: '✓',
    medium: '⚠',
    high: '⚠',
    critical: '✕',
  };
  return icons[risk] || '○';
};
</script>

<style scoped>
.ai-status-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--tr-spacing-2);
  padding: var(--tr-spacing-1) var(--tr-spacing-3);
  border-radius: var(--tr-radius-md);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.ai-status-tag--pending {
  background-color: var(--tr-color-neutral400);
  color: var(--tr-color-neutral0);
}

.ai-status-tag--loading {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.ai-status-tag--success {
  background-color: var(--tr-color-success);
  color: var(--tr-color-neutral0);
}

.ai-status-tag--failed {
  background-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.ai-status-tag--partial {
  background-color: var(--tr-color-warning);
  color: var(--tr-color-neutral0);
}

.ai-status-tag--risk-low {
  border: 1px solid var(--tr-color-success);
}

.ai-status-tag--risk-medium {
  border: 1px solid var(--tr-color-warning);
}

.ai-status-tag--risk-high {
  border: 1px solid var(--tr-color-danger);
}

.ai-status-tag--risk-critical {
  border: 1px solid var(--tr-color-danger);
  background-color: var(--tr-color-danger);
}

.ai-status-tag__risk {
  font-size: 14px;
}
</style>
