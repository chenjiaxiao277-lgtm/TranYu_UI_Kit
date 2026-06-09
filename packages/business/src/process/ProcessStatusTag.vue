<template>
  <div class="process-status-tag" :class="statusClass">
    {{ statusLabel }}
    <span v-if="isOverdue" class="process-status-tag__overdue">⚠</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ProcessStatus } from './types';

interface Props {
  status: ProcessStatus;
  isOverdue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOverdue: false,
});

const statusClass = computed(() => `process-status-tag--${props.status}`);
const statusLabel = computed(() => {
  const labels: Record<ProcessStatus, string> = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    rejected: 'Rejected',
    returned: 'Returned',
    overdue: 'Overdue',
    draft: 'Draft',
    closed: 'Closed',
  };
  return labels[props.status] || props.status;
});
</script>

<style scoped>
.process-status-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--tr-spacing-1);
  padding: var(--tr-spacing-1) var(--tr-spacing-3);
  border-radius: var(--tr-radius-md);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.process-status-tag--pending {
  background-color: var(--tr-color-warning);
  color: var(--tr-color-neutral0);
}

.process-status-tag--processing {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.process-status-tag--completed {
  background-color: var(--tr-color-success);
  color: var(--tr-color-neutral0);
}

.process-status-tag--rejected {
  background-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.process-status-tag--returned {
  background-color: var(--tr-color-warning);
  color: var(--tr-color-neutral0);
}

.process-status-tag--overdue {
  background-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.process-status-tag--draft {
  background-color: var(--tr-color-neutral400);
  color: var(--tr-color-neutral0);
}

.process-status-tag--closed {
  background-color: var(--tr-color-neutral500);
  color: var(--tr-color-neutral0);
}

.process-status-tag__overdue {
  font-size: 14px;
}
</style>
