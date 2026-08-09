<template>
  <div class="register-type-page">
    <div class="container mx-auto px-4 py-12">
      <!-- Enhanced page header -->
      <div class="page-header-form text-center mb-12">
        <h1 class="page-title-form text-4xl font-bold text-gray-900 mb-4">
          Wie möchten Sie spenden?
        </h1>
        <p class="page-subtitle-form text-lg text-gray-600 max-w-2xl mx-auto">
          Wählen Sie die für Sie passende Art der Kleiderspende
        </p>
      </div>
      
      <!-- Spende-Optionen -->
      <section class="register-options grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <article class="option-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-purple-300">
          <div class="card-content p-6">
            <span class="option-icon text-5xl block mb-4" aria-hidden="true">🚚</span>
            <h3 class="option-title text-xl font-bold text-gray-900 mb-3">
              Abholung durch Sammelfahrzeug
            </h3>
            <p class="option-description text-gray-600 leading-relaxed mb-6">
              Wir holen Ihre Kleiderspende kostenlos bei Ihnen zu Hause ab. Einfach und bequem.
            </p>
          </div>
          <div class="p-6 pt-0">
            <BaseButton
              variant="primary"
              size="lg"
              full-width
              class="register-option-btn"
              aria-label="Abholung vereinbaren - Kostenlose Abholung durch Sammelfahrzeug"
              @click="router.push('/register-pickup')"
            >
              Abholung vereinbaren
            </BaseButton>
          </div>
        </article>
        
        <article class="option-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-purple-300">
          <div class="card-content p-6">
            <span class="option-icon text-5xl block mb-4" aria-hidden="true">📍</span>
            <h3 class="option-title text-xl font-bold text-gray-900 mb-3">
              Abgabe vor Ort
            </h3>
            <p class="option-description text-gray-600 leading-relaxed mb-6">
              Bringen Sie Ihre Kleiderspende zu unseren Öffnungszeiten direkt zu unserer Sammelstelle.
            </p>
          </div>
          <div class="p-6 pt-0">
            <BaseButton
              variant="primary"
              size="lg"
              full-width
              class="register-option-btn"
              aria-label="Abgabe registrieren - Abgabe vor Ort zu unseren Öffnungszeiten"
              @click="router.push('/register-dropoff')"
            >
              Abgabe registrieren
            </BaseButton>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
</script>

<style scoped>
.register-type-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.enhanced-header {
  position: relative;
  padding: 2rem 0;
}

.option-card {
  display: flex;
  flex-direction: column;
  will-change: transform;
  backface-visibility: hidden;
}

.option-card:active {
  transform: translateY(-0.5px);
}

@media (prefers-reduced-motion: reduce) {
  .option-card {
    transition: none !important;
    transform: none !important;
  }
}
</style>
