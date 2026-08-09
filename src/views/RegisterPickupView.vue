<template>
  <div class="register-pickup-page py-8">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="page-header-form text-center mb-8">
        <h1 class="page-title-form text-4xl md:text-5xl font-black text-purple-600 mb-3">
          Kleidung abholen lassen
        </h1>
        <p class="page-subtitle-form text-lg text-gray-700">
          Wir holen Ihre Kleiderspende kostenlos bei Ihnen zu Hause ab
        </p>
      </div>

      <!-- Form Container -->
      <div class="form-container bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto border border-purple-100">
        <div class="form-header text-center mb-8">
          <h2 class="form-title text-2xl font-bold text-gray-900 mb-2">🚚 Abholung vereinbaren</h2>
          <p class="form-description text-gray-600">
            Vereinbaren Sie einen Termin für die kostenlose Abholung Ihrer Kleiderspende
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form" novalidate>

          <!-- Schritt 1: Kontaktdaten -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                1
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Ihre Kontaktdaten</h3>
                <p class="step-description text-gray-600">Damit wir Sie für die Abholung erreichen können</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <BaseInput
                v-model="formData.firstName"
                label="Vorname"
                required
                placeholder="Max"
                autocomplete="given-name"
                :error="errors.firstName"
                @blur="validateField('firstName')"
              />
              <BaseInput
                v-model="formData.lastName"
                label="Nachname"
                required
                placeholder="Mustermann"
                autocomplete="family-name"
                :error="errors.lastName"
                @blur="validateField('lastName')"
              />
              <BaseInput
                v-model="formData.phone"
                label="Telefonnummer"
                type="tel"
                required
                placeholder="0621 123456789"
                autocomplete="tel"
                :error="errors.phone"
                @blur="validateField('phone')"
              />
              <BaseInput
                v-model="formData.email"
                label="E-Mail"
                type="email"
                placeholder="ihre.email@beispiel.de"
                autocomplete="email"
                :error="errors.email"
                helper-text="(optional)"
                @blur="validateField('email')"
              />
            </div>
          </div>

          <!-- Schritt 2: Adresse -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                2
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Ihre Adresse</h3>
                <p class="step-description text-gray-600">Wo sollen wir die Kleidung abholen?</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="md:col-span-2">
                <BaseInput
                  v-model="formData.street"
                  label="Straße und Hausnummer"
                  required
                  placeholder="Hauptstraße 123"
                  autocomplete="street-address"
                  :error="errors.street"
                  @blur="validateField('street')"
                />
              </div>
              <BaseInput
                v-model="formData.plz"
                label="Postleitzahl"
                required
                placeholder="69488"
                maxlength="5"
                pattern="[0-9]{5}"
                inputmode="numeric"
                autocomplete="postal-code"
                :error="errors.plz"
                @blur="validateField('plz')"
              />
              <BaseInput
                v-model="formData.city"
                label="Ort"
                required
                placeholder="Birkenau"
                autocomplete="address-level2"
                :error="errors.city"
                @blur="validateField('city')"
              />
            </div>

            <BaseInput
              v-model="formData.addressNotes"
              label="Zusätzliche Adressinformationen"
              placeholder="z.B. 2. Stock, Hinterhaus, Klingel rechts"
              helper-text="(optional)"
            />
          </div>

          <!-- Schritt 3: Spendendetails -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                3
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Details Ihrer Spende</h3>
                <p class="step-description text-gray-600">Was möchten Sie spenden?</p>
              </div>
            </div>

            <!-- Kleidungsauswahl — aria-pressed kommuniziert Zustand an Screenreader -->
            <fieldset id="clothing" class="form-group mb-6">
              <legend class="block text-sm font-semibold text-gray-700 mb-3">
                Art der Kleidung <span class="text-red-500" aria-hidden="true">*</span>
              </legend>
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

            <!-- Mengenauswahl -->
            <fieldset id="quantity" class="form-group">
              <legend class="block text-sm font-semibold text-gray-700 mb-3">
                Geschätzte Menge <span class="text-red-500" aria-hidden="true">*</span>
              </legend>
              <div class="grid md:grid-cols-3 gap-3">
                <button
                  v-for="item in quantityOptions"
                  :key="item.value"
                  type="button"
                  :aria-pressed="formData.quantity === item.value"
                  @click="formData.quantity = item.value; validateField('quantity')"
                  :class="[
                    'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                    formData.quantity === item.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <div class="text-2xl mb-2" aria-hidden="true">{{ item.icon }}</div>
                  <div class="font-medium mb-1">{{ item.label }}</div>
                  <div class="text-xs text-gray-500">{{ item.desc }}</div>
                  <span v-if="formData.quantity === item.value" class="absolute top-3 right-3 text-purple-600" aria-hidden="true">✔️</span>
                </button>
              </div>
              <p v-if="errors.quantity" role="alert" class="text-red-500 text-sm mt-2">{{ errors.quantity }}</p>
            </fieldset>
          </div>

          <!-- Schritt 4: Zielgebiet -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                4
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Zielgebiet wählen</h3>
                <p class="step-description text-gray-600">Welchem Krisengebiet soll Ihre Spende helfen?</p>
              </div>
            </div>

            <fieldset id="crisisArea">
              <legend class="sr-only">Krisengebiet auswählen</legend>
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

          <!-- Schritt 5: Abholtermin -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                5
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Abholtermin</h3>
                <p class="step-description text-gray-600">Wann sollen wir die Kleidung abholen?</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="pickupDate" class="w-full">
                <label class="form-label block text-sm font-semibold text-gray-700 mb-3">
                  Wunschtermin <span class="text-red-500" aria-hidden="true">*</span>
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <div>
                    <label for="pickup-day" class="sr-only">Tag</label>
                    <select
                      id="pickup-day"
                      v-model="formData.pickupDateDay"
                      @change="updatePickupDate"
                      class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 text-sm"
                    >
                      <option value="">Tag</option>
                      <option v-for="day in 31" :key="day" :value="String(day).padStart(2, '0')">
                        {{ String(day).padStart(2, '0') }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="pickup-month" class="sr-only">Monat</label>
                    <select
                      id="pickup-month"
                      v-model="formData.pickupDateMonth"
                      @change="updatePickupDate"
                      class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 text-sm"
                    >
                      <option value="">Monat</option>
                      <option value="01">Januar</option>
                      <option value="02">Februar</option>
                      <option value="03">März</option>
                      <option value="04">April</option>
                      <option value="05">Mai</option>
                      <option value="06">Juni</option>
                      <option value="07">Juli</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Dezember</option>
                    </select>
                  </div>
                  <div>
                    <label for="pickup-year" class="sr-only">Jahr</label>
                    <select
                      id="pickup-year"
                      v-model="formData.pickupDateYear"
                      @change="updatePickupDate"
                      class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 text-sm"
                    >
                      <option value="">Jahr</option>
                      <option v-for="year in yearOptions" :key="year" :value="String(year)">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                </div>
                <p v-if="errors.pickupDate" role="alert" class="text-red-500 text-sm mt-2">{{ errors.pickupDate }}</p>
              </div>

              <div class="form-group w-full">
                <label for="pickup-time" class="form-label block text-sm font-semibold text-gray-700 mb-2">
                  Bevorzugte Uhrzeit
                </label>
                <select
                  id="pickup-time"
                  v-model="formData.pickupTime"
                  class="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="morning">Vormittags (8–12 Uhr)</option>
                  <option value="afternoon">Nachmittags (12–16 Uhr)</option>
                  <option value="evening">Spätnachmittags (16–18 Uhr)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Schritt 6: Zusätzliche Hinweise -->
          <div class="form-step mb-8">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0" aria-hidden="true">
                6
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Zusätzliche Hinweise</h3>
                <p class="step-description text-gray-600">Haben Sie Anmerkungen oder Fragen?</p>
              </div>
            </div>

            <!-- Textarea mit explizitem Label — WCAG SC 1.3.1 -->
            <label for="pickup-comments" class="block text-sm font-semibold text-gray-700 mb-2">
              Anmerkungen <span class="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="pickup-comments"
              v-model="formData.comments"
              placeholder="Haben Sie zusätzliche Anmerkungen zu Ihrer Spende oder Fragen an uns?"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900"
              rows="4"
            ></textarea>

            <!-- Datenschutz-Checkbox mit explizitem id/for-Paar -->
            <div class="mt-6">
              <div class="flex items-start gap-3">
                <input
                  id="pickup-terms"
                  v-model="formData.terms"
                  type="checkbox"
                  class="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 flex-shrink-0"
                  :aria-invalid="!!errors.terms"
                  :aria-describedby="errors.terms ? 'pickup-terms-error' : undefined"
                  required
                />
                <label for="pickup-terms" class="text-sm text-gray-700 cursor-pointer">
                  Ich akzeptiere die
                  <router-link to="/datenschutz" class="text-purple-600 hover:underline">Datenschutzbestimmungen</router-link>
                  und erkläre mich mit der Verarbeitung meiner Daten einverstanden.
                  <span class="text-red-500" aria-hidden="true">*</span>
                </label>
              </div>
              <p v-if="errors.terms" id="pickup-terms-error" role="alert" class="text-red-500 text-sm mt-2">{{ errors.terms }}</p>
            </div>
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
              Abholung verbindlich vereinbaren
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useDonationStore } from '@/stores/donationStore'
import { useUIStore } from '@/stores/uiStore'
import ValidationService from '@/services/validationService'
import CONFIG from '@/utils/constants'

const router = useRouter()
const donationStore = useDonationStore()
const uiStore = useUIStore()
const isSubmitting = ref(false)

// ── Shared form options aus constants.js — Single Source of Truth ──────────
const clothingTypes  = CONFIG.FORM_CLOTHING_TYPES
const quantityOptions = CONFIG.FORM_QUANTITY_OPTIONS
const crisisAreas    = CONFIG.CRISIS_AREAS

// ── Formular-State ─────────────────────────────────────────────────────────
const formData = reactive({
  firstName:       '',
  lastName:        '',
  phone:           '',
  email:           '',
  street:          '',
  plz:             '',
  city:            '',
  addressNotes:    '',
  clothing:        [],
  quantity:        '',
  crisisArea:      '',
  pickupDate:      '',
  pickupDateDay:   '',
  pickupDateMonth: '',
  pickupDateYear:  '',
  pickupTime:      'morning',
  comments:        '',
  terms:           false
})

const errors = reactive({})

// ── Jahresoptionen: ab morgen, 2 Jahre in die Zukunft ──────────────────────
const yearOptions = computed(() => {
  const year = new Date().getFullYear()
  return [year, year + 1, year + 2]
})

const updatePickupDate = () => {
  if (formData.pickupDateDay && formData.pickupDateMonth && formData.pickupDateYear) {
    formData.pickupDate = `${formData.pickupDateYear}-${formData.pickupDateMonth}-${formData.pickupDateDay}`
    
    // Prüfe, ob die Datumskombination gültig ist (z.B. 31. Februar)
    const testDate = new Date(formData.pickupDate)
    if (isNaN(testDate.getTime()) || testDate.toISOString().substring(0, 10) !== formData.pickupDate) {
      errors.pickupDate = 'Ungültiges Datum (z.B. 31. Februar existiert nicht)'
    } else {
      // Lösche Fehler, wenn Datum gültig ist
      delete errors.pickupDate
    }
  } else {
    formData.pickupDate = ''
    // Fehler nur beim Submit zeigen, nicht während der Eingabe
  }
}

// ── Einzelfeld-Validierung (wird bei blur UND beim Submit-Sammeldurchlauf genutzt) ──
const validateField = (fieldName) => {
  delete errors[fieldName]

  switch (fieldName) {
    case 'firstName':
      if (!formData.firstName)
        errors.firstName = 'Vorname ist erforderlich'
      else if (formData.firstName.length < 2)
        errors.firstName = 'Vorname muss mindestens 2 Zeichen lang sein'
      else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.firstName))
        errors.firstName = 'Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
      break

    case 'lastName':
      if (!formData.lastName)
        errors.lastName = 'Nachname ist erforderlich'
      else if (formData.lastName.length < 2)
        errors.lastName = 'Nachname muss mindestens 2 Zeichen lang sein'
      else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.lastName))
        errors.lastName = 'Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
      break

    case 'phone': {
      const digits = (formData.phone || '').replace(/\D/g, '')
      if (!formData.phone)
        errors.phone = 'Telefonnummer ist erforderlich'
      else if (digits.length < 8)
        errors.phone = 'Telefonnummer muss mindestens 8 Ziffern haben'
      else if (digits.length > 15)
        errors.phone = 'Telefonnummer zu lang (max. 15 Ziffern)'
      break
    }

    case 'email':
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      break

    case 'street':
      if (!formData.street)
        errors.street = 'Straße und Hausnummer sind erforderlich'
      else if (formData.street.length < 5)
        errors.street = 'Mindestens 5 Zeichen erforderlich'
      else if (!/^.+\s+\d+.*$/.test(formData.street))
        errors.street = 'Bitte Straße und Hausnummer angeben (z.B. Hauptstraße 123)'
      break

    case 'plz':
      if (!formData.plz)
        errors.plz = 'Postleitzahl ist erforderlich'
      else if (!/^\d{5}$/.test(formData.plz))
        errors.plz = 'Postleitzahl muss genau 5 Ziffern haben'
      else {
        // Anforderung h: Die ersten beiden Stellen der Abholadresse müssen mit der
        // Geschäftsstellen-PLZ (69488) übereinstimmen → ValidationService prüft das.
        const result = ValidationService.validatePickupProximity(formData.plz, CONFIG.BUSINESS_LOCATION.plz)
        if (!result.isValid) errors.plz = result.error
      }
      break

    case 'city':
      if (!formData.city)
        errors.city = 'Ortsname ist erforderlich'
      else if (formData.city.length < 2)
        errors.city = 'Ortsname zu kurz'
      else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.city))
        errors.city = 'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt'
      break

    case 'clothing':
      if (formData.clothing.length === 0)
        errors.clothing = 'Bitte wählen Sie mindestens eine Kleidungsart aus'
      break

    case 'quantity':
      if (!formData.quantity)
        errors.quantity = 'Bitte wählen Sie eine Mengenangabe aus'
      break

    case 'crisisArea':
      if (!formData.crisisArea)
        errors.crisisArea = 'Bitte wählen Sie ein Zielgebiet aus'
      break

    case 'pickupDate':
      if (!formData.pickupDate) {
        errors.pickupDate = 'Bitte wählen Sie ein Datum aus'
      } else {
        const selected = new Date(formData.pickupDate)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        if (selected < tomorrow)
          errors.pickupDate = 'Abholtermin muss mindestens morgen sein'
      }
      break

    case 'terms':
      if (!formData.terms)
        errors.terms = 'Sie müssen den Datenschutzbestimmungen zustimmen'
      break
  }
}

// ── Submit-Validierung ruft validateField für jedes Pflichtfeld auf ─────────
// Dadurch ist die Logik nur EINMAL definiert (in validateField), kein Code-Duplikat.
const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  const fields = [
    'firstName', 'lastName', 'phone', 'email',
    'street', 'plz', 'city',
    'clothing', 'quantity', 'crisisArea',
    'pickupDate', 'terms'
  ]
  fields.forEach(field => validateField(field))

  return Object.keys(errors).length === 0
}

const scrollToFirstError = () => {
  const firstKey = Object.keys(errors)[0]
  if (!firstKey) return
  const el = document.querySelector(`[id="${firstKey}"], [aria-describedby*="${firstKey}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => el.focus?.(), 300)
  }
}

const toggleClothingType = (value) => {
  const idx = formData.clothing.indexOf(value)
  if (idx > -1) formData.clothing.splice(idx, 1)
  else          formData.clothing.push(value)
  validateField('clothing')
}

const handleSubmit = async () => {
  if (!validate()) {
    scrollToFirstError()
    return
  }

  isSubmitting.value = true
  try {
    const referenceNumber = `KSB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`

    await donationStore.saveDonation({
      ...formData,
      type: 'pickup',
      referenceNumber,
      submittedAt: new Date().toISOString()
    })

    router.push(`/confirmation?ref=${referenceNumber}`)
  } catch {
    // Nutzt den UIStore statt alert() — zeigt eine barrierefreie Fehlermeldung
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
