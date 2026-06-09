<template>
  <div class="tr-table">
    <a-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      :size="size"
      :bordered="bordered"
      :stripe="stripe"
      :class="['tr-table__inner']"
      v-bind="$attrs"
    >
      <template v-for="(_, slot) of $slots" :key="slot" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps || {}" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ATable } from '@arco-design/web-vue';

interface Props {
  columns?: any[];
  data?: any[];
  pagination?: any;
  loading?: boolean;
  size?: 'mini' | 'small' | 'medium' | 'large';
  bordered?: boolean;
  stripe?: boolean;
}

withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => [],
  loading: false,
  size: 'medium',
  bordered: true,
  stripe: true,
});
</script>

<style scoped>
.tr-table {
  border-radius: var(--tr-radius-lg);
  overflow: hidden;
}

.tr-table__inner {
  border-color: var(--tr-color-neutral200);
}

.tr-table :deep(.arco-table-th) {
  background-color: var(--tr-color-neutral50);
  color: var(--tr-color-neutral900);
  font-weight: 600;
  border-color: var(--tr-color-neutral200);
}

.tr-table :deep(.arco-table-td) {
  border-color: var(--tr-color-neutral200);
  color: var(--tr-color-neutral800);
}

.tr-table :deep(.arco-table-tr:hover) {
  background-color: var(--tr-color-neutral50);
}
</style>
