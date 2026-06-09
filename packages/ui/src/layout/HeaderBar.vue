<template>
  <header class="header-bar">
    <div class="header-bar__left">
      <button v-if="showSidebarToggle" class="header-bar__toggle" @click="$emit('toggleSidebar')">
        ☰
      </button>
      <div class="header-bar__logo">TranYu</div>
    </div>
    <div class="header-bar__center">
      <slot name="center" />
    </div>
    <div class="header-bar__right">
      <theme-switch />
      <user-avatar-menu />
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue';
import UserAvatarMenu from './UserAvatarMenu.vue';

interface Props {
  showSidebarToggle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showSidebarToggle: true,
});

defineEmits<{
  toggleSidebar: [];
}>();
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: var(--tr-color-neutral0);
  border-bottom: 1px solid var(--tr-color-neutral200);
  padding: 0 var(--tr-spacing-6);
  gap: var(--tr-spacing-4);
}

.header-bar__left {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-4);
  flex-shrink: 0;
}

.header-bar__toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--tr-color-neutral900);
  padding: var(--tr-spacing-2);
  transition: all var(--tr-motion-normal);
}

.header-bar__toggle:hover {
  color: var(--tr-color-primary);
  background-color: var(--tr-color-neutral100);
  border-radius: var(--tr-radius-md);
}

.header-bar__logo {
  font-size: 18px;
  font-weight: 600;
  color: var(--tr-color-primary);
  white-space: nowrap;
}

.header-bar__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-bar__right {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-4);
  flex-shrink: 0;
}
</style>
