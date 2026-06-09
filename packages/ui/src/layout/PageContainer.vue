<template>
  <div class="page-container">
    <div class="page-container__header">
      <slot name="header" />
    </div>
    <div class="page-container__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-container__header {
  padding: var(--tr-spacing-6);
  background-color: var(--tr-color-neutral0);
  border-bottom: 1px solid var(--tr-color-neutral200);
}

.page-container__body {
  flex: 1;
  padding: var(--tr-spacing-6);
  overflow-y: auto;
}
</style>
