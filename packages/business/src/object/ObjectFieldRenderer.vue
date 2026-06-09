<template>
  <div class="object-field-renderer">
    <span v-if="!value" class="object-field-renderer__empty">-</span>

    <!-- Text -->
    <span v-else-if="field.type === 'text'" class="object-field-renderer__text">
      {{ value }}
    </span>

    <!-- Textarea -->
    <span v-else-if="field.type === 'textarea'" class="object-field-renderer__textarea">
      {{ value }}
    </span>

    <!-- Number -->
    <span v-else-if="field.type === 'number'" class="object-field-renderer__number">
      {{ formatNumber(value) }}
    </span>

    <!-- Amount -->
    <span v-else-if="field.type === 'amount'" class="object-field-renderer__amount">
      {{ formatAmount(value) }}
    </span>

    <!-- Percent -->
    <span v-else-if="field.type === 'percent'" class="object-field-renderer__percent">
      {{ formatPercent(value) }}
    </span>

    <!-- Date -->
    <span v-else-if="field.type === 'date'" class="object-field-renderer__date">
      {{ formatDate(value) }}
    </span>

    <!-- DateTime -->
    <span v-else-if="field.type === 'datetime'" class="object-field-renderer__datetime">
      {{ formatDateTime(value) }}
    </span>

    <!-- Select -->
    <span v-else-if="field.type === 'select'" class="object-field-renderer__select">
      {{ getOptionLabel(value, field.options) }}
    </span>

    <!-- MultiSelect -->
    <div v-else-if="field.type === 'multiSelect'" class="object-field-renderer__multiselect">
      <span v-for="item in value" :key="item" class="object-field-renderer__tag">
        {{ getOptionLabel(item, field.options) }}
      </span>
    </div>

    <!-- Status -->
    <span
      v-else-if="field.type === 'status'"
      class="object-field-renderer__status"
      :style="{ backgroundColor: getStatusColor(value) }"
    >
      {{ getStatusLabel(value) }}
    </span>

    <!-- User -->
    <span v-else-if="field.type === 'user'" class="object-field-renderer__user">
      👤 {{ value }}
    </span>

    <!-- Department -->
    <span v-else-if="field.type === 'department'" class="object-field-renderer__department">
      🏢 {{ value }}
    </span>

    <!-- File -->
    <span v-else-if="field.type === 'file'" class="object-field-renderer__file">
      📎 {{ value }}
    </span>

    <!-- Relation -->
    <span v-else-if="field.type === 'relation'" class="object-field-renderer__relation">
      🔗 {{ value }}
    </span>

    <!-- RichText -->
    <span v-else-if="field.type === 'richText'" class="object-field-renderer__richtext">
      {{ value }}
    </span>

    <!-- JSON -->
    <span v-else-if="field.type === 'json'" class="object-field-renderer__json">
      {{ formatJSON(value) }}
    </span>

    <!-- Default -->
    <span v-else class="object-field-renderer__default">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ObjectField, FieldOption, StatusOption } from './types';

interface Props {
  field: ObjectField;
  value: unknown;
  readonly?: boolean;
  statusOptions?: StatusOption[];
}

defineProps<Props>();

const formatNumber = (value: number) => {
  return new Intl.NumberFormat().format(value);
};

const formatAmount = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatPercent = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

const formatDate = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US');
};

const formatDateTime = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleString('en-US');
};

const formatJSON = (value: unknown) => {
  if (typeof value === 'string') return value;
  return JSON.stringify(value, null, 2);
};

const getOptionLabel = (value: unknown, options?: FieldOption[]) => {
  if (!options) return value;
  const option = options.find((o) => o.value === value);
  return option?.label || value;
};

const getStatusColor = (value: string) => {
  const statusColors: Record<string, string> = {
    active: 'var(--tr-color-success)',
    pending: 'var(--tr-color-warning)',
    completed: 'var(--tr-color-info)',
    canceled: 'var(--tr-color-neutral500)',
    failed: 'var(--tr-color-danger)',
  };
  return statusColors[value.toLowerCase()] || 'var(--tr-color-neutral400)';
};

const getStatusLabel = (value: string) => {
  const labels: Record<string, string> = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    canceled: 'Canceled',
    failed: 'Failed',
  };
  return labels[value.toLowerCase()] || value;
};
</script>

<style scoped>
.object-field-renderer {
  display: inline-block;
  padding: var(--tr-spacing-2) 0;
}

.object-field-renderer__empty {
  color: var(--tr-color-neutral400);
}

.object-field-renderer__text,
.object-field-renderer__textarea,
.object-field-renderer__default {
  color: var(--tr-color-neutral900);
}

.object-field-renderer__number,
.object-field-renderer__amount,
.object-field-renderer__percent {
  color: var(--tr-color-neutral900);
  font-weight: 500;
}

.object-field-renderer__date,
.object-field-renderer__datetime {
  color: var(--tr-color-neutral600);
  font-size: 13px;
}

.object-field-renderer__select {
  color: var(--tr-color-neutral900);
}

.object-field-renderer__multiselect {
  display: flex;
  gap: var(--tr-spacing-2);
  flex-wrap: wrap;
}

.object-field-renderer__tag {
  display: inline-block;
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-md);
  font-size: 12px;
  color: var(--tr-color-neutral900);
}

.object-field-renderer__status {
  display: inline-block;
  padding: var(--tr-spacing-1) var(--tr-spacing-3);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral0);
  font-size: 12px;
  font-weight: 500;
}

.object-field-renderer__user,
.object-field-renderer__department {
  color: var(--tr-color-primary);
  font-weight: 500;
}

.object-field-renderer__file,
.object-field-renderer__relation {
  color: var(--tr-color-primary);
  cursor: pointer;
  text-decoration: underline;
}

.object-field-renderer__richtext {
  color: var(--tr-color-neutral800);
  line-height: 1.5;
}

.object-field-renderer__json {
  display: inline-block;
  padding: var(--tr-spacing-2);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-md);
  font-family: monospace;
  font-size: 12px;
  color: var(--tr-color-neutral900);
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
