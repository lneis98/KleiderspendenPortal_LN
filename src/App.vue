<template>
  <div id="app" class="min-h-screen flex flex-col app-wrapper">
    <!-- Skip Link für Keyboard-Navigation -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2">
      Zum Hauptinhalt springen
    </a>
    <AppHeader />
    
    <main id="main-content" class="flex-grow relative z-10">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    
    <AppFooter />
    
    <!-- Global UI Components -->
    <LoadingOverlay />
    <AppNotification />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import LoadingOverlay from './components/ui/LoadingOverlay.vue';
import AppNotification from './components/ui/AppNotification.vue';
import { useDonationStore } from './stores/donationStore';

const donationStore = useDonationStore();

onMounted(() => {
  donationStore.loadFromStorage();
});
</script>

<style>
/* Global Body Background - Lila Gradient Design */
body {
  background: linear-gradient(135deg, #f3e8ff 0%, #dce4ff 25%, #f3e8ff 50%, #e9d5ff 75%, #f3e8ff 100%);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(168, 85, 247, 0.1) 0%, 
    transparent 25%, 
    rgba(139, 92, 246, 0.15) 50%, 
    transparent 75%, 
    rgba(168, 85, 247, 0.1) 100%);
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
  animation: gradient-shift 30s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.app-wrapper {
  position: relative;
  z-index: 1;
}
</style>

<style scoped>
/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.15s ease-in-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
