<template>
  <div class="app-layout">
    <header-bar :show-sidebar-toggle="showSidebarToggle" @toggle-sidebar="$emit('toggleSidebar')" />
    <div class="app-layout__main">
      <side-bar v-show="showSidebar" class="app-layout__sidebar" @navigate="$emit('navigate', $event)" />
      <main class="app-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
import SideBar from './SideBar.vue';

interface Props {
  showSidebar?: boolean;
  showSidebarToggle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showSidebar: true,
  showSidebarToggle: true,
});

defineEmits<{
  toggleSidebar: [];
  navigate: [path: string];
}>();
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--tr-color-neutral50);
}

.app-layout__main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-layout__sidebar {
  width: 280px;
  background-color: var(--tr-color-neutral900);
  color: var(--tr-color-neutral0);
  overflow-y: auto;
  border-right: 1px solid var(--tr-color-neutral800);
}

.app-layout__content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--tr-color-neutral50);
}
</style>
