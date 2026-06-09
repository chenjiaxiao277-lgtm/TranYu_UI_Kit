<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Stage Gate AI Check" subtitle="Design Phase Gate" />
      </template>

      <div class="stage-gate-ai-demo">
        <div class="stage-gate-ai-demo__section">
          <h3>AI Actions</h3>
          <ai-action-button :actions="aiActions" :loading="isChecking" @action="handleAiAction" />
        </div>

        <div class="stage-gate-ai-demo__section">
          <h3>Check Results</h3>
          <ai-check-result
            v-if="checkResults.length > 0"
            :items="checkResults"
            summary="Design completeness validation using AI"
          />
          <div v-else style="color: var(--tr-color-neutral600); padding: var(--tr-spacing-4)">
            Click "Run AI Check" to validate deliverables
          </div>
        </div>

        <div class="stage-gate-ai-demo__section">
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
import { AiActionButton, AiCheckResult, AiExecutionLog } from '@tranyu/business/ai';
import type { AiActionConfig, AiCheckItem, AiExecutionLogItem } from '@tranyu/business/ai';

const aiActions: AiActionConfig[] = [
  {
    type: 'check',
    label: 'Run AI Check',
    description: 'Validate design deliverables',
    icon: '✓',
  },
  {
    type: 'analyze',
    label: 'Analyze Completeness',
    description: 'Analyze design completeness',
    icon: '🔍',
  },
];

const isChecking = ref(false);
const checkResults = ref<AiCheckItem[]>([]);
const executionLogs = ref<AiExecutionLogItem[]>([]);

const handleAiAction = async (_actionType: string) => {
  isChecking.value = true;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  checkResults.value = [
    {
      id: 'check-1',
      title: 'Architecture Diagram',
      description: 'Complete system architecture diagram provided',
      passed: true,
      riskLevel: 'low',
      evidence: 'Architecture diagram follows C4 model',
    },
    {
      id: 'check-2',
      title: 'API Specification',
      description: 'RESTful API design documented',
      passed: true,
      riskLevel: 'low',
      suggestions: ['Add rate limiting documentation'],
    },
    {
      id: 'check-3',
      title: 'Data Model Design',
      description: 'Database schema designed',
      passed: false,
      riskLevel: 'medium',
      issues: ['Missing normalization in users table', 'No indexes defined'],
      suggestions: ['Apply 3NF normalization', 'Define covering indexes for queries'],
      evidence: 'Schema analysis shows potential performance issues',
    },
    {
      id: 'check-4',
      title: 'Security Review',
      description: 'Security considerations documented',
      passed: false,
      riskLevel: 'high',
      issues: ['No encryption for sensitive data', 'Missing authentication flow'],
      suggestions: ['Implement AES-256 encryption', 'Add OAuth2 authentication flow'],
    },
  ];

  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'AI Check - Design Gate',
    actionType: 'check',
    status: 'success',
    modelName: 'GPT-4',
    duration: 2000,
    tokenUsage: { prompt: 300, completion: 450, total: 750 },
    timestamp: new Date().toISOString(),
  };
  executionLogs.value.push(log);
  isChecking.value = false;
};
</script>

<style scoped>
.stage-gate-ai-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.stage-gate-ai-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.stage-gate-ai-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
