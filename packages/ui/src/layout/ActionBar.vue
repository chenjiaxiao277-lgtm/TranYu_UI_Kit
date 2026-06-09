<template>
  <div class="action-bar">
    <div class="action-bar__items">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border-top: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  margin-top: var(--tr-spacing-6);
}

.action-bar__items {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
}
</style>
