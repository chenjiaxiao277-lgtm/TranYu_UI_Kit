<template>
  <tr-card :title="cardTitle">
    <!-- TODO: Support field grouping with collapsible groups (v0.6.2) -->
    <!-- TODO: Support dynamic field rendering with custom field types (v0.6.2) -->
    <div class="object-form">
      <div v-for="field in visibleFields" :key="field.id" class="object-form__field">
        <label class="object-form__label">
          {{ field.label }}
          <span v-if="field.required && mode !== 'readonly'" class="object-form__required">*</span>
        </label>
        <!-- TODO: Support AI field generation entry (v0.7.0) -->
        <input
          v-if="field.type === 'text'"
          v-model="formData[field.id]"
          type="text"
          :placeholder="field.placeholder"
          :readonly="isFieldReadOnly(field.id)"
          class="object-form__input"
        >
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          :readonly="isFieldReadOnly(field.id)"
          class="object-form__textarea"
        />
        <input
          v-else-if="field.type === 'number'"
          v-model.number="formData[field.id]"
          type="number"
          :placeholder="field.placeholder"
          :readonly="isFieldReadOnly(field.id)"
          class="object-form__input"
        >
        <input
          v-else-if="field.type === 'date'"
          v-model="formData[field.id]"
          type="date"
          :readonly="isFieldReadOnly(field.id)"
          class="object-form__input"
        >
        <input
          v-else-if="field.type === 'datetime'"
          v-model="formData[field.id]"
          type="datetime-local"
          :readonly="isFieldReadOnly(field.id)"
          class="object-form__input"
        >
        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.id]"
          :disabled="isFieldReadOnly(field.id)"
          class="object-form__select"
        >
          <option value="">{{ field.placeholder || '选择...' }}</option>
          <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <!-- TODO: Support file upload, richText, relation, user/department selectors (v0.6.2) -->
      </div>
    </div>

    <!-- TODO: Support required field validation on submit (v0.6.2) -->
    <!-- TODO: Support permission-based field visibility (v0.6.3) -->
    <!-- TODO: Support field-level default values and transformations (v0.6.2) -->
    <!-- TODO: Support hidden fields for internal data (v0.6.2) -->
    <div v-if="showActions" class="object-form__actions">
      <tr-button type="secondary" @click="handleCancel">取消</tr-button>
      <tr-button v-if="mode !== 'readonly'" type="primary" @click="handleSave">
        {{ mode === 'approve' ? '批准' : '保存' }}
      </tr-button>
    </div>
  </tr-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TrCard, TrButton } from '@tranyu/ui';
import type { ObjectField, ObjectRecord, ObjectFormMode, ObjectFormConfig, ObjectFormSubmitPayload } from './types';

interface Props {
  fields: ObjectField[];
  record?: ObjectRecord;
  mode?: ObjectFormMode;
  config?: ObjectFormConfig;
  showActions?: boolean;
}

interface Emits {
  (e: 'save', data: Record<string, any>): void;
  (e: 'cancel'): void;
  (e: 'submit', payload: ObjectFormSubmitPayload): void;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'edit',
  showActions: true,
});

const emit = defineEmits<Emits>();

const formData = ref<Record<string, any>>(
  props.record?.data || props.config?.fieldDefaults || {}
);

const cardTitle = computed(() => {
  const modeLabels: Record<ObjectFormMode, string> = {
    create: '新建对象',
    edit: '编辑对象',
    readonly: '查看对象',
    approve: '审批对象',
    inline: '对象信息',
  };
  return modeLabels[props.mode] || '对象表单';
});

const visibleFields = computed(() => {
  return props.fields.filter(
    f => f.visible !== false && !props.config?.hiddenFields?.includes(f.id)
  );
});

const isFieldReadOnly = (fieldId: string) => {
  if (props.mode === 'readonly' || props.mode === 'approve') return true;
  return (
    props.config?.readOnlyFields?.includes(fieldId) ||
    props.fields.find(f => f.id === fieldId)?.readOnly
  );
};

const handleSave = async () => {
  const payload: ObjectFormSubmitPayload = {
    objectType: props.config?.objectType || 'object',
    mode: props.mode,
    recordId: props.record?.id,
    data: formData.value,
    timestamp: Date.now(),
  };

  if (props.config?.onSubmit) {
    await props.config.onSubmit(payload);
  } else {
    emit('save', formData.value);
  }

  if (props.config?.onSave) {
    await props.config.onSave(formData.value);
  }

  emit('submit', payload);
};

const handleCancel = (): void => {
  if (props.config?.onCancel) {
    props.config.onCancel();
  }
  emit('cancel');
};

defineExpose({
  save: handleSave,
  cancel: handleCancel,
  getData: () => formData.value,
});
</script>

<style scoped>
.object-form {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.object-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.object-form__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--tr-color-neutral900);
}

.object-form__required {
  color: var(--tr-color-danger);
}

.object-form__input,
.object-form__select,
.object-form__textarea {
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-size: 14px;
  font-family: inherit;
  transition: all var(--tr-motion-normal);
}

.object-form__input:focus,
.object-form__select:focus,
.object-form__textarea:focus {
  outline: none;
  border-color: var(--tr-color-primary);
  box-shadow: 0 0 0 2px rgba(94, 92, 230, 0.1);
}

.object-form__input:readonly,
.object-form__select:disabled {
  background-color: var(--tr-color-neutral100);
  color: var(--tr-color-neutral600);
  cursor: not-allowed;
}

.object-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.object-form__textarea:readonly {
  background-color: var(--tr-color-neutral100);
  color: var(--tr-color-neutral600);
  cursor: not-allowed;
}

.object-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--tr-spacing-3);
  margin-top: var(--tr-spacing-6);
  padding-top: var(--tr-spacing-6);
  border-top: 1px solid var(--tr-color-neutral200);
}
</style>
