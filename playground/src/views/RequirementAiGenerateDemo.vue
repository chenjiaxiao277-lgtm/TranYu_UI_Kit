<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Requirement AI Generation" subtitle="API Design Review" />
      </template>

      <div class="requirement-ai-demo">
        <div class="requirement-ai-demo__section">
          <h3>AI Actions</h3>
          <ai-action-button
            :actions="aiActions"
            :loading="isGenerating"
            @action="handleAiAction"
          />
        </div>

        <div v-if="showGenerateModal" class="requirement-ai-demo__section">
          <h3>Generated Content</h3>
          <ai-generate-modal
            :visible="showGenerateModal"
            title="Generated Requirement"
            :result="generatedContent"
            :loading="isGenerating"
            :status="generateStatus"
            @close="showGenerateModal = false"
            @adopt="handleAdopt"
            @ignore="handleIgnore"
            @regenerate="handleRegenerate"
          />
        </div>

        <div class="requirement-ai-demo__section">
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
import {
  AiActionButton,
  AiGenerateModal,
  AiExecutionLog,
} from '@tranyu/business/ai';
import type { AiActionConfig, AiExecutionLogItem } from '@tranyu/business/ai';

const aiActions: AiActionConfig[] = [
  {
    type: 'generate',
    label: 'Generate Description',
    description: 'Generate requirement description using AI',
    icon: '✨',
  },
  {
    type: 'generate',
    label: 'Generate Acceptance Criteria',
    description: 'Generate acceptance criteria using AI',
    icon: '✓',
  },
  {
    type: 'suggest',
    label: 'Suggest Improvements',
    description: 'Suggest improvements to requirement',
    icon: '💡',
  },
  {
    type: 'summary',
    label: 'Summarize Requirement',
    description: 'Create executive summary',
    icon: '📝',
  },
];

const isGenerating = ref(false);
const showGenerateModal = ref(false);
const generatedContent = ref('');
const generateStatus = ref<'success' | 'loading' | 'failed'>('success');

const executionLogs = ref<AiExecutionLogItem[]>([]);

const handleAiAction = async (actionType: string) => {
  isGenerating.value = true;
  generateStatus.value = 'loading';
  showGenerateModal.value = true;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const sampleContent = {
    generate: `## API Design Review - Complete Specification

### Endpoint Overview
- Path: POST /api/v1/projects/{projectId}/requirements
- Method: POST
- Authentication: Bearer Token

### Request Body
{
  "title": string,
  "description": string,
  "priority": "low" | "medium" | "high",
  "assignee": string
}

### Response
{
  "id": string,
  "createdAt": ISO8601,
  "status": "draft" | "approved"
}`,
    suggest:
      '## Improvement Suggestions\n\n1. Add rate limiting configuration\n2. Implement pagination for list endpoints\n3. Add webhook support for real-time updates',
    summary: `## Executive Summary
This API design review proposes a new requirement management endpoint that enables creating and managing project requirements. The implementation should follow REST principles with proper authentication and error handling.`,
    summary_text:
      '## Summary\nThe API is well-structured and follows industry standards. Key recommendations: improve documentation, add examples, implement versioning strategy.',
  };

  generatedContent.value = sampleContent[actionType as keyof typeof sampleContent] || 'Generated content...';
  generateStatus.value = 'success';
  isGenerating.value = false;
};

const handleAdopt = () => {
  const log: AiExecutionLogItem = {
    id: `log-${Date.now()}`,
    actionName: 'AI Generate - Adopted',
    actionType: 'generate',
    status: 'success',
    modelName: 'GPT-4',
    duration: 2000,
    tokenUsage: { prompt: 150, completion: 280, total: 430 },
    timestamp: new Date().toISOString(),
  };
  executionLogs.value.push(log);
  showGenerateModal.value = false;
};

const handleIgnore = () => {
  showGenerateModal.value = false;
};

const handleRegenerate = () => {
  handleAiAction('generate');
};
</script>

<style scoped>
.requirement-ai-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
}

.requirement-ai-demo__section {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.requirement-ai-demo__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin: 0;
}
</style>
