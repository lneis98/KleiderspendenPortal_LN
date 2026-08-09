<template>
  <footer class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white mt-auto border-t-4 border-purple-600">
    <div class="container mx-auto px-4 py-12">
      <div class="flex justify-center">
        <!-- Contact & Legal -->
        <div class="max-w-2xl w-full">
          <h3 class="text-lg font-bold mb-4 text-purple-300 text-center">Kontakt & Rechtliches</h3>
          <ul class="space-y-2 text-center">
            <li>
              <a href="mailto:info@kleiderspende-birkenau.de" class="footer-link">
                info@kleiderspende-birkenau.de
              </a>
            </li>
            <li>
              <a href="tel:+4962017654321" class="footer-link">
                +49 6201 7654321
              </a>
            </li>
            <li>
              <router-link to="/impressum" class="footer-link">
                Impressum
              </router-link>
            </li>
            <li>
              <router-link to="/datenschutz" class="footer-link">
                Datenschutz
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-purple-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>
          © {{ currentYear }} Kleiderspende Birkenau. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer-link {
  @apply text-gray-300 hover:text-purple-300 transition-colors text-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:rounded;
}
</style>
