<template>
  <tr-card title="Object Form">
    <div class="object-form">
      <div v-for="field in fields" :key="field.id" class="object-form__field">
        <label class="object-form__label">
          {{ field.label }}
          <span v-if="field.required" class="object-form__required">*</span>
        </label>
        <input
          v-if="field.type === 'text'"
          v-model="formData[field.id]"
          type="text"
          :placeholder="field.placeholder"
          class="object-form__input"
        >
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          class="object-form__textarea"
        />
        <input
          v-else-if="field.type === 'number'"
          v-model.number="formData[field.id]"
          type="number"
          :placeholder="field.placeholder"
          class="object-form__input"
        >
        <input
          v-else-if="field.type === 'date'"
          v-model="formData[field.id]"
          type="date"
          class="object-form__input"
        >
        <input
          v-else-if="field.type === 'datetime'"
          v-model="formData[field.id]"
          type="datetime-local"
          class="object-form__input"
        >
        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.id]"
          class="object-form__select"
        >
          <option value="">{{ field.placeholder || 'Select...' }}</option>
          <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </tr-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrCard } from '@tranyu/ui';
import type { ObjectField, ObjectRecord } from './types';

interface Props {
  fields: ObjectField[];
  record?: ObjectRecord;
}

interface Emits {
  (e: 'save', data: Record<string, any>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref<Record<string, any>>(
  props.record?.data || {}
);

const handleSave = () => {
  emit('save', formData.value);
};

defineExpose({
  save: handleSave,
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

.object-form__textarea {
  resize: vertical;
  min-height: 100px;
}
</style>
