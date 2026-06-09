<template>
  <app-layout :show-sidebar="true">
    <page-container>
      <template #header>
        <tr-page-header title="工作台布局演示" subtitle="完整应用工作台示例" />
      </template>

      <tool-bar>
        <template #left>
          <tr-button type="primary">+ 新建</tr-button>
        </template>
        <template #center>
          <input type="text" placeholder="搜索..." style="padding: 8px; border: 1px solid var(--tr-color-neutral300); border-radius: 4px; width: 200px;">
        </template>
        <template #right>
          <tr-button type="secondary" size="small">⟳ 刷新</tr-button>
        </template>
      </tool-bar>

      <div class="workbench-demo">
        <tr-card title="工作台内容区域">
          <div class="demo-content">
            <h3>欢迎使用工作台</h3>
            <p>这是一个完整的工作台布局演示，展示了应用程序的标准结构。</p>
            <div class="demo-grid">
              <tr-card>
                <h4>指标卡 1</h4>
                <p style="font-size: 24px; font-weight: 600; color: var(--tr-color-primary);">1,234</p>
                <p style="font-size: 12px; color: var(--tr-color-neutral600);">总数</p>
              </tr-card>
              <tr-card>
                <h4>指标卡 2</h4>
                <p style="font-size: 24px; font-weight: 600; color: var(--tr-color-success);">567</p>
                <p style="font-size: 12px; color: var(--tr-color-neutral600);">已完成</p>
              </tr-card>
              <tr-card>
                <h4>指标卡 3</h4>
                <p style="font-size: 24px; font-weight: 600; color: var(--tr-color-warning);">89</p>
                <p style="font-size: 12px; color: var(--tr-color-neutral600);">进行中</p>
              </tr-card>
            </div>
          </div>
        </tr-card>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout, PageContainer, ToolBar, TrPageHeader, TrButton, TrCard } from '@tranyu/ui';
</script>

<style scoped>
.workbench-demo {
  padding: var(--tr-spacing-6);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.demo-content h3 {
  margin: 0;
  color: var(--tr-color-neutral900);
  font-size: 18px;
}

.demo-content p {
  margin: 0;
  color: var(--tr-color-neutral600);
  font-size: 14px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--tr-spacing-4);
}

.demo-grid tr-card {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.demo-grid h4 {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--tr-color-neutral700);
}
</style>
