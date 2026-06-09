<template>
  <tool-bar>
    <template #left>
      <tr-button v-if="showCreate" type="primary" @click="$emit('create')">
        + Create
      </tr-button>
    </template>
    <template #center>
      <input
        v-if="showSearch"
        type="text"
        placeholder="Search..."
        class="object-toolbar__search"
        @input="handleSearch"
      >
    </template>
    <template #right>
      <tr-button v-if="showRefresh" type="secondary" size="small" @click="$emit('refresh')">
        ⟳ Refresh
      </tr-button>
    </template>
  </tool-bar>
</template>

<script setup lang="ts">
import { TrButton, ToolBar } from '@tranyu/ui';

interface Props {
  objectType: string;
  showCreate?: boolean;
  showSearch?: boolean;
  showRefresh?: boolean;
}

interface Emits {
  (e: 'search', query: string): void;
  (e: 'create'): void;
  (e: 'refresh'): void;
  (e: 'batchAction', action: string): void;
}

withDefaults(defineProps<Props>(), {
  showCreate: true,
  showSearch: true,
  showRefresh: true,
});

const emit = defineEmits<Emits>();

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('search', target.value);
};
</script>

<style scoped>
.object-toolbar__search {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  font-size: 13px;
  width: 200px;
  transition: all var(--tr-motion-normal);
}

.object-toolbar__search:focus {
  outline: none;
  border-color: var(--tr-color-primary);
  box-shadow: 0 0 0 2px rgba(94, 92, 230, 0.1);
}
</style>
