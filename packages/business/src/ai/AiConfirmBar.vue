<template>
  <div class="ai-confirm-bar">
    <button
      :disabled="loading || status === 'failed'"
      class="ai-confirm-bar__btn ai-confirm-bar__adopt"
      @click="$emit('adopt')"
    >
      ✓ Adopt
    </button>
    <button
      :disabled="loading"
      class="ai-confirm-bar__btn ai-confirm-bar__ignore"
      @click="$emit('ignore')"
    >
      Ignore
    </button>
    <button
      :disabled="loading"
      class="ai-confirm-bar__btn ai-confirm-bar__regenerate"
      @click="$emit('regenerate')"
    >
      🔄 Regenerate
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AiExecutionStatus } from './types';

interface Props {
  loading?: boolean;
  status?: AiExecutionStatus;
  errorMessage?: string;
}

interface Emits {
  (e: 'adopt'): void;
  (e: 'ignore'): void;
  (e: 'regenerate'): void;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

defineEmits<Emits>();
</script>

<style scoped>
.ai-confirm-bar {
  display: flex;
  gap: var(--tr-spacing-2);
  padding-top: var(--tr-spacing-4);
  border-top: 1px solid var(--tr-color-neutral200);
}

.ai-confirm-bar__btn {
  flex: 1;
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  background-color: var(--tr-color-neutral50);
  color: var(--tr-color-neutral900);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.ai-confirm-bar__btn:hover:not(:disabled) {
  background-color: var(--tr-color-neutral100);
  border-color: var(--tr-color-primary);
  color: var(--tr-color-primary);
}

.ai-confirm-bar__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-confirm-bar__adopt {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
  border-color: var(--tr-color-primary);
}

.ai-confirm-bar__adopt:hover:not(:disabled) {
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
  opacity: 0.9;
}

.ai-confirm-bar__ignore {
  background-color: var(--tr-color-neutral50);
}

.ai-confirm-bar__regenerate {
  background-color: var(--tr-color-neutral50);
}
</style>
