<template>
  <div class="confirmation-page">
    <div class="container mx-auto px-4 py-8">

      <!-- Success Hero -->
      <section class="success-hero text-center mb-12">
        <div class="success-animation mb-6">
          <div class="success-icon text-6xl">✅</div>
        </div>
        <h1 class="success-title text-3xl font-bold text-gray-900 mb-4">
          {{ confirmationTitle }}
        </h1>
        <p class="success-subtitle text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Vielen Dank für Ihre Unterstützung! Ihre Hilfe macht einen Unterschied.
        </p>
        <div class="reference-number inline-flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-lg px-6 py-4 shadow-md">
          <span class="reference-label text-sm text-gray-600 font-medium">Referenznummer:</span>
          <span class="reference-value font-mono text-lg font-bold text-purple-600">
            {{ referenceNumber }}
          </span>
          <button
            @click="copyReference"
            class="copy-btn bg-white border border-purple-200 rounded px-3 py-1 hover:bg-purple-50 transition-colors"
            :title="copied ? 'Kopiert!' : 'Referenznummer kopieren'"
            :aria-label="copied ? 'Referenznummer kopiert' : 'Referenznummer in Zwischenablage kopieren'"
          >
            {{ copied ? '✓' : '📋' }}
          </button>
        </div>
      </section>

      <!-- Bestätigungsdetails -->
      <section class="confirmation-details mb-12" aria-label="Zusammenfassung Ihrer Spende">
        <div class="details-grid grid md:grid-cols-2 gap-6">

          <!-- Spendendetails (Kleidung + Krisengebiet) — für beide Typen -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">👕</div>
              <h2 class="card-title text-lg font-bold text-gray-900">Spendendetails</h2>
            </div>
            <dl class="card-content space-y-3">
              <div class="detail-row">
                <dt class="text-gray-600 font-medium text-sm mb-1">Kleidungsarten:</dt>
                <dd class="text-gray-900 font-semibold">{{ clothingTypesText }}</dd>
              </div>
              <div v-if="donationData.quantity" class="detail-row flex justify-between">
                <dt class="text-gray-600 font-medium">Menge:</dt>
                <dd class="text-gray-900 font-semibold">{{ quantityText }}</dd>
              </div>
              <div class="detail-row flex justify-between">
                <dt class="text-gray-600 font-medium">Zielgebiet:</dt>
                <dd class="text-gray-900 font-semibold">{{ crisisAreaText }}</dd>
              </div>
            </dl>
          </div>

          <!-- Termin / Abgabe-Informationen -->
          <!-- Datum, Uhrzeit und Ort werden für BEIDE Spendentypen angezeigt (Anforderung b.i) -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">📅</div>
              <h2 class="card-title text-lg font-bold text-gray-900">
                {{ donationData.type === 'pickup' ? 'Abholtermin' : 'Abgabe' }}
              </h2>
            </div>
            <dl class="card-content space-y-3">

              <!-- Pickup: zeigt den gewählten Wunschtermin -->
              <template v-if="donationData.type === 'pickup'">
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Datum:</dt>
                  <dd class="text-gray-900 font-semibold">{{ pickupDateFormatted }}</dd>
                </div>
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Uhrzeit:</dt>
                  <dd class="text-gray-900 font-semibold">{{ pickupTimeFormatted }}</dd>
                </div>
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Abholadresse:</dt>
                  <dd class="text-gray-900 font-semibold">{{ pickupAddress }}</dd>
                </div>
              </template>

              <!-- Dropoff: Datum und Uhrzeit werden aus dem Registrierungszeitstempel ausgelesen -->
              <template v-else>
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Datum:</dt>
                  <dd class="text-gray-900 font-semibold">{{ submittedDate }}</dd>
                </div>
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Uhrzeit:</dt>
                  <dd class="text-gray-900 font-semibold">{{ submittedTime }}</dd>
                </div>
                <div class="detail-row flex justify-between">
                  <dt class="text-gray-600 font-medium">Ort:</dt>
                  <dd class="text-gray-900 font-semibold text-right">
                    {{ businessLocation.name }}<br>
                    <span class="text-sm font-normal text-gray-600">{{ businessLocation.address }}</span>
                  </dd>
                </div>
              </template>

            </dl>
          </div>

          <!-- Kontaktdaten — nur bei Pickup (Dropoff erfasst keine Kontaktdaten) -->
          <div
            v-if="donationData.type === 'pickup'"
            class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
          >
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">👤</div>
              <h2 class="card-title text-lg font-bold text-gray-900">Kontaktdaten</h2>
            </div>
            <dl class="card-content space-y-3">
              <div class="detail-row flex justify-between">
                <dt class="text-gray-600 font-medium">Name:</dt>
                <dd class="text-gray-900 font-semibold">{{ donationData.firstName }} {{ donationData.lastName }}</dd>
              </div>
              <div class="detail-row flex justify-between">
                <dt class="text-gray-600 font-medium">Telefon:</dt>
                <dd class="text-gray-900 font-semibold">{{ donationData.phone }}</dd>
              </div>
              <div v-if="donationData.email" class="detail-row flex justify-between">
                <dt class="text-gray-600 font-medium">E-Mail:</dt>
                <dd class="text-gray-900 font-semibold">{{ donationData.email }}</dd>
              </div>
            </dl>
          </div>

          <!-- Nächste Schritte -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">✓</div>
              <h2 class="card-title text-lg font-bold text-gray-900">Wie geht es weiter?</h2>
            </div>
            <ol class="card-content space-y-4 list-none">
              <li class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" aria-hidden="true">1</div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-0.5">Bestätigung erhalten</h3>
                  <p class="text-gray-600 text-xs">Ihre Registrierung wurde erfolgreich gespeichert.</p>
                </div>
              </li>
              <li class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" aria-hidden="true">2</div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-0.5">Vorbereitung</h3>
                  <p class="text-gray-600 text-xs">Bereiten Sie Ihre Kleiderspende gut verpackt vor.</p>
                </div>
              </li>
              <li class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" aria-hidden="true">3</div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-0.5">
                    {{ donationData.type === 'pickup' ? 'Abholung' : 'Abgabe' }}
                  </h3>
                  <p class="text-gray-600 text-xs">
                    {{ donationData.type === 'pickup'
                      ? 'Unser Team wird Sie am vereinbarten Termin kontaktieren.'
                      : 'Bringen Sie Ihre Spende zu unseren Öffnungszeiten vorbei.' }}
                  </p>
                </div>
              </li>
              <li class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" aria-hidden="true">4</div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-sm mb-0.5">Tracking</h3>
                  <p class="text-gray-600 text-xs">Verfolgen Sie Ihre Spende mit der Referenznummer.</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- Zusätzliche Hinweise (nur Pickup, da Dropoff kein Kommentarfeld hat) -->
          <div
            v-if="donationData.comments"
            class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all md:col-span-2"
          >
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">📝</div>
              <h2 class="card-title text-lg font-bold text-gray-900">Zusätzliche Hinweise</h2>
            </div>
            <p class="text-gray-900">{{ donationData.comments }}</p>
          </div>

        </div>
      </section>

      <!-- Aktionen -->
      <section class="confirmation-actions" aria-label="Weitere Aktionen">
        <div class="actions-grid grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <BaseButton variant="primary" size="lg" full-width @click="printConfirmation">
            <span class="btn-icon text-xl mr-2" aria-hidden="true">🖨️</span>
            <span>PDF drucken</span>
          </BaseButton>
          <BaseButton variant="secondary" size="lg" full-width @click="router.push('/tracking')">
            <span class="btn-icon text-xl mr-2" aria-hidden="true">📍</span>
            <span>Spende verfolgen</span>
          </BaseButton>
          <BaseButton variant="secondary" size="lg" full-width @click="router.push('/')">
            <span class="btn-icon text-xl mr-2" aria-hidden="true">🏠</span>
            <span>Zur Startseite</span>
          </BaseButton>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useDonationStore } from '@/stores/donationStore'
import CONFIG from '@/utils/constants'

const router = useRouter()
const route  = useRoute()
const donationStore = useDonationStore()
const copied = ref(false)

const referenceNumber  = computed(() => route.query.ref || 'N/A')
const donationData     = computed(() => donationStore.lastDonation || {})

// Vereinsadresse aus CONFIG — kein hartcodierter String
const businessLocation = CONFIG.BUSINESS_LOCATION

// ── Bestätigungstitel ───────────────────────────────────────────────────────
const confirmationTitle = computed(() =>
  donationData.value.type === 'pickup'
    ? 'Ihre Abholung wurde erfolgreich registriert'
    : 'Ihre Spende wurde erfolgreich registriert'
)

// ── Spendendetails ──────────────────────────────────────────────────────────
const clothingLabels = Object.fromEntries(
  CONFIG.FORM_CLOTHING_TYPES.map(t => [t.value, t.label])
)
const quantityLabels = Object.fromEntries(
  CONFIG.FORM_QUANTITY_OPTIONS.map(q => [q.value, q.label])
)
const crisisLabels = Object.fromEntries(
  CONFIG.CRISIS_AREAS.map(a => [a.value, `${a.flag} ${a.label}`])
)

const clothingTypesText = computed(() =>
  donationData.value.clothing?.map(c => clothingLabels[c] || c).join(', ') || 'Nicht angegeben'
)
const quantityText = computed(() =>
  quantityLabels[donationData.value.quantity] || ''
)
const crisisAreaText = computed(() =>
  crisisLabels[donationData.value.crisisArea] || 'Nicht angegeben'
)

// ── Pickup-spezifische Anzeige ──────────────────────────────────────────────
const pickupDateFormatted = computed(() => {
  if (!donationData.value.pickupDate) return 'Nicht angegeben'
  return new Date(donationData.value.pickupDate).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
})

const pickupTimeFormatted = computed(() => {
  const map = {
    morning:   'Vormittags (8–12 Uhr)',
    afternoon: 'Nachmittags (12–16 Uhr)',
    evening:   'Spätnachmittags (16–18 Uhr)'
  }
  return map[donationData.value.pickupTime] || donationData.value.pickupTime || 'Nicht angegeben'
})

const pickupAddress = computed(() => {
  const d = donationData.value
  if (d.street && d.plz && d.city) return `${d.street}, ${d.plz} ${d.city}`
  return 'Nicht angegeben'
})

// ── Dropoff: Datum und Uhrzeit aus dem Registrierungszeitstempel ────────────
// submittedAt wird als ISO-String gespeichert; hier werden Datum und Uhrzeit
// getrennt ausgelesen, damit die Bestätigungsseite Anforderung b.i erfüllt.
const submittedDate = computed(() => {
  if (!donationData.value.submittedAt) return 'Heute'
  return new Date(donationData.value.submittedAt).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
})

const submittedTime = computed(() => {
  if (!donationData.value.submittedAt) return 'Jetzt'
  return new Date(donationData.value.submittedAt).toLocaleTimeString('de-DE', {
    hour: '2-digit', minute: '2-digit'
  }) + ' Uhr'
})

// ── Aktionen ────────────────────────────────────────────────────────────────
const copyReference = async () => {
  try {
    await navigator.clipboard.writeText(referenceNumber.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Clipboard-API nicht verfügbar (z.B. unsichere HTTP-Umgebung)
  }
}

const printConfirmation = () => window.print()

onMounted(() => {
  if (!route.query.ref) router.push('/')
})
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  padding: 2rem 0;
}

@media print {
  .confirmation-actions { display: none; }
  .copy-btn             { display: none; }
  .detail-card          { break-inside: avoid; page-break-inside: avoid; }
}
</style>
