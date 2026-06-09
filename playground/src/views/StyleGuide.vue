<template>
  <div class="style-guide">
    <tr-page-header
      title="设计令牌与组件库"
      subtitle="创与 UI 体系 - 完整的设计系统"
      show-back="false"
    >
      <template #extra>
        <router-link to="/objects" class="nav-link">
          <tr-button type="secondary" size="small">查看演示页面</tr-button>
        </router-link>
      </template>
    </tr-page-header>

    <div class="style-guide__container">
      <!-- Buttons -->
      <tr-card title="按钮" class="style-guide__section">
        <div class="style-guide__grid">
          <div class="style-guide__group">
            <h4>主按钮</h4>
            <tr-button type="primary" size="large">大</tr-button>
            <tr-button type="primary" size="medium">中</tr-button>
            <tr-button type="primary" size="small">小</tr-button>
            <tr-button type="primary" size="mini">超小</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>次按钮</h4>
            <tr-button type="secondary" size="large">大</tr-button>
            <tr-button type="secondary" size="medium">中</tr-button>
            <tr-button type="secondary" size="small">小</tr-button>
            <tr-button type="secondary" size="mini">超小</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>禁用状态</h4>
            <tr-button type="primary" disabled>已禁用</tr-button>
            <tr-button type="secondary" disabled>已禁用</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>加载状态</h4>
            <tr-button type="primary" loading>加载中</tr-button>
          </div>
        </div>
      </tr-card>

      <!-- Cards -->
      <tr-card title="卡片" class="style-guide__section">
        <div class="style-guide__grid">
          <tr-card>
            <p>默认卡片内容</p>
          </tr-card>
          <tr-card title="卡片标题">
            <p>带标题和内容的卡片</p>
          </tr-card>
          <tr-card title="带页脚的卡片">
            <p>包含标题、内容和页脚的卡片</p>
            <template #footer>
              <div class="style-guide__footer">
                <tr-button type="primary" size="small">操作</tr-button>
              </div>
            </template>
          </tr-card>
        </div>
      </tr-card>

      <!-- Tags -->
      <tr-card title="标签" class="style-guide__section">
        <div class="style-guide__tags">
          <tr-tag color="red">红色</tr-tag>
          <tr-tag color="orange">橙色</tr-tag>
          <tr-tag color="gold">金色</tr-tag>
          <tr-tag color="green">绿色</tr-tag>
          <tr-tag color="blue">蓝色</tr-tag>
          <tr-tag color="purple">紫色</tr-tag>
          <tr-tag color="gray">灰色</tr-tag>
        </div>
        <div class="style-guide__tags">
          <tr-tag color="blue" size="large">大</tr-tag>
          <tr-tag color="blue" size="medium">中</tr-tag>
          <tr-tag color="blue" size="small">小</tr-tag>
        </div>
        <div class="style-guide__tags">
          <tr-tag color="blue" closable>可关闭标签</tr-tag>
        </div>
      </tr-card>

      <!-- Table -->
      <tr-card title="表格" class="style-guide__section">
        <tr-table
          :columns="tableColumns"
          :data="tableData"
          :pagination="{ pageSize: 10 }"
        />
      </tr-card>

      <!-- Drawer -->
      <tr-card title="抽屉" class="style-guide__section">
        <tr-button type="primary" @click="showDrawer = true">
          打开抽屉
        </tr-button>
        <tr-drawer
          title="抽屉标题"
          :visible="showDrawer"
          @cancel="showDrawer = false"
        >
          <p>抽屉内容在这里</p>
          <p>这是一个模态抽屉组件</p>
        </tr-drawer>
      </tr-card>

      <!-- Workspace Card -->
      <tr-card title="工作区卡片" class="style-guide__section">
        <div class="workspace-card">
          <div class="workspace-card__icon">📊</div>
          <div class="workspace-card__content">
            <h4>工作区标题</h4>
            <p>工作区描述信息</p>
          </div>
          <div class="workspace-card__action">
            <tr-button type="primary" size="small">操作</tr-button>
          </div>
        </div>
      </tr-card>

      <!-- Object List -->
      <tr-card title="对象列表" class="style-guide__section">
        <div class="object-list">
          <div v-for="item in 5" :key="item" class="object-list__item">
            <div class="object-list__icon">📁</div>
            <div class="object-list__content">
              <h4>对象 {{ item }}</h4>
              <p>对象描述信息</p>
            </div>
            <div class="object-list__meta">
              <span>2 天前更新</span>
            </div>
          </div>
        </div>
      </tr-card>

      <!-- Colors -->
      <tr-card title="色彩体系" class="style-guide__section">
        <div class="color-palette">
          <div class="color-row">
            <div
              v-for="i in 10"
              :key="i"
              class="color-swatch"
              :style="{ backgroundColor: `var(--tr-color-neutral${(i - 1) * 100})` }"
            >
              <span>neutral{{ (i - 1) * 100 }}</span>
            </div>
          </div>
          <div class="color-row">
            <div class="color-swatch" style="background-color: var(--tr-color-primary)">
              <span>primary</span>
            </div>
            <div class="color-swatch" style="background-color: var(--tr-color-success)">
              <span>success</span>
            </div>
            <div class="color-swatch" style="background-color: var(--tr-color-warning)">
              <span>warning</span>
            </div>
            <div class="color-swatch" style="background-color: var(--tr-color-danger)">
              <span>danger</span>
            </div>
            <div class="color-swatch" style="background-color: var(--tr-color-info)">
              <span>info</span>
            </div>
          </div>
        </div>
      </tr-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrButton, TrCard, TrTag, TrTable, TrDrawer, TrPageHeader } from '@tranyu/ui';

const showDrawer = ref(false);

const tableColumns = [
  { title: '名称', dataIndex: 'name' },
  { title: '类型', dataIndex: 'type' },
  { title: '状态', dataIndex: 'status' },
  { title: '创建日期', dataIndex: 'created' },
];

const tableData = [
  { name: '项目 1', type: '类型 A', status: '活跃', created: '2024-01-01' },
  { name: '项目 2', type: '类型 B', status: '活跃', created: '2024-01-02' },
  { name: '项目 3', type: '类型 C', status: '已关闭', created: '2024-01-03' },
  { name: '项目 4', type: '类型 A', status: '活跃', created: '2024-01-04' },
  { name: '项目 5', type: '类型 B', status: '活跃', created: '2024-01-05' },
];
</script>

<style scoped>
.nav-link {
  text-decoration: none;
}

.style-guide {
  min-height: 100vh;
  background-color: var(--tr-color-neutral50);
}

.style-guide__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--tr-spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.style-guide__section {
  width: 100%;
}

.style-guide__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--tr-spacing-6);
}

.style-guide__group {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.style-guide__group h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--tr-color-neutral700);
  margin: 0;
}

.style-guide__group button {
  width: 100%;
}

.style-guide__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--tr-spacing-3);
  margin-bottom: var(--tr-spacing-6);
}

.style-guide__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--tr-spacing-3);
}

.workspace-card {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-6);
  padding: var(--tr-spacing-6);
  background: linear-gradient(135deg, var(--tr-color-neutral50) 0%, var(--tr-color-neutral100) 100%);
  border-radius: var(--tr-radius-lg);
}

.workspace-card__icon {
  font-size: 40px;
  flex-shrink: 0;
}

.workspace-card__content {
  flex: 1;
}

.workspace-card__content h4 {
  margin: 0 0 var(--tr-spacing-2) 0;
  font-size: 16px;
  font-weight: 600;
}

.workspace-card__content p {
  margin: 0;
  color: var(--tr-color-neutral600);
  font-size: 14px;
}

.object-list {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-4);
}

.object-list__item {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
  border-radius: var(--tr-radius-md);
  border: 1px solid var(--tr-color-neutral200);
  transition: all var(--tr-motion-normal);
}

.object-list__item:hover {
  background-color: var(--tr-color-neutral50);
  box-shadow: var(--tr-shadow-sm);
}

.object-list__icon {
  font-size: 24px;
  flex-shrink: 0;
}

.object-list__content {
  flex: 1;
}

.object-list__content h4 {
  margin: 0 0 var(--tr-spacing-1) 0;
  font-size: 14px;
  font-weight: 600;
}

.object-list__content p {
  margin: 0;
  color: var(--tr-color-neutral600);
  font-size: 12px;
}

.object-list__meta {
  color: var(--tr-color-neutral500);
  font-size: 12px;
  flex-shrink: 0;
}

.color-palette {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.color-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--tr-spacing-4);
}

.color-swatch {
  aspect-ratio: 1;
  border-radius: var(--tr-radius-md);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--tr-spacing-2);
  box-shadow: var(--tr-shadow-sm);
  font-size: 11px;
  font-weight: 500;
  color: var(--tr-color-neutral900);
  text-align: center;
  word-break: break-word;
}
</style>
