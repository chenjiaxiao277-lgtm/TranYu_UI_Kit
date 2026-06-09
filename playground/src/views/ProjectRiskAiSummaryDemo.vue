<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Project Risk AI Summary" subtitle="Platform v3.0" />
      </template>

      <div class="project-risk-ai-demo">
        <div class="project-risk-ai-demo__section">
          <h3>AI Actions</h3>
          <ai-action-button :actions="aiActions" :loading="isSummarizing" @action="handleAiAction" />
        </div>

        <div v-if="suggestion" class="project-risk-ai-demo__section">
          <h3>AI Suggestion</h3>
          <ai-suggestion-panel
            :suggestion="suggestion"
            :loading="isSummarizing"
            @accept="handleAccept"
            @ignore="handleIgnore"
            @regenerate="handleRegenerate"
          />
        </div>

        <div class="project-risk-ai-demo__section">
          <h3>Execution Log</h3>
          <ai-execution-log :items="executionLogs" />
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppLayout, PageContainer, TrPageHeader } from '@tranyu/ui';
import { AiActionButton, AiSuggestionPanel, AiExecutionLog } from '@tranyu/business/ai';
import type { AiActionConfig, AiSuggestion, AiExecutionLogItem } from '@tranyu/business/ai';

const aiActions: AiActionConfig[] = [
  {
    type: 'summary',
    label: 'Summarize Risks',
    description: 'AI summary of all project risks',
    icon: '📋',
  },
  {
    type: 'suggest',
    label: 'Suggest Mitigations',
    description: 'Suggest risk mitigation strategies',
    icon: '💡',
  },
];

const isSummarizing = ref(false);
const suggestion = ref<AiSuggestion | null>(null);
const executionLogs = ref<AiExecutionLogItem[]>([]);

const handleAiAction = async (_actionType: string) => {
  isSummarizing.value = true;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  suggestion.value = {
    id: `suggest-${Date.now()}`,
    title: 'Risk Mitigation Strategy',
    content: `### High Priority Actions:
1. Allocate 2 additional developers to critical path tasks
2. Establish daily standup for Schedule Delay risk
3. Create contingency plan for Resource Shortage

### Medium Priority:
4. Document technical debt and create resolution roadmap
5. Schedule architecture review for all integrations

### Monitoring:
- Weekly risk assessment
- Bi-weekly stakeholder updates
- Daily progress tracking on critical risks`,
    rationale:
      'Analysis of 3 active risks (Schedule Delay, Resource Shortage, Technical Debt) shows immediate action needed on schedule recovery with focus on resource optimization.',
    confidence: 0.87,
    riskLevel: 'high',
    references: [
      {
        id: 'ref-1',
        title: 'Agile Risk Management Best Practices',
        source: 'PMI',
        relevance: 0.92,
        url: 'https://www.pmi.org',
      },
      {
        id: 'ref-2',
        title: 'Software Project Risk Patterns',
        source: 'IEEE',
        relevance: 0.88,
      },
    ],
    modelName: 'GPT-4',
    timestamp: new Date().toISOString(),
  };

  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'AI Summary - Risk Analysis',
    actionType: 'summary',
    status: 'success',
    modelName: 'GPT-4',
    duration: 2000,
    tokenUsage: { prompt: 400, completion: 520, total: 920 },
    timestamp: new Date().toISOString(),
  };
  executionLogs.value.push(log);
  isSummarizing.value = false;
};

const handleAccept = () => {
  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'Risk Mitigation Strategy - Adopted',
    actionType: 'suggest',
    status: 'success',
    modelName: 'GPT-4',
    duration: 100,
    timestamp: new Date().toISOString(),
  };
  executionLogs.value.push(log);
};

const handleIgnore = () => {
  suggestion.value = null;
};

const handleRegenerate = () => {
  handleAiAction('summary');
};
</script>

<style scoped>
.project-risk-ai-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.project-risk-ai-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.project-risk-ai-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
