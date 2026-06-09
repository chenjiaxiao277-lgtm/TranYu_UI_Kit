<template>
  <div :class="['tr-card', { 'tr-card--hoverable': hoverable }]">
    <div v-if="title" class="tr-card__header">
      <h3 class="tr-card__title">{{ title }}</h3>
    </div>
    <div class="tr-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="tr-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  hoverable?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  hoverable: true,
});
</script>

<style scoped>
.tr-card {
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-lg);
  overflow: hidden;
}

.tr-card--hoverable {
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
  box-shadow: var(--tr-shadow-sm);
}

.tr-card--hoverable:hover {
  box-shadow: var(--tr-shadow-md);
  border-color: var(--tr-color-neutral300);
}

.tr-card__header {
  padding: var(--tr-spacing-6);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.tr-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.tr-card__body {
  padding: var(--tr-spacing-6);
}

.tr-card__footer {
  padding: var(--tr-spacing-6);
  border-top: 1px solid var(--tr-color-neutral200);
  background-color: var(--tr-color-neutral50);
}
</style>
