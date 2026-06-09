<template>
  <tr-drawer :visible="visible" title="AI Generated Result" width="500px" @cancel="$emit('close')">
    <div class="ai-generate-modal">
      <div v-if="loading" class="ai-generate-modal__loading">
        <div class="ai-generate-modal__spinner" />
        <p>Generating...</p>
      </div>
      <div v-else-if="status === 'failed'" class="ai-generate-modal__error">
        <p>❌ Generation Failed</p>
        <p class="ai-generate-modal__error-message">{{ errorMessage }}</p>
      </div>
      <div v-else class="ai-generate-modal__content">
        <ai-status-tag :status="status || 'success'" />
        <div v-if="result" class="ai-generate-modal__result">
          {{ result }}
        </div>
      </div>
      <ai-confirm-bar
        :loading="loading"
        :status="status"
        :error-message="errorMessage"
        @adopt="$emit('adopt')"
        @ignore="$emit('ignore')"
        @regenerate="$emit('regenerate')"
      />
    </div>
  </tr-drawer>
</template>

<script setup lang="ts">
import { TrDrawer } from '@tranyu/ui';
import AiStatusTag from './AiStatusTag.vue';
import AiConfirmBar from './AiConfirmBar.vue';
import type { AiExecutionStatus } from './types';

interface Props {
  visible: boolean;
  title?: string;
  result?: string;
  loading?: boolean;
  status?: AiExecutionStatus;
  errorMessage?: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'adopt'): void;
  (e: 'ignore'): void;
  (e: 'regenerate'): void;
}

withDefaults(defineProps<Props>(), {
  title: 'AI Generated Result',
  loading: false,
});

defineEmits<Emits>();
</script>

<style scoped>
.ai-generate-modal {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-4);
}

.ai-generate-modal__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-8);
}

.ai-generate-modal__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--tr-color-neutral200);
  border-top-color: var(--tr-color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ai-generate-modal__error {
  padding: var(--tr-spacing-4);
  background-color: rgba(214, 72, 72, 0.1);
  border-left: 3px solid var(--tr-color-danger);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-danger);
}

.ai-generate-modal__error p {
  margin: 0;
  font-weight: 500;
}

.ai-generate-modal__error-message {
  margin-top: var(--tr-spacing-2);
  font-size: 12px;
  opacity: 0.9;
}

.ai-generate-modal__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.ai-generate-modal__result {
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  color: var(--tr-color-neutral900);
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
  word-break: break-word;
}
</style>
