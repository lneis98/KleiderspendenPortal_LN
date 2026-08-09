import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref('');
  const notification = ref(null);
  const mobileMenuOpen = ref(false);

  function showLoading(message = 'Lädt...') {
    isLoading.value = true;
    loadingMessage.value = message;
  }

  function hideLoading() {
    isLoading.value = false;
    loadingMessage.value = '';
  }

  function showNotification(type, message, duration = 5000) {
    notification.value = { type, message };
    
    if (duration > 0) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  }

  function hideNotification() {
    notification.value = null;
  }

  function showSuccess(message, duration = 5000) {
    showNotification('success', message, duration);
  }

  function showError(message, duration = 7000) {
    showNotification('error', message, duration);
  }

  function showInfo(message, duration = 5000) {
    showNotification('info', message, duration);
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false;
  }

  return {
    isLoading,
    loadingMessage,
    notification,
    mobileMenuOpen,
    showLoading,
    hideLoading,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showInfo,
    toggleMobileMenu,
    closeMobileMenu
  };
});
