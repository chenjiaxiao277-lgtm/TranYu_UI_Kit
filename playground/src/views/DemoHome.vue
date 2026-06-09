<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="创与前端组件库" subtitle="AI原生流程型企业经营管理平台组件体系 v0.6.0" />
      </template>

      <div class="demo-home">
        <div class="demo-home__intro">
          <h2>欢迎使用创与前端组件库</h2>
          <p>企业级 Vue 3 组件体系，集成设计令牌、业务逻辑复用和 AI 原生能力</p>
        </div>

        <div class="demo-home__section">
          <h3>📚 基础设计</h3>
          <div class="demo-home__grid">
            <router-link to="/style-guide" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🎨</div>
                  <h4>设计令牌</h4>
                  <p>色彩、间距、圆角、阴影和动画标准</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🎯 平台布局</h3>
          <div class="demo-home__grid">
            <router-link to="/layout-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📐</div>
                  <h4>布局演示</h4>
                  <p>应用框架、页面容器、侧边栏、页面头部</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/workbench" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🏢</div>
                  <h4>工作台布局</h4>
                  <p>完整应用工作台示例</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🔧 业务对象</h3>
          <div class="demo-home__grid">
            <router-link to="/object-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📦</div>
                  <h4>对象组件中心</h4>
                  <p>配置驱动的对象组件系统</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/project" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🎯</div>
                  <h4>项目管理</h4>
                  <p>项目状态、预算、进度管理</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/demand" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📋</div>
                  <h4>需求管理</h4>
                  <p>需求优先级、责任人、状态跟踪</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/object-demo/risk" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">⚠️</div>
                  <h4>风险管理</h4>
                  <p>风险等级、概率、影响评估</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>⚙️ 流程工作流</h3>
          <div class="demo-home__grid">
            <router-link to="/process-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🔄</div>
                  <h4>流程组件中心</h4>
                  <p>工作流、审批流和时间线组件</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/project-approval" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">✅</div>
                  <h4>项目审批</h4>
                  <p>平台 v3.0 项目启动审批流程</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/demand-review" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📝</div>
                  <h4>需求评审</h4>
                  <p>API 设计评审流程</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/process/risk-close" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🔐</div>
                  <h4>风险关闭</h4>
                  <p>进度延期风险关闭流程</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>🤖 AI智能辅助</h3>
          <div class="demo-home__grid">
            <router-link to="/ai-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">✨</div>
                  <h4>AI 组件中心</h4>
                  <p>AI 驱动的内容生成、检查和建议</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/requirement-generate" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📄</div>
                  <h4>需求生成 AI</h4>
                  <p>AI 生成需求说明书</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/stage-gate-check" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🚪</div>
                  <h4>阶段评审 AI</h4>
                  <p>AI 验证交付物质量</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/project-risk-summary" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📊</div>
                  <h4>风险分析 AI</h4>
                  <p>AI 风险分析和应对建议</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/ai/process-audit-suggestion" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">💡</div>
                  <h4>流程优化 AI</h4>
                  <p>AI 流程改进建议</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__section">
          <h3>📊 经营驾驶舱</h3>
          <div class="demo-home__grid">
            <router-link to="/dashboard-component-demo" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">📈</div>
                  <h4>驾驶舱组件</h4>
                  <p>指标卡、趋势图、图表、组件系统</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/dashboard/business-cockpit" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">💼</div>
                  <h4>经营驾驶舱</h4>
                  <p>收入、合同、项目、风险总览</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/dashboard/process-governance" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">⚙️</div>
                  <h4>流程治理</h4>
                  <p>工作流健康度、分布和风险</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/dashboard/risk-warning" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">⚠️</div>
                  <h4>风险预警</h4>
                  <p>风险监控和应对跟踪</p>
                </div>
              </tr-card>
            </router-link>
            <router-link to="/dashboard/ai-insight" class="demo-home__card">
              <tr-card hoverable>
                <div class="demo-home__card-content">
                  <div class="demo-home__card-icon">🤖</div>
                  <h4>AI 经营分析</h4>
                  <p>机遇、风险、优化、建议</p>
                </div>
              </tr-card>
            </router-link>
          </div>
        </div>

        <div class="demo-home__footer">
          <p>🚀 所有组件基于统一的设计令牌和业务逻辑模式构建</p>
          <p>📦 配置驱动的架构设计，加速业务功能快速迭代</p>
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
