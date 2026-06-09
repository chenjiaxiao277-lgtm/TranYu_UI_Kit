<template>
  <tr-drawer
    :visible="visible"
    :title="`${action?.label || 'Action'} Approval`"
    width="400px"
    @cancel="$emit('close')"
  >
    <div class="approval-action-modal">
      <div v-if="action?.requiresRemark" class="approval-action-modal__section">
        <label class="approval-action-modal__label">Remark</label>
        <textarea
          v-model="localRemark"
          class="approval-action-modal__textarea"
          placeholder="Enter your remarks..."
          rows="5"
        />
      </div>
      <div class="approval-action-modal__actions">
        <tr-button type="secondary" @click="$emit('close')">Cancel</tr-button>
        <tr-button type="primary" @click="handleConfirm">Confirm</tr-button>
      </div>
    </div>
  </tr-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { TrButton, TrDrawer } from '@tranyu/ui';
import type { ProcessAction } from './types';

interface Props {
  visible: boolean;
  action?: ProcessAction;
  remark?: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'confirm', remark: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  remark: '',
});

const emit = defineEmits<Emits>();

const localRemark = ref('');

watch(
  () => props.visible,
  (val) => {
    if (val) {
      localRemark.value = props.remark || '';
    }
  },
);

const handleConfirm = () => {
  emit('confirm', localRemark.value);
};
</script>

<style scoped>
.approval-action-modal {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
}

.approval-action-modal__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.approval-action-modal__label {
  font-weight: 500;
  color: var(--tr-color-neutral900);
  font-size: 14px;
}

.approval-action-modal__textarea {
  padding: var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-family: inherit;
  font-size: 13px;
  color: var(--tr-color-neutral900);
  resize: vertical;
  transition: border-color var(--tr-motion-normal);
}

.approval-action-modal__textarea:focus {
  outline: none;
  border-color: var(--tr-color-primary);
  box-shadow: 0 0 0 2px rgba(94, 92, 230, 0.1);
}

.approval-action-modal__actions {
  display: flex;
  gap: var(--tr-spacing-3);
  padding-top: var(--tr-spacing-4);
  border-top: 1px solid var(--tr-color-neutral200);
}
</style>
