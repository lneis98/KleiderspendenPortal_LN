<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="status"
      aria-live="polite"
    >
      <div class="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4">
        <div class="flex flex-col items-center">
          <svg 
            class="animate-spin h-12 w-12 text-primary-600 mb-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              class="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              stroke-width="4"
            ></circle>
            <path 
              class="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          
          <p class="text-lg font-medium text-gray-900">
            {{ loadingMessage }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUIStore } from '../../stores/uiStore';

const uiStore = useUIStore();
const { isLoading, loadingMessage } = storeToRefs(uiStore);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
