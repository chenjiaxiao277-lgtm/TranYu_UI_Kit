<template>
  <app-layout :show-sidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar">
    <page-container>
      <template #header>
        <tr-page-header
          title="Object Components"
          subtitle="Configurable object rendering system - ProjectDemo, DemandDemo, RiskDemo"
        >
          <template #extra>
            <router-link to="/object-demo/project" class="nav-link">
              <tr-button type="secondary" size="small">Project Demo</tr-button>
            </router-link>
          </template>
        </tr-page-header>
      </template>

      <div class="object-component-demo">
        <tr-card title="Available Demos" class="object-component-demo__card">
          <div class="object-component-demo__grid">
            <div class="object-component-demo__item">
              <h4>Project Objects</h4>
              <p>Demonstrates project list, detail view, and filtering</p>
              <router-link to="/object-demo/project">
                <tr-button type="primary" size="small">View Demo</tr-button>
              </router-link>
            </div>
            <div class="object-component-demo__item">
              <h4>Demand Objects</h4>
              <p>Demonstrates demand/requirement list, detail view, and filtering</p>
              <router-link to="/object-demo/demand">
                <tr-button type="primary" size="small">View Demo</tr-button>
              </router-link>
            </div>
            <div class="object-component-demo__item">
              <h4>Risk Objects</h4>
              <p>Demonstrates risk list, detail view, and filtering</p>
              <router-link to="/object-demo/risk">
                <tr-button type="primary" size="small">View Demo</tr-button>
              </router-link>
            </div>
          </div>
        </tr-card>

        <tr-card title="Component Features" class="object-component-demo__card">
          <ul class="object-component-demo__features">
            <li>✓ ObjectFieldRenderer - Auto render 16+ field types</li>
            <li>✓ ObjectStatusTag - Unified status colors</li>
            <li>✓ ObjectTable - Dynamic table from config</li>
            <li>✓ ObjectDetailDrawer - Detail modal view</li>
            <li>✓ ObjectToolbar - Search, create, refresh</li>
            <li>✓ ObjectForm - Dynamic form (P1)</li>
            <li>✓ ObjectFilterBar - Filter controls (P1)</li>
            <li>✓ ObjectRelationPanel - Related objects (P1)</li>
          </ul>
        </tr-card>
      </div>
    </page-container>
  </app-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  AppLayout,
  PageContainer,
  TrPageHeader,
  TrCard,
  TrButton,
} from '@tranyu/ui';

const showSidebar = ref(true);
</script>

<style scoped>
.nav-link {
  text-decoration: none;
}

.object-component-demo {
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-6);
}

.object-component-demo__card {
  width: 100%;
}

.object-component-demo__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tr-spacing-6);
}

.object-component-demo__item {
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-radius: var(--tr-radius-lg);
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-3);
}

.object-component-demo__item h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.object-component-demo__item p {
  margin: 0;
  font-size: 13px;
  color: var(--tr-color-neutral600);
}

.object-component-demo__features {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--tr-spacing-2);
}

.object-component-demo__features li {
  font-size: 13px;
  color: var(--tr-color-neutral700);
}
</style>
