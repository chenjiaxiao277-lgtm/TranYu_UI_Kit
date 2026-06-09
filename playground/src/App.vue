<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background-color: var(--tr-color-neutral50);
  color: var(--tr-color-neutral900);
}

a {
  text-decoration: none;
  color: inherit;
}

.app {
  min-height: 100vh;
}
</style>
