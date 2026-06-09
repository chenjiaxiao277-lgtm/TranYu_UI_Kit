<template>
  <tr-drawer
    :title="'Object Details'"
    :visible="visible"
    :width="500"
    @cancel="$emit('close')"
  >
    <div v-if="record" class="object-detail-drawer">
      <!-- Header with Status -->
      <div v-if="statusField" class="object-detail-drawer__header">
        <div class="object-detail-drawer__title">{{ record.data[titleField] || 'Untitled' }}</div>
        <object-status-tag
          :status="record.data[statusField] || ''"
          :status-options="statusOptions"
        />
      </div>

      <!-- Fields -->
      <div class="object-detail-drawer__content">
        <div v-for="field in fields" :key="field.id" class="object-detail-drawer__field">
          <label class="object-detail-drawer__label">{{ field.label }}</label>
          <div class="object-detail-drawer__value">
            <object-field-renderer :field="field" :value="record.data[field.id]" readonly />
          </div>
        </div>
      </div>

      <!-- Metadata -->
      <div class="object-detail-drawer__metadata">
        <div class="object-detail-drawer__meta-item">
          <span class="object-detail-drawer__meta-label">Created:</span>
          <span class="object-detail-drawer__meta-value">{{ formatDate(record.createdAt) }}</span>
        </div>
        <div v-if="record.updatedAt" class="object-detail-drawer__meta-item">
          <span class="object-detail-drawer__meta-label">Updated:</span>
          <span class="object-detail-drawer__meta-value">{{ formatDate(record.updatedAt) }}</span>
        </div>
      </div>

      <!-- Actions -->
      <template #footer>
        <div class="object-detail-drawer__footer">
          <tr-button type="secondary" @click="$emit('close')">Close</tr-button>
          <tr-button
            v-for="action in actions"
            :key="action.id"
            :type="action.type"
            @click="handleAction(action)"
          >
            {{ action.label }}
          </tr-button>
        </div>
      </template>
    </div>

    <div v-else-if="loading" class="object-detail-drawer__loading">
      Loading...
    </div>

    <div v-else class="object-detail-drawer__empty">
      No data
    </div>
  </tr-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TrDrawer, TrButton } from '@tranyu/ui';
import ObjectStatusTag from './ObjectStatusTag.vue';
import ObjectFieldRenderer from './ObjectFieldRenderer.vue';
import type { ObjectField, ObjectRecord, ObjectAction, StatusOption } from './types';

interface Props {
  visible: boolean;
  record?: ObjectRecord;
  fields: ObjectField[];
  statusField?: string;
  statusOptions?: StatusOption[];
  actions?: ObjectAction[];
  loading?: boolean;
}

interface Emits {
  (e: 'close'): void;
  (e: 'action', action: ObjectAction): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

const titleField = computed(() => {
  return props.fields.find((f) => f.id === 'name')?.id || props.fields[0]?.id || '';
});

const formatDate = (date?: string) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US');
};

const handleAction = (action: ObjectAction) => {
  if (action.requiresConfirm) {
    if (confirm(action.confirmMessage || `Confirm ${action.label}?`)) {
      emit('action', action);
    }
  } else {
    emit('action', action);
  }
};
</script>

<style scoped>
.object-detail-drawer {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.object-detail-drawer__header {
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.object-detail-drawer__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.object-detail-drawer__content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.object-detail-drawer__field {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.object-detail-drawer__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--tr-color-neutral700);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.object-detail-drawer__value {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  font-size: 14px;
  color: var(--tr-color-neutral900);
}

.object-detail-drawer__metadata {
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
  border-top: 1px solid var(--tr-color-neutral200);
}

.object-detail-drawer__meta-item {
  display: flex;
  justify-content: space-between;
}

.object-detail-drawer__meta-label {
  font-size: 12px;
  color: var(--tr-color-neutral600);
  font-weight: 500;
}

.object-detail-drawer__meta-value {
  font-size: 12px;
  color: var(--tr-color-neutral900);
}

.object-detail-drawer__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--tr-spacing-3);
}

.object-detail-drawer__loading,
.object-detail-drawer__empty {
  padding: var(--tr-spacing-8);
  text-align: center;
  color: var(--tr-color-neutral500);
  font-size: 14px;
}
</style>
