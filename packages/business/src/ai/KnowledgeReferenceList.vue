<template>
  <div class="knowledge-reference-list">
    <div class="knowledge-reference-list__title">📚 Knowledge References</div>
    <div class="knowledge-reference-list__items">
      <div v-for="ref in references" :key="ref.id" class="knowledge-reference-list__item">
        <div class="knowledge-reference-list__item-header">
          <a v-if="ref.url" :href="ref.url" target="_blank" class="knowledge-reference-list__link">
            {{ ref.title }}
          </a>
          <span v-else class="knowledge-reference-list__title-text">{{ ref.title }}</span>
          <span class="knowledge-reference-list__relevance">{{ (ref.relevance * 100).toFixed(0) }}%</span>
        </div>
        <div class="knowledge-reference-list__source">{{ ref.source }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KnowledgeReference } from './types';

interface Props {
  references: KnowledgeReference[];
}

withDefaults(defineProps<Props>(), {});
</script>

<style scoped>
.knowledge-reference-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.knowledge-reference-list__title {
  font-weight: 500;
  color: var(--tr-color-neutral900);
  font-size: 13px;
}

.knowledge-reference-list__items {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.knowledge-reference-list__item {
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-sm);
  font-size: 12px;
}

.knowledge-reference-list__item-header {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-2);
  margin-bottom: var(--tr-spacing-1);
}

.knowledge-reference-list__link {
  color: var(--tr-color-primary);
  text-decoration: none;
  cursor: pointer;
  flex: 1;
  word-break: break-word;
}

.knowledge-reference-list__link:hover {
  text-decoration: underline;
}

.knowledge-reference-list__title-text {
  color: var(--tr-color-neutral900);
  flex: 1;
  word-break: break-word;
}

.knowledge-reference-list__relevance {
  padding: 0 var(--tr-spacing-2);
  background-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
  border-radius: var(--tr-radius-sm);
  font-weight: 500;
  white-space: nowrap;
}

.knowledge-reference-list__source {
  color: var(--tr-color-neutral600);
  font-size: 11px;
}
</style>
