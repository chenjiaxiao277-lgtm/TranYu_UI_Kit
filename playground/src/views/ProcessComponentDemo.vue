<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="Process Components" subtitle="v0.4.0" />
      </template>

      <tool-bar>
        <template #left>
          <router-link to="/process/project-approval" style="text-decoration: none">
            <tr-button type="primary">Project Approval</tr-button>
          </router-link>
          <router-link to="/process/demand-review" style="text-decoration: none">
            <tr-button type="secondary">Demand Review</tr-button>
          </router-link>
          <router-link to="/process/risk-close" style="text-decoration: none">
            <tr-button type="secondary">Risk Close</tr-button>
          </router-link>
        </template>
      </tool-bar>

      <div class="process-component-demo">
        <tr-card title="Process Components Hub">
          <div class="process-component-demo__checklist">
            <h3>Component Status</h3>
            <ul>
              <li>✓ ProcessStatusTag - Status badge with overdue indicator</li>
              <li>✓ ProcessTimeline - Node progress visualization</li>
              <li>✓ ProcessActionBar - Dynamic action buttons</li>
              <li>✓ ProcessTaskCard - Task display with assignee/due date</li>
              <li>✓ ProcessLogList - Audit trail display</li>
              <li>✓ ProcessNodeCard - Node card with status</li>
              <li>✓ ProcessAuditResult - Log entry with details</li>
              <li>✓ ApprovalActionModal - Remark input for approvals</li>
            </ul>
          </div>

          <h3>Demo Pages</h3>
          <div class="process-component-demo__demos">
            <router-link to="/process/project-approval">
              <tr-card hoverable class="process-component-demo__demo-link">
                <h4>ProjectApprovalDemo</h4>
                <p>Platform v3.0 initiation process</p>
              </tr-card>
            </router-link>
            <router-link to="/process/demand-review">
              <tr-card hoverable class="process-component-demo__demo-link">
                <h4>DemandReviewDemo</h4>
                <p>API Design Review process</p>
              </tr-card>
            </router-link>
            <router-link to="/process/risk-close">
              <tr-card hoverable class="process-component-demo__demo-link">
                <h4>RiskCloseDemo</h4>
                <p>Schedule Delay closure process</p>
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
import { useRouter } from 'vue-router';

useRouter();
</script>

<style scoped>
.process-component-demo {
  padding: var(--tr-spacing-6);
}

.process-component-demo__checklist {
  margin-bottom: var(--tr-spacing-8);
}

.process-component-demo__checklist h3 {
  color: var(--tr-color-neutral900);
  font-size: 16px;
  margin-bottom: var(--tr-spacing-4);
}

.process-component-demo__checklist ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.process-component-demo__checklist li {
  color: var(--tr-color-neutral700);
  font-size: 14px;
}

.process-component-demo__demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tr-spacing-4);
  margin-top: var(--tr-spacing-6);
}

.process-component-demo__demo-link {
  text-decoration: none;
  color: inherit;
}

.process-component-demo__demo-link h4 {
  color: var(--tr-color-primary);
  margin-bottom: var(--tr-spacing-2);
}

.process-component-demo__demo-link p {
  color: var(--tr-color-neutral600);
  font-size: 13px;
}
</style>
