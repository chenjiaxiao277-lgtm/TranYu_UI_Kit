<template>
  <div class="user-avatar-menu">
    <button class="user-avatar-menu__trigger" @click="showMenu = !showMenu">
      <span class="user-avatar-menu__avatar">👤</span>
    </button>
    <div v-if="showMenu" class="user-avatar-menu__dropdown">
      <a href="#" class="user-avatar-menu__item" @click.prevent="handleClick('profile')">
        Profile
      </a>
      <a href="#" class="user-avatar-menu__item" @click.prevent="handleClick('settings')">
        Settings
      </a>
      <div class="user-avatar-menu__divider" />
      <a href="#" class="user-avatar-menu__item user-avatar-menu__item--danger" @click.prevent="handleClick('logout')">
        Logout
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showMenu = ref(false);

const handleClick = (action: string) => {
  console.log('Menu action:', action);
  showMenu.value = false;
};
</script>

<style scoped>
.user-avatar-menu {
  position: relative;
}

.user-avatar-menu__trigger {
  background: none;
  border: 1px solid var(--tr-color-neutral300);
  border-radius: var(--tr-radius-md);
  padding: var(--tr-spacing-2);
  cursor: pointer;
  transition: all var(--tr-motion-normal);
}

.user-avatar-menu__trigger:hover {
  border-color: var(--tr-color-primary);
  background-color: var(--tr-color-neutral100);
}

.user-avatar-menu__avatar {
  font-size: 18px;
  display: block;
}

.user-avatar-menu__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--tr-spacing-2);
  background-color: var(--tr-color-neutral0);
  border: 1px solid var(--tr-color-neutral200);
  border-radius: var(--tr-radius-md);
  box-shadow: var(--tr-shadow-lg);
  min-width: 180px;
  z-index: 1000;
}

.user-avatar-menu__item {
  display: block;
  padding: var(--tr-spacing-3) var(--tr-spacing-4);
  color: var(--tr-color-neutral900);
  text-decoration: none;
  transition: all var(--tr-motion-normal);
  cursor: pointer;
  font-size: 14px;
}

.user-avatar-menu__item:hover {
  background-color: var(--tr-color-neutral50);
  color: var(--tr-color-primary);
}

.user-avatar-menu__item--danger:hover {
  background-color: var(--tr-color-danger);
  color: var(--tr-color-neutral0);
}

.user-avatar-menu__divider {
  height: 1px;
  background-color: var(--tr-color-neutral200);
  margin: var(--tr-spacing-1) 0;
}
</style>
