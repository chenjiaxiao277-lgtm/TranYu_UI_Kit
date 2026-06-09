<template>
  <a-drawer
    :title="title"
    :visible="visible"
    :width="width"
    :placement="placement"
    :mask-closable="maskClosable"
    :closable="closable"
    class="tr-drawer"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
  >
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { ADrawer } from '@arco-design/web-vue';

interface Props {
  title?: string;
  visible: boolean;
  width?: number | string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  maskClosable?: boolean;
  closable?: boolean;
}

defineEmits<{
  ok: [];
  cancel: [];
}>();

withDefaults(defineProps<Props>(), {
  width: 400,
  placement: 'right',
  maskClosable: true,
  closable: true,
});
</script>

<style scoped>
.tr-drawer :deep(.arco-drawer-header) {
  border-bottom: 1px solid var(--tr-color-neutral200);
  padding: var(--tr-spacing-6);
}

.tr-drawer :deep(.arco-drawer-title) {
  font-size: 18px;
  font-weight: 600;
  color: var(--tr-color-neutral900);
}

.tr-drawer :deep(.arco-drawer-body) {
  padding: var(--tr-spacing-6);
}

.tr-drawer :deep(.arco-drawer-footer) {
  border-top: 1px solid var(--tr-color-neutral200);
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral50);
}
</style>
