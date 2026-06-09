<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="AI Components" subtitle="v0.5.0" />
      </template>

      <tool-bar>
        <template #left>
          <router-link to="/ai/requirement-generate" style="text-decoration: none">
            <tr-button type="primary">Requirement AI</tr-button>
          </router-link>
          <router-link to="/ai/stage-gate-check" style="text-decoration: none">
            <tr-button type="secondary">Stage Gate AI</tr-button>
          </router-link>
          <router-link to="/ai/project-risk-summary" style="text-decoration: none">
            <tr-button type="secondary">Risk AI</tr-button>
          </router-link>
          <router-link to="/ai/process-audit-suggestion" style="text-decoration: none">
            <tr-button type="secondary">Process AI</tr-button>
          </router-link>
        </template>
      </tool-bar>

      <div class="ai-component-demo">
        <tr-card title="AI Components Hub">
          <div class="ai-component-demo__checklist">
            <h3>Component Status</h3>
            <ul>
              <li>✓ AiActionButton - 7 action types with loading/disabled support</li>
              <li>✓ AiSuggestionPanel - Suggestion with rationale and references</li>
              <li>✓ AiCheckResult - Check items with risk levels and issues</li>
              <li>✓ AiGenerateModal - Result display with manual confirmation</li>
              <li>✓ AiConfirmBar - Adopt/Ignore/Regenerate actions</li>
              <li>✓ AiExecutionLog - Audit trail with model, duration, tokens</li>
              <li>✓ AiStatusTag - Status with risk level indicators</li>
              <li>✓ KnowledgeReferenceList - Linked knowledge sources</li>
            </ul>
          </div>

          <h3>Demo Scenarios</h3>
          <div class="ai-component-demo__demos">
            <router-link to="/ai/requirement-generate">
              <tr-card hoverable class="ai-component-demo__demo-link">
                <h4>RequirementAiGenerateDemo</h4>
                <p>Generate requirement description and acceptance criteria</p>
              </tr-card>
            </router-link>
            <router-link to="/ai/stage-gate-check">
              <tr-card hoverable class="ai-component-demo__demo-link">
                <h4>StageGateAiCheckDemo</h4>
                <p>AI validation of stage gate deliverables</p>
              </tr-card>
            </router-link>
            <router-link to="/ai/project-risk-summary">
              <tr-card hoverable class="ai-component-demo__demo-link">
                <h4>ProjectRiskAiSummaryDemo</h4>
                <p>Summarize project risks and mitigation strategies</p>
              </tr-card>
            </router-link>
            <router-link to="/ai/process-audit-suggestion">
              <tr-card hoverable class="ai-component-demo__demo-link">
                <h4>ProcessAuditAiSuggestionDemo</h4>
                <p>Suggest process improvements based on audit findings</p>
              </tr-card>
            </router-link>
          </div>
        </tr-card>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrCard, TrButton } from '@tranyu/ui';
</script>

<style scoped>
.ai-component-demo {
  padding: var(--tr-spacing-6);
}

.ai-component-demo__checklist {
  margin-bottom: var(--tr-spacing-8);
}

.ai-component-demo__checklist h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin-bottom: var(--tr-spacing-4);
}

.ai-component-demo__checklist ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.ai-component-demo__checklist li {
  color: var(--tr-color-neutral700);
  font-size: 14px;
}

.ai-component-demo__demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tr-spacing-4);
  margin-top: var(--tr-spacing-6);
}

.ai-component-demo__demo-link {
  text-decoration: none;
  color: inherit;
}

.ai-component-demo__demo-link h4 {
  color: var(--tr-color-primary);
  margin-bottom: var(--tr-spacing-2);
}

.ai-component-demo__demo-link p {
  color: var(--tr-color-neutral600);
  font-size: 13px;
}
</style>
