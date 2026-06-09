<template>
  <div class="toolbar">
    <div class="toolbar__left">
      <slot name="left" />
    </div>
    <div class="toolbar__center">
      <slot name="center" />
    </div>
    <div class="toolbar__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--tr-spacing-4);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-lg);
  margin-bottom: var(--tr-spacing-6);
}

.toolbar__left,
.toolbar__center,
.toolbar__right {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
}

.toolbar__left {
  flex: 0 0 auto;
}

.toolbar__center {
  flex: 1;
  justify-content: center;
}

.toolbar__right {
  flex: 0 0 auto;
}
</style>
