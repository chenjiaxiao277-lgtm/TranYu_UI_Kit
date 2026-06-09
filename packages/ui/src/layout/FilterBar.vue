<template>
  <div class="filter-bar">
    <div class="filter-bar__items">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
  padding: var(--tr-spacing-4);
  background-color: var(--tr-color-neutral50);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  margin-bottom: var(--tr-spacing-6);
}

.filter-bar__items {
  display: flex;
  align-items: center;
  gap: var(--tr-spacing-3);
  flex-wrap: wrap;
  width: 100%;
}
</style>
