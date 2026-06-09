<template>
  <button :title="`Switch to ${isDark ? 'light' : 'dark'} mode`" class="theme-switch" @click="toggleTheme">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};
</script>

<style scoped>
.theme-switch {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: var(--tr-spacing-2);
  transition: all var(--tr-motion-normal);
  color: var(--tr-color-neutral700);
  border-radius: var(--tr-radius-md);
}

.theme-switch:hover {
  background-color: var(--tr-color-neutral100);
  color: var(--tr-color-primary);
}
</style>
