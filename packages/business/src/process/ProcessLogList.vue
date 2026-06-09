<template>
  <div class="process-log-list">
    <div v-if="loading" class="process-log-list__loading">Loading...</div>
    <div v-else-if="logs.length === 0" class="process-log-list__empty">No logs</div>
    <div v-else class="process-log-list__container">
      <div v-for="log in logs" :key="log.id" class="process-log-list__item">
        <process-audit-result :log="log" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProcessAuditResult from './ProcessAuditResult.vue';
import type { ProcessLog } from './types';

interface Props {
  logs: ProcessLog[];
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<style scoped>
.process-log-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.process-log-list__loading {
  text-align: center;
  padding: var(--tr-spacing-8);
  color: var(--tr-color-neutral600);
}

.process-log-list__empty {
  text-align: center;
  padding: var(--tr-spacing-8);
  color: var(--tr-color-neutral400);
}

.process-log-list__container {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.process-log-list__item {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border-left: 3px solid var(--tr-color-neutral300);
}
</style>
