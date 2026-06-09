<template>
  <div class="ai-action-button">
    <div v-for="action in actions" :key="action.type" class="ai-action-button__item">
      <tr-button
        :type="action.type === 'check' ? 'secondary' : 'primary'"
        :disabled="disabled || loading || action.disabled"
        size="small"
        @click="handleAction(action)"
      >
        <span v-if="action.icon" class="ai-action-button__icon">{{ action.icon }}</span>
        {{ action.label }}
      </tr-button>
      <div v-if="action.disabled && action.disabledReason" class="ai-action-button__tooltip">
        {{ action.disabledReason }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrButton } from '@tranyu/ui';
import type { AiActionConfig } from './types';

interface Props {
  actions: AiActionConfig[];
  disabled?: boolean;
  loading?: boolean;
}

interface Emits {
  (e: 'action', actionType: string): void;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
});

const emit = defineEmits<Emits>();

const handleAction = (action: AiActionConfig) => {
  if (action.requiresConfirm) {
    if (confirm(`Execute ${action.label}?`)) {
      emit('action', action.type);
    }
  } else {
    emit('action', action.type);
  }
};
</script>

<style scoped>
.ai-action-button {
  display: flex;
  gap: var(--tr-spacing-3);
  flex-wrap: wrap;
  align-items: center;
}

.ai-action-button__item {
  position: relative;
  display: flex;
  align-items: center;
}

.ai-action-button__icon {
  margin-right: var(--tr-spacing-2);
}

.ai-action-button__tooltip {
  display: none;
  position: absolute;
  bottom: -30px;
  left: 0;
  background-color: var(--tr-color-neutral900);
  color: var(--tr-color-neutral0);
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border-radius: var(--tr-radius-sm);
  font-size: 11px;
  white-space: nowrap;
  z-index: 1000;
}

.ai-action-button__item:hover .ai-action-button__tooltip {
  display: block;
}
</style>
