<template>
  <div class="style-guide">
    <tr-page-header
      title="TranYu UI Kit"
      subtitle="Design System & Component Library"
      show-back="false"
    >
      <template #extra>
        <router-link to="/objects" class="nav-link">
          <tr-button type="secondary" size="small">View Demo Page</tr-button>
        </router-link>
      </template>
    </tr-page-header>

    <div class="style-guide__container">
      <!-- Buttons -->
      <tr-card title="Buttons" class="style-guide__section">
        <div class="style-guide__grid">
          <div class="style-guide__group">
            <h4>Primary</h4>
            <tr-button type="primary" size="large">Large</tr-button>
            <tr-button type="primary" size="medium">Medium</tr-button>
            <tr-button type="primary" size="small">Small</tr-button>
            <tr-button type="primary" size="mini">Mini</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>Secondary</h4>
            <tr-button type="secondary" size="large">Large</tr-button>
            <tr-button type="secondary" size="medium">Medium</tr-button>
            <tr-button type="secondary" size="small">Small</tr-button>
            <tr-button type="secondary" size="mini">Mini</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>Disabled</h4>
            <tr-button type="primary" disabled>Disabled</tr-button>
            <tr-button type="secondary" disabled>Disabled</tr-button>
          </div>
          <div class="style-guide__group">
            <h4>Loading</h4>
            <tr-button type="primary" loading>Loading</tr-button>
          </div>
        </div>
      </tr-card>

      <!-- Cards -->
      <tr-card title="Cards" class="style-guide__section">
        <div class="style-guide__grid">
          <tr-card>
            <p>Card with default content</p>
          </tr-card>
          <tr-card title="Card Title">
            <p>Card with header and content</p>
          </tr-card>
          <tr-card title="Card with Footer">
            <p>Card with header, content and footer</p>
            <template #footer>
              <div class="style-guide__footer">
                <tr-button type="primary" size="small">Action</tr-button>
              </div>
            </template>
          </tr-card>
        </div>
      </tr-card>

      <!-- Tags -->
      <tr-card title="Tags" class="style-guide__section">
        <div class="style-guide__tags">
          <tr-tag color="red">Red</tr-tag>
          <tr-tag color="orange">Orange</tr-tag>
          <tr-tag color="gold">Gold</tr-tag>
          <tr-tag color="green">Green</tr-tag>
          <tr-tag color="blue">Blue</tr-tag>
          <tr-tag color="purple">Purple</tr-tag>
          <tr-tag color="gray">Gray</tr-tag>
        </div>
        <div class="style-guide__tags">
          <tr-tag color="blue" size="large">Large</tr-tag>
          <tr-tag color="blue" size="medium">Medium</tr-tag>
          <tr-tag color="blue" size="small">Small</tr-tag>
        </div>
        <div class="style-guide__tags">
          <tr-tag color="blue" closable>Closable Tag</tr-tag>
        </div>
      </tr-card>

      <!-- Table -->
      <tr-card title="Table" class="style-guide__section">
        <tr-table
          :columns="tableColumns"
          :data="tableData"
          :pagination="{ pageSize: 10 }"
        />
      </tr-card>

      <!-- Drawer -->
      <tr-card title="Drawer" class="style-guide__section">
        <tr-button type="primary" @click="showDrawer = true">
          Open Drawer
        </tr-button>
        <tr-drawer
          title="Drawer Title"
          :visible="showDrawer"
          @cancel="showDrawer = false"
        >
          <p>Drawer content goes here</p>
          <p>This is a modal drawer component</p>
        </tr-drawer>
      </tr-card>

      <!-- Workspace Card -->
      <tr-card title="Workspace Card" class="style-guide__section">
        <div class="workspace-card">
          <div class="workspace-card__icon">📊</div>
          <div class="workspace-card__content">
            <h4>Workspace Title</h4>
            <p>Workspace description</p>
          </div>
          <div class="workspace-card__action">
            <tr-button type="primary" size="small">Action</tr-button>
          </div>
        </div>
      </tr-card>

      <!-- Object List -->
      <tr-card title="Object List" class="style-guide__section">
        <div class="object-list">
          <div v-for="item in 5" :key="item" class="object-list__item">
            <div class="object-list__icon">📁</div>
            <div class="object-list__content">
              <h4>Object {{ item }}</h4>
              <p>Object description</p>
            </div>
            <div class="object-list__meta">
              <span>Updated 2 days ago</span>
            </div>
          </div>
        </div>
      </tr-card>

      <!-- Colors -->
      <tr-card title="Color Palette" class="style-guide__section">
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
  { title: 'Name', dataIndex: 'name' },
  { title: 'Type', dataIndex: 'type' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Created', dataIndex: 'created' },
];

const tableData = [
  { name: 'Item 1', type: 'Type A', status: 'Active', created: '2024-01-01' },
  { name: 'Item 2', type: 'Type B', status: 'Active', created: '2024-01-02' },
  { name: 'Item 3', type: 'Type C', status: 'Inactive', created: '2024-01-03' },
  { name: 'Item 4', type: 'Type A', status: 'Active', created: '2024-01-04' },
  { name: 'Item 5', type: 'Type B', status: 'Active', created: '2024-01-05' },
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
