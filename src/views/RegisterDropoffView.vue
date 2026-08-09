<template>
  <div class="register-dropoff-page py-8">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="page-header-form text-center mb-8">
        <h1 class="page-title-form text-4xl md:text-5xl font-black text-purple-600 mb-3">
          Kleidung vor Ort abgeben
        </h1>
        <p class="page-subtitle-form text-lg text-gray-700">
          Registrieren Sie Ihre Spende für die Abgabe an unserer Sammelstelle
        </p>
      </div>

      <!-- Hinweisbox Geschäftsstelle -->
      <div class="max-w-4xl mx-auto mb-6">
        <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 flex gap-3 items-start">
          <span class="text-2xl" aria-hidden="true">📍</span>
          <div>
            <p class="font-semibold text-purple-800">Abgabe an der Geschäftsstelle</p>
            <p class="text-sm text-purple-700 mt-0.5">
              {{ businessLocation.name }} · {{ businessLocation.address }}
            </p>
          </div>
        </div>
      </div>

      <!-- Form Container -->
      <div class="form-container bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto border border-purple-100">
        <div class="form-header text-center mb-8">
          <h2 class="form-title text-2xl font-bold text-gray-900 mb-2">📍 Abgabe registrieren</h2>
          <p class="form-description text-gray-600">
            Wählen Sie die Kleidungsart und das Krisengebiet aus, dem Ihre Spende zugutekommen soll.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form" novalidate>

          <!-- Schritt 1: Kleidungsart -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                1
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Art der Kleidung</h3>
                <p class="step-description text-gray-600">Was möchten Sie spenden? (Mehrfachauswahl möglich)</p>
              </div>
            </div>

            <!-- aria-pressed kommuniziert den Auswahlzustand an Screenreader (WCAG SC 4.1.2) -->
            <fieldset>
              <legend class="sr-only">Art der Kleidung auswählen (Pflichtfeld)</legend>
              <div class="grid md:grid-cols-2 gap-3">
                <button
                  v-for="item in clothingTypes"
                  :key="item.value"
                  type="button"
                  :aria-pressed="formData.clothing.includes(item.value)"
                  @click="toggleClothingType(item.value)"
                  :class="[
                    'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                    formData.clothing.includes(item.value)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <span class="text-3xl mr-3" aria-hidden="true">{{ item.icon }}</span>
                  <span class="font-medium">{{ item.label }}</span>
                  <span v-if="formData.clothing.includes(item.value)" class="float-right text-purple-600" aria-hidden="true">✔️</span>
                </button>
              </div>
              <p v-if="errors.clothing" role="alert" class="text-red-500 text-sm mt-2">{{ errors.clothing }}</p>
            </fieldset>
          </div>

          <!-- Schritt 2: Krisengebiet -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                2
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Krisengebiet wählen</h3>
                <p class="step-description text-gray-600">Welchem Krisengebiet soll Ihre Spende helfen?</p>
              </div>
            </div>

            <fieldset>
              <legend class="sr-only">Krisengebiet auswählen (Pflichtfeld)</legend>
              <div class="grid md:grid-cols-2 gap-3">
                <button
                  v-for="country in crisisAreas"
                  :key="country.value"
                  type="button"
                  :aria-pressed="formData.crisisArea === country.value"
                  @click="formData.crisisArea = country.value; validateField('crisisArea')"
                  :class="[
                    'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                    formData.crisisArea === country.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <span class="text-3xl mr-3" aria-hidden="true">{{ country.flag }}</span>
                  <span class="font-medium">{{ country.label }}</span>
                  <span v-if="formData.crisisArea === country.value" class="float-right text-purple-600" aria-hidden="true">✔️</span>
                </button>
              </div>
              <p v-if="errors.crisisArea" role="alert" class="text-red-500 text-sm mt-2">{{ errors.crisisArea }}</p>
            </fieldset>
          </div>

          <!-- Schritt 3: Datenschutz -->
          <div class="form-step mb-8">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                3
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Datenschutz</h3>
                <p class="step-description text-gray-600">Bitte bestätigen Sie die Verarbeitung Ihrer Daten.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <input
                id="dropoff-terms"
                v-model="formData.terms"
                type="checkbox"
                class="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 flex-shrink-0"
                :aria-invalid="!!errors.terms"
                :aria-describedby="errors.terms ? 'dropoff-terms-error' : undefined"
                required
              />
              <label for="dropoff-terms" class="text-sm text-gray-700 cursor-pointer">
                Ich akzeptiere die
                <router-link to="/datenschutz" class="text-purple-600 hover:underline">Datenschutzbestimmungen</router-link>
                und erkläre mich mit der Verarbeitung meiner Daten einverstanden.
                <span class="text-red-500" aria-hidden="true">*</span>
              </label>
            </div>
            <p v-if="errors.terms" id="dropoff-terms-error" role="alert" class="text-red-500 text-sm mt-2">{{ errors.terms }}</p>
          </div>

          <!-- Absenden -->
          <div class="flex justify-center">
            <BaseButton
              native-type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
              class="w-full md:w-auto px-12"
            >
              Abgabe verbindlich registrieren
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useDonationStore } from '@/stores/donationStore'
import { useUIStore } from '@/stores/uiStore'
import { useFormValidation } from '@/composables/useFormValidation'
import CONFIG from '@/utils/constants'

const router = useRouter()
const donationStore = useDonationStore()
const uiStore = useUIStore()
const isSubmitting = ref(false)

// Shared form options aus constants.js — Single Source of Truth
const clothingTypes = CONFIG.FORM_CLOTHING_TYPES
const crisisAreas   = CONFIG.CRISIS_AREAS

// Vereinsadresse für die Hinweisbox (dynamisch aus CONFIG)
const businessLocation = CONFIG.BUSINESS_LOCATION

// Minimaler Formular-State gemäß Aufgabenstellung b.f):
// "nur die Art der Kleidung und ein aktuelles Krisengebiet"
const initialFormData = {
  clothing:  [],
  crisisArea: '',
  terms:      false
}

const { formData, errors, validateField, validate } = useFormValidation(initialFormData)

const toggleClothingType = (value) => {
  const idx = formData.clothing.indexOf(value)
  if (idx > -1) formData.clothing.splice(idx, 1)
  else          formData.clothing.push(value)
  validateField('clothing')
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    const referenceNumber = `KSB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`

    await donationStore.saveDonation({
      ...formData,
      type: 'dropoff',
      referenceNumber,
      submittedAt: new Date().toISOString()
    })

    router.push(`/confirmation?ref=${referenceNumber}`)
  } catch {
    uiStore.showError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.selection-item {
  position: relative;
  cursor: pointer;
}
.selection-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
