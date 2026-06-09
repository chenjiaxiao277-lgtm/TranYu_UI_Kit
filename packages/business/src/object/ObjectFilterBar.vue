<template>
  <filter-bar>
    <div class="object-filter-bar">
      <select v-for="field in fields" :key="field.id" class="object-filter-bar__select">
        <option value="">{{ field.label }}</option>
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </filter-bar>
</template>

<script setup lang="ts">
import { FilterBar } from '@tranyu/ui';
import type { ObjectField } from './types';

interface Props {
  fields: ObjectField[];
}

defineProps<Props>();
</script>

<style scoped>
.object-filter-bar {
  display: flex;
  gap: var(--tr-spacing-3);
  flex-wrap: wrap;
}

.object-filter-bar__select {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  background-color: var(--tr-color-neutral0);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.object-filter-bar__select:hover {
  border-color: var(--tr-color-neutral400);
}

.object-filter-bar__select:focus {
  outline: none;
  border-color: var(--tr-color-primary);
}
</style>
