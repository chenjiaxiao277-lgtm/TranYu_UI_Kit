<template>
  <tr-card class="ai-suggestion-panel">
    <div class="ai-suggestion-panel__header">
      <div>
        <h3 class="ai-suggestion-panel__title">{{ suggestion.title }}</h3>
        <ai-status-tag :status="loading ? 'loading' : 'success'" :risk-level="suggestion.riskLevel" />
      </div>
      <div class="ai-suggestion-panel__meta">
        <span v-if="suggestion.modelName" class="ai-suggestion-panel__model">🤖 {{ suggestion.modelName }}</span>
        <span class="ai-suggestion-panel__confidence">
          💡 {{ (suggestion.confidence * 100).toFixed(0) }}%
        </span>
      </div>
    </div>

    <div class="ai-suggestion-panel__content">
      {{ suggestion.content }}
    </div>

    <div class="ai-suggestion-panel__rationale">
      <strong>Rationale:</strong> {{ suggestion.rationale }}
    </div>

    <div v-if="suggestion.references.length > 0" class="ai-suggestion-panel__references">
      <knowledge-reference-list :references="suggestion.references" />
    </div>

    <div class="ai-suggestion-panel__actions">
      <tr-button type="primary" size="small" @click="$emit('accept')">Adopt</tr-button>
      <tr-button type="secondary" size="small" @click="$emit('ignore')">Ignore</tr-button>
      <tr-button type="secondary" size="small" @click="$emit('regenerate')">Regenerate</tr-button>
    </div>
  </tr-card>
</template>

<script setup lang="ts">
import { TrCard, TrButton } from '@tranyu/ui';
import AiStatusTag from './AiStatusTag.vue';
import KnowledgeReferenceList from './KnowledgeReferenceList.vue';
import type { AiSuggestion } from './types';

interface Props {
  suggestion: AiSuggestion;
  loading?: boolean;
}

interface Emits {
  (e: 'accept'): void;
  (e: 'ignore'): void;
  (e: 'regenerate'): void;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

defineEmits<Emits>();
</script>

<style scoped>
.ai-suggestion-panel {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.ai-suggestion-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--tr-spacing-3);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.ai-suggestion-panel__title {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.ai-suggestion-panel__meta {
  display: flex;
  gap: var(--tr-spacing-3);
  font-size: 12px;
  color: var(--tr-color-neutral600);
}

.ai-suggestion-panel__model {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
}

.ai-suggestion-panel__confidence {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-1);
}

.ai-suggestion-panel__content {
  color: var(--tr-color-neutral900);
  line-height: 1.6;
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
}

.ai-suggestion-panel__rationale {
  padding: var(--tr-spacing-3);
  background-color: var(--tr-color-neutral100);
  border-left: 3px solid var(--tr-color-primary);
  border-radius: var(--tr-radius-md);
  font-size: 13px;
  color: var(--tr-color-neutral900);
}

.ai-suggestion-panel__references {
  padding: var(--tr-spacing-3);
  border-top: 1px solid var(--tr-color-neutral200);
}

.ai-suggestion-panel__actions {
  display: flex;
  gap: var(--tr-spacing-3);
  padding-top: var(--tr-spacing-3);
  border-top: 1px solid var(--tr-color-neutral200);
}
</style>
