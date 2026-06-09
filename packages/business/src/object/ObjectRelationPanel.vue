<template>
  <tr-card :title="`Related ${relationLabel}`">
    <div v-if="relations.length === 0" class="object-relation-panel__empty">
      No related records
    </div>
    <div v-else class="object-relation-panel__list">
      <div v-for="relation in relations" :key="relation.id" class="object-relation-panel__item">
        <span class="object-relation-panel__name">{{ relation.name }}</span>
        <tr-button type="secondary" size="small">View</tr-button>
      </div>
    </div>
  </tr-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrButton } from '@tranyu/ui';
import type { ObjectRecord } from './types';

interface Props {
  relations: ObjectRecord[];
  relationLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  relationLabel: 'Items',
});

const relationLabel = computed(() => props.relationLabel);
</script>

<style scoped>
.object-relation-panel__empty {
  padding: var(--tr-spacing-6);
  text-align: center;
  color: var(--tr-color-neutral500);
  font-size: 13px;
}

.object-relation-panel__list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.object-relation-panel__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
}

.object-relation-panel__name {
  font-size: 14px;
  color: var(--tr-color-neutral900);
  font-weight: 500;
}
</style>
