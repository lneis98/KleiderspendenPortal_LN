<template>
  <div class="not-found-view min-h-[60vh] flex items-center justify-center py-12">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Seite nicht gefunden
      </h2>
      <p class="text-xl text-gray-700 mb-8">
        Die gesuchte Seite existiert leider nicht.
      </p>
      <BaseButton
        tag="router-link"
        to="/"
        variant="primary"
        size="lg"
      >
        Zurück zur Startseite
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/ui/BaseButton.vue';
</script>
