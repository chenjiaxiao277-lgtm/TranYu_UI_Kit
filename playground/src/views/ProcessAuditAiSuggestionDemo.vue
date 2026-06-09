<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Process Audit AI Suggestion" subtitle="Approval Flow Review" />
      </template>

      <div class="process-audit-ai-demo">
        <div class="process-audit-ai-demo__section">
          <h3>AI Actions</h3>
          <ai-action-button :actions="aiActions" :loading="isSuggesting" @action="handleAiAction" />
        </div>

        <div v-if="suggestion" class="process-audit-ai-demo__section">
          <h3>AI Suggestion</h3>
          <ai-suggestion-panel
            :suggestion="suggestion"
            :loading="isSuggesting"
            @accept="handleAccept"
            @ignore="handleIgnore"
            @regenerate="handleRegenerate"
          />
        </div>

        <div class="process-audit-ai-demo__section">
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
    type: 'suggest',
    label: 'Suggest Improvements',
    description: 'AI-driven process improvement suggestions',
    icon: '💡',
  },
  {
    type: 'analyze',
    label: 'Analyze Flow',
    description: 'Analyze current approval flow',
    icon: '🔍',
  },
];

const isSuggesting = ref(false);
const suggestion = ref<AiSuggestion | null>(null);
const executionLogs = ref<AiExecutionLogItem[]>([]);

const handleAiAction = async (_actionType: string) => {
  isSuggesting.value = true;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  suggestion.value = {
    id: `suggest-${Date.now()}`,
    title: 'Process Flow Optimization',
    content: `### Recommended Improvements:

#### 1. Parallel Approval (Priority: High)
Current: Sequential Finance → Board → Legal
Proposed: Parallel Finance & Legal → Board
Impact: Reduce cycle time by 40%

#### 2. Conditional Routing (Priority: Medium)
Add automation to route based on:
- Amount threshold → Direct approval for <$50K
- Department → Fast-track for recurring expenses

#### 3. Early Rejection Workflow (Priority: Medium)
- Add early validation before Finance review
- Catch common issues in first step
- Reduce rejected cases by ~30%

#### 4. Audit Trail Automation (Priority: Low)
- Auto-generate compliance reports
- Real-time SLA tracking
- Better stakeholder visibility`,
    rationale:
      'Analyzed 150 approval records from Q1-Q2. Current process averages 12 days with 25% rejection rate. Proposed changes based on bottleneck analysis and industry benchmarks.',
    confidence: 0.92,
    riskLevel: 'medium',
    references: [
      {
        id: 'ref-1',
        title: 'Business Process Optimization Guide',
        source: 'Harvard Business Review',
        relevance: 0.95,
        url: 'https://hbr.org',
      },
      {
        id: 'ref-2',
        title: 'Workflow Automation Best Practices',
        source: 'Gartner',
        relevance: 0.89,
        url: 'https://www.gartner.com',
      },
      {
        id: 'ref-3',
        title: 'Internal Approval Process Audit',
        source: 'Company Wiki',
        relevance: 0.93,
      },
    ],
    modelName: 'GPT-4',
    timestamp: new Date().toISOString(),
  };

  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'AI Suggest - Process Improvement',
    actionType: 'suggest',
    status: 'success',
    modelName: 'GPT-4',
    duration: 2000,
    tokenUsage: { prompt: 350, completion: 480, total: 830 },
    timestamp: new Date().toISOString(),
  };
  executionLogs.value.push(log);
  isSuggesting.value = false;
};

const handleAccept = () => {
  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'Process Improvement - Adopted',
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
  handleAiAction('suggest');
};
</script>

<style scoped>
.process-audit-ai-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.process-audit-ai-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.process-audit-ai-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
