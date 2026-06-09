<template>
  <a-button
    :type="type"
    :size="size"
    :status="status"
    :disabled="disabled"
    :loading="loading"
    :class="['tr-button', `tr-button--${type}`, `tr-button--${size}`]"
    v-bind="$attrs"
  >
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import { Button as AButton } from '@arco-design/web-vue';

interface Props {
  type?: 'primary' | 'secondary' | 'dashed' | 'text' | 'outline';
  size?: 'mini' | 'small' | 'medium' | 'large';
  status?: 'success' | 'warning' | 'error' | 'normal';
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  status: 'normal',
  disabled: false,
  loading: false,
});
</script>

<style scoped>
.tr-button {
  border-radius: var(--tr-radius-md);
  font-weight: 500;
  transition: all var(--tr-motion-normal) var(--tr-motion-easeInOut);
}

.tr-button--primary {
  background-color: var(--tr-color-primary);
  border-color: var(--tr-color-primary);
  color: var(--tr-color-neutral0);
}

.tr-button--primary:hover:not(:disabled) {
  background-color: var(--tr-color-primaryLight);
  border-color: var(--tr-color-primaryLight);
}

.tr-button--secondary {
  background-color: var(--tr-color-neutral100);
  border-color: var(--tr-color-neutral300);
  color: var(--tr-color-neutral900);
}

.tr-button--large {
  padding: var(--tr-spacing-4) var(--tr-spacing-6);
}

.tr-button--medium {
  padding: var(--tr-spacing-3) var(--tr-spacing-5);
}

.tr-button--small {
  padding: var(--tr-spacing-2) var(--tr-spacing-4);
}
</style>
