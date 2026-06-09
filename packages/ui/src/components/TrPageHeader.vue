<template>
  <div class="tr-page-header">
    <div class="tr-page-header__top">
      <div class="tr-page-header__back" v-if="showBack" @click="$emit('back')">
        <a-icon icon="icon-arrow-left" />
      </div>
      <div class="tr-page-header__content">
        <h1 class="tr-page-header__title">{{ title }}</h1>
        <p v-if="subtitle" class="tr-page-header__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.extra" class="tr-page-header__extra">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="$slots.default" class="tr-page-header__breadcrumb">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AIcon } from '@arco-design/web-vue';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

defineEmits<{
  back: [];
}>();

withDefaults(defineProps<Props>(), {
  showBack: true,
});
</script>

<style scoped>
.tr-page-header {
  background-color: var(--tr-color-neutral0);
  border-bottom: 1px solid var(--tr-color-neutral200);
  padding: var(--tr-spacing-6);
  margin-bottom: var(--tr-spacing-6);
}

.tr-page-header__top {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-4);
}

.tr-page-header__back {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--tr-color-primary);
  transition: color var(--tr-motion-normal);
}

.tr-page-header__back:hover {
  color: var(--tr-color-primaryDark);
}

.tr-page-header__content {
  flex: 1;
}

.tr-page-header__title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.tr-page-header__subtitle {
  margin: var(--tr-spacing-2) 0 0;
  font-size: 14px;
  color: var(--tr-color-neutral600);
}

.tr-page-header__extra {
  display: flex;
  gap: var(--tr-spacing-4);
}

.tr-page-header__breadcrumb {
  margin-top: var(--tr-spacing-4);
}
</style>
