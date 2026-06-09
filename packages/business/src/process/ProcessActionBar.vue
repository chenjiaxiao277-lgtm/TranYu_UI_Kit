<template>
  <div class="process-action-bar">
    <div v-for="action in props.actions" :key="action.id" class="process-action-bar__item">
      <tr-button
        :type="action.buttonType || 'secondary'"
        :disabled="action.disabled || props.disabled"
        size="small"
        @click="handleAction(action)"
      >
        {{ action.label }}
      </tr-button>
      <div v-if="action.disabled && action.disabledReason" class="process-action-bar__tooltip">
        {{ action.disabledReason }}
      </div>
    </div>
    <approval-action-modal
      :visible="modalVisible"
      :action="currentAction"
      :remark="remark"
      @close="handleModalClose"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrButton } from '@tranyu/ui';
import ApprovalActionModal from './ApprovalActionModal.vue';
import type { ProcessAction } from './types';

interface Props {
  actions: ProcessAction[];
  disabled?: boolean;
}

interface Emits {
  (e: 'action', action: ProcessAction, remark: string): void;
  (e: 'confirm', action: ProcessAction): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<Emits>();

const modalVisible = ref(false);
const currentAction = ref<ProcessAction | null>(null);
const remark = ref('');

const handleAction = (action: ProcessAction) => {
  if (action.requiresApproval || action.requiresRemark) {
    currentAction.value = action;
    modalVisible.value = true;
  } else if (action.requiresConfirm) {
    if (confirm(action.confirmMessage || `Confirm ${action.label}?`)) {
      emit('action', action, '');
    }
  } else {
    emit('action', action, '');
  }
};

const handleModalClose = () => {
  modalVisible.value = false;
  currentAction.value = null;
  remark.value = '';
};

const handleModalConfirm = (submittedRemark: string) => {
  if (currentAction.value) {
    emit('action', currentAction.value, submittedRemark);
    handleModalClose();
  }
};
</script>

<style scoped>
.process-action-bar {
  display: flex;
  gap: var(--tr-spacing-3);
  align-items: center;
  flex-wrap: wrap;
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
}

.process-action-bar__item {
  position: relative;
  display: flex;
  align-items: center;
}

.process-action-bar__tooltip {
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

.process-action-bar__item:hover .process-action-bar__tooltip {
  display: block;
}
</style>
