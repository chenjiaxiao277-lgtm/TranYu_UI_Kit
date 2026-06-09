<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="TranYu UI Kit" subtitle="Component Library v0.5.0" />
      </template>

      <div class="demo-home">
        <div class="demo-home__intro">
          <h2>Welcome to TranYu UI Component Library</h2>
          <p>Enterprise-grade Vue 3 components with design tokens and business logic reusability</p>
        </div>

        <div class="demo-home__section">
          <h3>📚 Foundation</h3>
          <div class="demo-home__grid">
            <router-link to="/style-guide" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🎨</div>
                  <h4>Style Guide</h4>
                  <p>Design tokens, colors, spacing, and typography</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🎯 Layout System (v0.2.0)</h3>
          <div class="demo-home__grid">
            <router-link to="/layout-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📐</div>
                  <h4>Layout Demo</h4>
                  <p>AppLayout, HeaderBar, SideBar, PageContainer</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/workbench" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🏢</div>
                  <h4>Workbench Layout</h4>
                  <p>Complete application workbench example</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🔧 Business Objects (v0.3.0)</h3>
          <div class="demo-home__grid">
            <router-link to="/object-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📦</div>
                  <h4>Object Components Hub</h4>
                  <p>Configuration-driven object components</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/project" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🎯</div>
                  <h4>Project Object</h4>
                  <p>Project management with status, budget, progress</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/demand" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📋</div>
                  <h4>Demand Object</h4>
                  <p>Requirement management with priority, assignee</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/risk" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">⚠️</div>
                  <h4>Risk Object</h4>
                  <p>Risk tracking with level, probability, impact</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>⚙️ Process Workflows (v0.4.0)</h3>
          <div class="demo-home__grid">
            <router-link to="/process-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🔄</div>
                  <h4>Process Components Hub</h4>
                  <p>Workflow and approval components</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/project-approval" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">✅</div>
                  <h4>Project Approval</h4>
                  <p>Platform v3.0 project initiation workflow</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/demand-review" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📝</div>
                  <h4>Demand Review</h4>
                  <p>API Design Review approval process</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/risk-close" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🔐</div>
                  <h4>Risk Closure</h4>
                  <p>Schedule Delay risk closure workflow</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🤖 AI Actions (v0.5.0)</h3>
          <div class="demo-home__grid">
            <router-link to="/ai-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">✨</div>
                  <h4>AI Components Hub</h4>
                  <p>AI-driven assistance and suggestions</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/requirement-generate" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📄</div>
                  <h4>Requirement AI</h4>
                  <p>AI generation of requirement specs</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/stage-gate-check" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🚪</div>
                  <h4>Stage Gate AI</h4>
                  <p>AI validation of deliverables</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/project-risk-summary" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📊</div>
                  <h4>Risk Summary AI</h4>
                  <p>AI risk analysis and mitigation</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/process-audit-suggestion" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">💡</div>
                  <h4>Process Audit AI</h4>
                  <p>AI suggestions for improvements</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__footer">
          <p>🚀 All components reuse design tokens and business logic patterns</p>
          <p>📦 Configuration-driven architecture enables rapid feature deployment</p>
        </div>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, TrPageHeader, TrCard } from '@tranyu/ui';
</script>

<style scoped>
.demo-home {
  padding: var(--tr-spacing-6);
}

.demo-home__intro {
  margin-bottom: var(--tr-spacing-8);
  text-align: center;
}

.demo-home__intro h2 {
  color: var(--tr-color-neutral900);
  font-size: 28px;
  margin: 0 0 var(--tr-spacing-3) 0;
}

.demo-home__intro p {
  color: var(--tr-color-neutral600);
  font-size: 16px;
  margin: 0;
}

.demo-home__section {
  margin-bottom: var(--tr-spacing-8);
}

.demo-home__section h3 {
  color: var(--tr-color-neutral900);
  font-size: 18px;
  margin: 0 0 var(--tr-spacing-4) 0;
  padding-bottom: var(--tr-spacing-3);
  border-bottom: 2px solid var(--tr-color-primary);
}

.demo-home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--tr-spacing-4);
}

.demo-home__card {
  text-decoration: none;
  color: inherit;
  transition: transform var(--tr-motion-normal);
}

.demo-home__card:hover {
  transform: translateY(-4px);
}

.demo-home__card-content {
  padding: var(--tr-spacing-2);
  text-align: center;
}

.demo-home__card-icon {
  font-size: 32px;
  margin-bottom: var(--tr-spacing-2);
  display: block;
}

.demo-home__card h4 {
  color: var(--tr-color-primary);
  font-size: 16px;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.demo-home__card p {
  color: var(--tr-color-neutral600);
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

.demo-home__footer {
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-md);
  border-left: 3px solid var(--tr-color-primary);
  text-align: center;
  margin-top: var(--tr-spacing-8);
}

.demo-home__footer p {
  color: var(--tr-color-neutral700);
  font-size: 14px;
  margin: 0 0 var(--tr-spacing-2) 0;
}

.demo-home__footer p:last-child {
  margin: 0;
}
</style>
