<template>
  <div class="home-page">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="hero-section enhanced-hero" aria-labelledby="hero-title">
        <div class="hero-grid">
          <div class="hero-content">
            <h1 id="hero-title" class="hero-title">Kleiderspende für Menschen in Not</h1>
            <p class="hero-subtitle">
              Ihre gut erhaltene Kleidung rettet Leben in Krisengebieten wie Ukraine, Syrien, Afghanistan und Jemen.
            </p>
            <p class="hero-emphasis">Transparent · Schnell · Direkt vor Ort</p>
            <div class="cta-buttons">
              <BaseButton variant="primary" size="lg" @click="router.push('/register-type')">
                Jetzt Kleidung spenden
              </BaseButton>
              <BaseButton variant="secondary" size="lg" @click="router.push('/tracking')">
                Spende verfolgen
              </BaseButton>
            </div>
          </div>
          <div class="hero-image-wrapper">
            <img src="/assets/Package.png" alt="Kleiderspende Paket" class="hero-image" loading="lazy" decoding="async">
          </div>
        </div>
      </section>

      <!-- Options Section -->
      <section class="options-section enhanced-section" aria-labelledby="options-title">
        <header class="section-header">
          <h2 id="options-title" class="section-title">So funktioniert Ihre Spende</h2>
          <p class="section-description">
            Wählen Sie aus zwei einfachen Möglichkeiten, wie Sie Kleidung spenden möchten
          </p>
        </header>
        <div class="options-grid">
          <article class="option-card">
            <router-link to="/register-pickup" class="option-link">
              <div class="option-icon" aria-hidden="true">🚚</div>
              <h3 class="option-title">Kostenlose Abholung</h3>
              <p class="option-description">
                Wir holen Ihre Kleiderspende kostenlos bei Ihnen zu Hause ab.
                Terminvereinbarung bequem online.
              </p>
            </router-link>
          </article>

          <article class="option-card">
            <router-link to="/register-dropoff" class="option-link">
              <div class="option-icon" aria-hidden="true">📍</div>
              <h3 class="option-title">Abgabe vor Ort</h3>
              <p class="option-description">
                Bringen Sie Ihre Spende direkt zu unserer Sammelstelle in Birkenau.
                Montag bis Freitag von 8-18 Uhr.
              </p>
            </router-link>
          </article>

          <article class="option-card">
            <router-link to="/info" class="option-link">
              <div class="option-icon" aria-hidden="true">ℹ️</div>
              <h3 class="option-title">Weitere Informationen</h3>
              <p class="option-description">
                Erfahren Sie mehr über unsere Arbeit, die unterstützten Krisengebiete und
                wie Ihre Spende Menschen in Not hilft.
              </p>
            </router-link>
          </article>
        </div>
      </section>

      <!-- Crisis Section -->
      <section class="crisis-section enhanced-section" aria-labelledby="crisis-title">
        <header class="section-header">
          <h2 id="crisis-title" class="section-title">Unterstützte Krisengebiete</h2>
          <p class="section-description">
            Ihre Spenden erreichen Menschen in akuten Notlagen weltweit.
            Aktuelle Übersicht unserer Hilfsprojekte.
          </p>
        </header>
        <div class="crisis-grid">
          <article v-for="country in crisisCountries" :key="country.code" class="crisis-card">
            <header class="crisis-header">
              <h3 class="crisis-title">{{ country.name }}</h3>
            </header>
            <p class="crisis-description">
              {{ country.description }}
            </p>
            <div class="crisis-stats">
              <span class="stat">{{ country.donated }} Spenden gesammelt</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="stats-section enhanced-section" aria-labelledby="stats-title">
        <div class="stats-background"></div>
        <header class="section-header">
          <h2 id="stats-title" class="section-title">Transparenz in Zahlen</h2>
          <p class="section-description">
            Transparente Statistiken zu unserer Hilfswirkung.
            Jede Spende wird erfasst und dokumentiert.
          </p>
        </header>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">6.260</span>
            <span class="stat-label">Spenden gesammelt</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6</span>
            <span class="stat-label">Krisengebiete erreicht</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Transparenz</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24h</span>
            <span class="stat-label">Tracking-System</span>
          </div>
        </div>
      </section>

      <!-- Why Section -->
      <section class="why-section enhanced-section" aria-labelledby="why-title">
        <header class="section-header">
          <h2 id="why-title" class="section-title">Unsere Arbeitsweise</h2>
          <p class="section-description">
            Vier Prinzipien, nach denen wir arbeiten
          </p>
        </header>
        <div class="why-grid">
          <article class="why-item">
            <div class="why-icon" aria-hidden="true">🌍</div>
            <h3 class="why-title">Direkte Hilfe</h3>
            <p class="why-description">
              Ihre Kleidung erreicht Menschen in Notlagen direkt vor Ort.
              Ohne Umwege, ohne Zwischenhändler.
            </p>
          </article>

          <article class="why-item">
            <div class="why-icon" aria-hidden="true">📊</div>
            <h3 class="why-title">Transparenz</h3>
            <p class="why-description">
              Verfolgen Sie Ihre Spende bis zur Ankunft im Krisengebiet.
              Jeder Schritt wird dokumentiert und ist nachverfolgbar.
            </p>
          </article>

          <article class="why-item">
            <div class="why-icon" aria-hidden="true">⚡</div>
            <h3 class="why-title">Schnelle Abwicklung</h3>
            <p class="why-description">
              Von der Spende bis zur Verteilung vergehen nur wenige Tage.
              Effiziente Logistik für schnelle Hilfe.
            </p>
          </article>

          <article class="why-item">
            <div class="why-icon" aria-hidden="true">♻️</div>
            <h3 class="why-title">Nachhaltigkeit</h3>
            <p class="why-description">
              Wiederverwendung statt Wegwerfen - gut für Menschen in Not
              und gleichzeitig gut für unsere Umwelt.
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

// Unterstützte Krisengebiete
const crisisCountries = [
  {
    code: 'ua',
    name: 'Ukraine',
    description: 'Millionen Menschen benötigen warme Winterkleidung, Schuhe und Unterwäsche. Besonders in den Frontgebieten besteht großer Bedarf.',
    donated: 1580
  },
  {
    code: 'sy',
    name: 'Syrien',
    description: 'Besonders Kinderkleidung und Babysachen werden dringend benötigt. Nach dem Erdbeben ist die humanitäre Lage weiterhin kritisch.',
    donated: 1200
  },
  {
    code: 'ye',
    name: 'Jemen',
    description: 'Eine der größten humanitären Krisen weltweit. Grundlegende Kleidung für Familien wird dringend benötigt.',
    donated: 730
  },
  {
    code: 'af',
    name: 'Afghanistan',
    description: 'Großer Bedarf an warmer Kleidung für Familien in abgelegenen Regionen. Besonders Frauen und Kinder benötigen Schutz vor der Kälte.',
    donated: 980
  },
  {
    code: 'so',
    name: 'Somalia',
    description: 'Nach Jahren der Dürre benötigen Familien grundlegende Kleidung und Schuhe. Kinder sind besonders auf schützende Kleidung angewiesen.',
    donated: 450
  },
  {
    code: 'ht',
    name: 'Haiti',
    description: 'Nach Naturkatastrophen brauchen Menschen Kleidung für einen Neuanfang. Viele Familien haben nur das Nötigste.',
    donated: 320
  }
]
</script>

<style scoped>
/* Hero Section */
.hero-section {
  margin: 3rem 0 4rem;
  padding: 0;
  border-radius: 2rem;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #faf5ff 100%);
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.08);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

/* ===== MOBILE-FIRST STYLES (Default for all screens) ===== */

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem 1.25rem;
}

.hero-content {
  max-width: 100%;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #374151;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-weight: 400;
}

.hero-emphasis {
  font-size: 1rem;
  color: #6b21a8;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
}

.hero-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  order: -1;
}

.hero-image {
  max-width: 100%;
  width: 180px;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(139, 92, 246, 0.15));
}

/* Enhanced Sections */
.enhanced-section {
  margin: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Options Grid */
.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

.option-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);
  border-color: #c7d2fe;
}

.option-link {
  display: block;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
}

.option-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.option-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.option-card:hover .option-title {
  color: #8b5cf6;
}

.option-description {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
}

/* Crisis Grid */
.crisis-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

.crisis-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.crisis-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);
  border-color: #c7d2fe;
}

.crisis-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.crisis-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.crisis-description {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.crisis-stats {
  font-size: 0.875rem;
  color: #8b5cf6;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8), 0 -1px 0px rgba(0, 0, 0, 0.1);
}

/* Stats Section */
.stats-section {
  position: relative;
  padding: 3rem 2rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  overflow: hidden;
}

.stats-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.08;
  background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3), transparent 50%);
  pointer-events: none;
}

.stats-section .section-header {
  position: relative;
  z-index: 1;
}

.stats-section .section-title,
.stats-section .section-description {
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2.5rem;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  display: block;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.why-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.why-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.why-description {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

/* ===== TABLET & UP (min-width: 768px / Tailwind md) ===== */
@media (min-width: 768px) {
  .stat-item {
    padding: 2.5rem 1.5rem;
  }
}

/* ===== DESKTOP & UP (min-width: 768px / Tailwind md) ===== */
@media (min-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 4rem;
  }

  .hero-content {
    max-width: 600px;
  }

  .hero-image-wrapper {
    padding: 2rem;
    order: 0;
  }

  .hero-image {
    width: 400px;
  }

  .cta-buttons {
    flex-direction: row;
  }

  .options-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .crisis-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .crisis-flag {
    width: 50px;
    height: 33px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .why-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
