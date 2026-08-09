<template>
  <div class="tracking-page">
    <div class="container mx-auto px-4 py-12">
      <div class="page-header-form text-center mb-12">
        <h1 class="page-title-form text-4xl font-bold text-gray-900 mb-4">
          Sendungsverfolgung
        </h1>
        <p class="page-subtitle-form text-lg text-gray-600 max-w-2xl mx-auto">
          Verfolgen Sie den Status Ihrer Kleiderspende
        </p>
      </div>

      <div class="form-container bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-200">
        <div class="form-header text-center mb-8">
          <h2 class="form-title text-2xl font-bold text-gray-900 mb-3">Spende finden</h2>
          <p class="form-description text-gray-600">
            Bitte tragen Sie Ihre Spenden-Referenznummer ein, um den Status Ihrer Spende zu verfolgen.
          </p>
        </div>

        <form @submit.prevent="handleSearch" class="multi-step-form" novalidate>
          <div class="form-row flex flex-col md:flex-row gap-4 mb-6">
            <div class="form-group flex-grow">
              <label for="trackingCode" class="form-label block text-sm font-semibold text-gray-700 mb-2">
                <span class="label-text">Tracking-ID</span>
                <span class="required-indicator text-red-500 ml-1">*</span>
              </label>
              <BaseInput
                v-model="trackingCode"
                id="trackingCode"
                type="text"
                placeholder="Ihre Tracking-ID"
                required
                :error="error"
                @input="error = ''"
              />
            </div>
            <div class="form-group form-actions flex items-end">
              <BaseButton
                native-type="submit"
                variant="primary"
                size="lg"
                :loading="loading"
                class="w-full md:w-auto"
              >
                Suchen
              </BaseButton>
            </div>
          </div>
        </form>

        <p class="demo-hint text-center text-sm text-gray-600 mb-4">
          Zum Testen können Sie folgende IDs verwenden:
        </p>
        <div class="demo-codes mb-8">
          <div class="chips flex flex-wrap justify-center gap-2">
            <button
              v-for="code in demoCodes"
              :key="code"
              class="chip px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              @click="useCode(code)"
            >
              {{ code }}
            </button>
          </div>
        </div>

        <!-- Tracking Result -->
        <section
          v-if="hasSearched && trackingData"
          class="tracking-result mt-8 p-6 bg-gray-50 rounded-xl"
          aria-live="polite"
        >
          <div class="result-header mb-6 text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              Spende {{ trackingData.id }}
            </h3>
            <div class="status-badge inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm"
                 :class="getStatusClass(trackingData.status)">
              <span class="mr-2">{{ getStatusIcon(trackingData.status) }}</span>
              {{ getStatusText(trackingData.status) }}
            </div>
          </div>

          <div class="tracking-timeline">
            <div
              v-for="(event, index) in trackingData.events"
              :key="index"
              class="timeline-item flex mb-6 last:mb-0"
            >
              <div class="timeline-marker flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-4">
                {{ event.step }}
              </div>
              <div class="timeline-content flex-grow">
                <h4 class="text-lg font-bold text-gray-900 mb-1">{{ event.title }}</h4>
                <p class="text-gray-600 mb-1">{{ event.description }}</p>
                <time class="text-sm text-gray-500">{{ event.date }}</time>
              </div>
            </div>
          </div>

          <div class="tracking-info mt-8 grid md:grid-cols-2 gap-4">
            <div class="info-box bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-600 mb-1">Abhol-/Abgabedatum</div>
              <div class="text-lg font-semibold text-gray-900">{{ trackingData.pickupDate }}</div>
            </div>
            <div class="info-box bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-600 mb-1">Typ</div>
              <div class="text-lg font-semibold text-gray-900">{{ trackingData.type }}</div>
            </div>
            <div class="info-box bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-600 mb-1">Menge</div>
              <div class="text-lg font-semibold text-gray-900">{{ trackingData.quantity }}</div>
            </div>
            <div class="info-box bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-600 mb-1">Zielregion</div>
              <div class="text-lg font-semibold text-gray-900">{{ trackingData.destination }}</div>
            </div>
          </div>
        </section>

        <!-- Error Message -->
        <div
          v-if="hasSearched && error && !trackingData"
          class="error-box mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
          role="alert"
        >
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDonationStore } from '@/stores/donationStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const donationStore = useDonationStore()
donationStore.loadFromStorage()

const trackingCode = ref('')
const loading = ref(false)
const error = ref('')
const trackingData = ref(null)
const hasSearched = ref(false)

const demoCodes = ['KSB-2025-0012', 'KSB-2025-0042', 'KSB-2025-0099']

// Helper function to format quantity
const formatQuantity = (quantity) => {
  const quantityMap = {
    'small': 'Klein (1-2 Taschen/Kartons)',
    'medium': 'Mittel (3-5 Taschen/Kartons)',
    'large': 'Groß (6+ Taschen/Kartons)'
  }
  return quantityMap[quantity] || quantity
}

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Nicht angegeben'
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// Helper function to get current timestamp
const getCurrentTimestamp = () => {
  const now = new Date()
  return now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' +
         now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

// Mock tracking data
const mockData = {
  'KSB-2025-0012': {
    id: 'KSB-2025-0012',
    status: 'delivered',
    type: 'Abholung',
    pickupDate: '15.01.2025',
    quantity: 'Klein (1-2 Taschen/Kartons)',
    destination: 'Ukraine',
    events: [
      { step: 1, title: 'Registriert', description: 'Ihre Spende wurde erfasst', date: '14.01.2025, 10:30' },
      { step: 2, title: 'Abgeholt', description: 'Kleidung wurde bei Ihnen abgeholt', date: '15.01.2025, 14:20' },
      { step: 3, title: 'Sortiert', description: 'Spende wurde im Lager sortiert und verpackt', date: '16.01.2025, 11:00' },
      { step: 4, title: 'Versendet', description: 'Auf dem Weg ins Krisengebiet', date: '18.01.2025, 08:15' },
      { step: 5, title: 'Angekommen', description: 'Ihre Spende ist angekommen', date: '22.01.2025, 16:45' }
    ]
  },
  'KSB-2025-0042': {
    id: 'KSB-2025-0042',
    status: 'in-transit',
    type: 'Abgabe vor Ort',
    pickupDate: '20.01.2025',
    quantity: 'Mittel (3-5 Taschen/Kartons)',
    destination: 'Syrien',
    events: [
      { step: 1, title: 'Registriert', description: 'Ihre Spende wurde erfasst', date: '20.01.2025, 09:15' },
      { step: 2, title: 'Angenommen', description: 'Kleidung wurde an Sammelstelle abgegeben', date: '20.01.2025, 09:20' },
      { step: 3, title: 'Sortiert', description: 'Spende wurde im Lager sortiert und verpackt', date: '21.01.2025, 14:30' },
      { step: 4, title: 'Versendet', description: 'Auf dem Weg ins Krisengebiet', date: '23.01.2025, 07:00' }
    ]
  },
  'KSB-2025-0099': {
    id: 'KSB-2025-0099',
    status: 'processing',
    type: 'Abholung',
    pickupDate: '24.01.2025',
    quantity: 'Groß (6+ Taschen/Kartons)',
    destination: 'Jemen',
    events: [
      { step: 1, title: 'Registriert', description: 'Ihre Spende wurde erfasst', date: '23.01.2025, 16:45' },
      { step: 2, title: 'Abgeholt', description: 'Kleidung wurde bei Ihnen abgeholt', date: '24.01.2025, 13:10' },
      { step: 3, title: 'Sortiert', description: 'Spende wird gerade sortiert und verpackt', date: '25.01.2025, 10:00' }
    ]
  }
}

const useCode = (code) => {
  trackingCode.value = code
  // Don't automatically search - user needs to click "Suchen" button
}

const handleSearch = () => {
  error.value = ''
  trackingData.value = null
  hasSearched.value = true

  if (!trackingCode.value) {
    error.value = 'Bitte geben Sie eine Tracking-ID ein.'
    return
  }

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    // First check if it's a stored donation from this session
    if (donationStore.referenceNumber === trackingCode.value && donationStore.currentDonationData) {
      const donation = donationStore.currentDonationData
      const countryMap = {
        'ukraine': 'Ukraine',
        'syria': 'Syrien',
        'afghanistan': 'Afghanistan',
        'yemen': 'Jemen',
        'somalia': 'Somalia',
        'haiti': 'Haiti'
      }
      
      trackingData.value = {
        id: donation.referenceNumber,
        status: 'processing',
        type: donation.type === 'pickup' ? 'Abholung' : 'Abgabe vor Ort',
        pickupDate: donation.pickupDate ? formatDate(donation.pickupDate) : 'Wird vereinbart',
        quantity: formatQuantity(donation.quantity),
        destination: countryMap[donation.crisisArea] || donation.crisisArea,
        events: [
          { 
            step: 1, 
            title: 'Registriert', 
            description: 'Ihre Spende wurde erfasst', 
            date: getCurrentTimestamp()
          }
        ]
      }
    } else {
      // Check mock data
      const data = mockData[trackingCode.value]
      if (data) {
        trackingData.value = data
      } else {
        error.value = 'Keine Spende mit dieser Tracking-ID gefunden. Bitte überprüfen Sie Ihre Eingabe.'
      }
    }
    loading.value = false
  }, 800)
}

const getStatusClass = (status) => {
  const classes = {
    'delivered': 'bg-green-100 text-green-800',
    'in-transit': 'bg-blue-100 text-blue-800',
    'processing': 'bg-yellow-100 text-yellow-800',
    'registered': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || classes.registered
}

const getStatusIcon = (status) => {
  const icons = {
    'delivered': '✅',
    'in-transit': '🚚',
    'processing': '📦',
    'registered': '📝'
  }
  return icons[status] || '📝'
}

const getStatusText = (status) => {
  const texts = {
    'delivered': 'Angekommen',
    'in-transit': 'Unterwegs',
    'processing': 'In Bearbeitung',
    'registered': 'Registriert'
  }
  return texts[status] || 'Registriert'
}
</script>

<style scoped>
.tracking-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.timeline-item:not(:last-child) .timeline-marker::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 2rem;
  background: linear-gradient(to bottom, #9333ea, transparent);
}

.timeline-marker {
  position: relative;
}
</style>
