<template>
  <div class="object-table">
    <tr-table
      :columns="tableColumns"
      :data="records"
      :loading="loading"
      :pagination="{ pageSize: 20 }"
      :bordered="true"
      :stripe="true"
      @row-click="handleRowClick"
    >
      <template #status="{ record }">
        <object-status-tag
          :status="getStatusValue(record)"
          :status-options="statusOptions"
        />
      </template>
      <template #actions="{ record }">
        <div class="object-table__actions">
          <tr-button
            v-for="action in actions"
            :key="action.id"
            :type="action.type"
            size="small"
            @click="handleAction(action, record)"
          >
            {{ action.label }}
          </tr-button>
        </div>
      </template>
    </tr-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TrTable, TrButton } from '@tranyu/ui';
import ObjectStatusTag from './ObjectStatusTag.vue';
import type { ObjectField, ObjectRecord, ObjectAction, StatusOption } from './types';

interface Props {
  objectType: string;
  fields: ObjectField[];
  records: ObjectRecord[];
  loading?: boolean;
  statusField?: string;
  statusOptions?: StatusOption[];
  actions?: ObjectAction[];
  selectable?: boolean;
}

interface Emits {
  (e: 'rowClick', record: ObjectRecord): void;
  (e: 'action', action: ObjectAction, record: ObjectRecord): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  selectable: false,
});

const emit = defineEmits<Emits>();

const tableColumns = computed(() => {
  const cols: unknown[] = props.fields
    .filter((f) => f.visible !== false)
    .map((field) => ({
      title: field.label,
      dataIndex: field.id,
      width: 120,
      slotName: field.type === 'status' ? 'status' : undefined,
      render: (data: unknown) => data,
    }));

  if (props.actions && props.actions.length > 0) {
    cols.push({
      title: 'Actions',
      slotName: 'actions',
      width: 150,
    });
  }

  return cols;
});

const getStatusValue = (record: ObjectRecord) => {
  if (!props.statusField) return '';
  return record.data[props.statusField] || '';
};

const handleRowClick = (record: ObjectRecord) => {
  emit('rowClick', record);
};

const handleAction = (action: ObjectAction, record: ObjectRecord) => {
  if (action.requiresConfirm) {
    if (confirm(action.confirmMessage || `Confirm ${action.label}?`)) {
      emit('action', action, record);
    }
  } else {
    emit('action', action, record);
  }
};
</script>

<style scoped>
.object-table {
  width: 100%;
}

.object-table__actions {
  display: flex;
  gap: var(--tr-spacing-2);
}
</style>
