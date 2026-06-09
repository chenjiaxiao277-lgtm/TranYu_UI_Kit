<template>
  <div class="object-status-tag" :style="{ backgroundColor: statusColor }">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { StatusOption } from './types';

interface Props {
  status: string;
  statusOptions?: StatusOption[];
}

const props = withDefaults(defineProps<Props>(), {
  statusOptions: undefined,
});

const statusColor = computed(() => {
  if (props.statusOptions) {
    const option = props.statusOptions.find((o) => o.value === props.status);
    if (option) return option.color;
  }
  const defaultColors: Record<string, string> = {
    active: 'var(--tr-color-success)',
    pending: 'var(--tr-color-warning)',
    completed: 'var(--tr-color-info)',
    canceled: 'var(--tr-color-neutral500)',
    failed: 'var(--tr-color-danger)',
    draft: 'var(--tr-color-neutral400)',
  };
  return defaultColors[props.status.toLowerCase()] || 'var(--tr-color-neutral400)';
});

const label = computed(() => {
  if (props.statusOptions) {
    const option = props.statusOptions.find((o) => o.value === props.status);
    if (option) return option.label;
  }
  const defaultLabels: Record<string, string> = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    canceled: 'Canceled',
    failed: 'Failed',
    draft: 'Draft',
  };
  return defaultLabels[props.status.toLowerCase()] || props.status;
});
</script>

<style scoped>
.object-status-tag {
  display: inline-block;
  padding: var(--tr-spacing-1) var(--tr-spacing-3);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral0);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}
</style>
