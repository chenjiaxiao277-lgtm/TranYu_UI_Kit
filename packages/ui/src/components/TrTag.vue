<template>
  <a-tag
    :color="color"
    :size="size"
    :closable="closable"
    :class="['tr-tag', `tr-tag--${size}`]"
    v-bind="$attrs"
    @close="$emit('close')"
  >
    <slot />
  </a-tag>
</template>

<script setup lang="ts">
import { Tag as ATag } from '@arco-design/web-vue';

interface Props {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
}

defineEmits<{
  close: [];
}>();

withDefaults(defineProps<Props>(), {
  color: 'blue',
  size: 'medium',
  closable: false,
});
</script>

<style scoped>
.tr-tag {
  border-radius: var(--tr-radius-md);
  padding: var(--tr-spacing-2) var(--tr-spacing-3);
  font-size: 12px;
  font-weight: 500;
}

.tr-tag--small {
  padding: var(--tr-spacing-1) var(--tr-spacing-2);
  font-size: 11px;
}

.tr-tag--large {
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  font-size: 14px;
}
</style>
