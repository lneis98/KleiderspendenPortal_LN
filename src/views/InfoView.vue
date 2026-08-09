<template>
  <div class="info-view">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <section class="info-hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Alles was Sie über unsere Kleiderspende wissen müssen</h1>
            <p class="hero-subtitle">Erfahren Sie mehr über unsere Mission, Abläufe und wie Ihre Spende hilft.</p>
            <p class="hero-description">
              Unser Kleiderspendeverein Birkenau engagiert sich für Menschen in Krisengebieten wie Ukraine,
              Syrien, Haiti. Wir sammeln gut erhaltene Kleidung, sortieren sie sorgfältig
              und stellen sicher, dass sie diejenigen erreicht, die sie am dringendsten benötigen. Jeder
              Schritt Ihrer Spende ist nachvollziehbar — vielen Dank für Ihr Vertrauen!
            </p>
          </div>
          <div class="hero-image-container">
            <img src="/assets/infoPic.png" alt="Informationen zur Kleiderspende" class="hero-static-image" loading="lazy" decoding="async">
          </div>
        </div>
      </section>

      <!-- Mission Cards -->
      <section class="mission-section">
        <div class="mission-grid">
          <div class="mission-card">
            <div class="card-icon">🌍</div>
            <div class="card-content">
              <h3>Unsere Mission</h3>
              <p>Wir sammeln Kleiderspenden für Menschen in Krisengebieten weltweit. Ihre Spende hilft direkt vor Ort und macht einen echten Unterschied im Leben von Bedürftigen.</p>
            </div>
          </div>

          <div class="mission-card">
            <div class="card-icon">📦</div>
            <div class="card-content">
              <h3>Was wir sammeln</h3>
              <p>Saubere, gut erhaltene Kleidung aller Größen und Jahreszeiten. Besonders gebraucht werden warme Winterkleidung, Schuhe und Kinderkleidung.</p>
            </div>
          </div>

          <div class="mission-card">
            <div class="card-icon">✅</div>
            <div class="card-content">
              <h3>So funktioniert's</h3>
              <p>Nach Ihrer Anmeldung holen wir die Kleidung ab oder Sie bringen sie vorbei. Binnen 2-3 Wochen wird alles sortiert und an Hilfsorganisationen weitergeleitet.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Information Grid -->
      <section class="info-grid-section">
        <h2 class="section-title">Weitere Informationen</h2>
        <div class="info-grid">
          <!-- Öffnungszeiten -->
          <div class="info-card">
            <div class="card-header">
              <span class="card-emoji">🕒</span>
              <h3>Öffnungszeiten</h3>
            </div>
            <div class="card-body">
              <div class="hours-list">
                <div class="hours-item">
                  <span class="day">Mo - Fr</span>
                  <span class="time">09:00 - 17:00 Uhr</span>
                </div>
                <div class="hours-item">
                  <span class="day">Samstag</span>
                  <span class="time">09:00 - 13:00 Uhr</span>
                </div>
                <div class="hours-item">
                  <span class="day">Sonntag</span>
                  <span class="time">Geschlossen</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Spenden-Tipps -->
          <div class="info-card">
            <div class="card-header">
              <span class="card-emoji">💡</span>
              <h3>Spenden-Tipps</h3>
            </div>
            <div class="card-body">
              <ul class="tips-list">
                <li>Kleidung waschen & gut verpacken</li>
                <li>Keine beschädigte Kleidung</li>
                <li>Saisonale Kleidung bevorzugt</li>
                <li>Schuhe paarweise zusammenbinden</li>
              </ul>
            </div>
          </div>

          <!-- Wohin geht meine Spende -->
          <div class="info-card">
            <div class="card-header">
              <span class="card-emoji">📍</span>
              <h3>Wohin geht meine Spende?</h3>
            </div>
            <div class="card-body">
              <div class="destination-list">
                <div class="destination-item">
                  <span class="flag">🇺🇦</span>
                  <span class="country">Ukraine</span>
                </div>
                <div class="destination-item">
                  <span class="flag">🇸🇾</span>
                  <span class="country">Syrien</span>
                </div>
                <div class="destination-item">
                  <span class="flag">🇾🇪</span>
                  <span class="country">Jemen</span>
                </div>
                <div class="destination-item">
                  <span class="flag">🇦🇫</span>
                  <span class="country">Afghanistan</span>
                </div>
                <div class="destination-item">
                  <span class="flag">🇸🇴</span>
                  <span class="country">Somalia</span>
                </div>
                <div class="destination-item">
                  <span class="flag">🇭🇹</span>
                  <span class="country">Haiti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="contact-container">
          <div class="contact-header">
            <h2>Kontakt</h2>
          </div>
          <div class="contact-content">
            <div class="contact-info">
              <h3>Kleiderspende Birkenau e.V.</h3>
              <div class="address-line">📍 Hauptstraße 123, 69488 Birkenau</div>
              <div class="contact-links">
                <a href="tel:+4962012345" class="contact-btn">
                  <span class="btn-icon">📞</span>
                  <span>06201 / 12 34 5</span>
                </a>
                <a href="mailto:info@kleiderspende-birkenau.de" class="contact-btn">
                  <span class="btn-icon">✉️</span>
                  <span>info@kleiderspende-birkenau.de</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Legal Section -->
      <section class="legal-section">
        <div class="legal-container">
          <h2 class="legal-title">Rechtliche Hinweise</h2>
          <div class="legal-content">
            <p>
              Das vollständige Impressum finden Sie auf unserer
              <router-link to="/impressum">Impressum</router-link>-Seite. Informationen zum Schutz Ihrer Daten haben wir ausführlich in unserer
              <router-link to="/datenschutz">Datenschutzerklärung</router-link> für Sie bereitgestellt.
            </p>
            <h3 id="agb">Allgemeine Geschäftsbedingungen (AGB)</h3>
            <div class="legal-text">
              <p><strong>Teilnahmebedingungen</strong></p>
              <p>
                Die Teilnahme an der Kleiderspende ist kostenfrei. Gespendete Kleidung geht nach Übergabe in das Eigentum des Vereins über.
              </p>
              <p><strong>Annahmekriterien</strong></p>
              <p>
                Wir nehmen ausschließlich saubere und gut erhaltene Kleidungsstücke entgegen. Beschädigte oder stark verschmutzte Ware können wir aus hygienischen Gründen nicht annehmen.
              </p>
              <p><strong>Abholung und Transport</strong></p>
              <p>
                Die Abholung Ihrer Spende erfolgt nach vorheriger Terminvereinbarung. Bei größeren Mengen bieten wir einen kostenlosen Abholservice an.
              </p>
              <p><strong>Verwendung der Spenden</strong></p>
              <p>
                Alle Spenden werden sorgfältig sortiert und an vertrauensvolle Partnerorganisationen in Krisengebieten und an lokale Bedürftige weitergeleitet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Hero Section */
.info-hero {
  margin: 3rem 0;
  padding: 2.5rem 2rem;
  background: #faf5ff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

.hero-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-static-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Mission Section */
.mission-section {
  margin: 4rem 0;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.mission-card {
  position: relative;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  background: white;
  border: 1px solid #e5e7eb;
}

.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);
  border-color: #c7d2fe;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.card-content p {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
}

/* Info Grid Section */
.info-grid-section {
  margin: 4rem 0;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

.info-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.15);
  border-color: #c7d2fe;
}

.card-header {
  padding: 1.5rem 2rem 1rem;
  background: #f9fafb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-emoji {
  font-size: 2rem;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.card-body {
  padding: 2rem;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.day {
  font-weight: 600;
  color: #1f2937;
}

.time {
  color: #4b5563;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
}

.tips-list li:last-child {
  border-bottom: none;
}

.tips-list li::before {
  content: '✓ ';
  color: #8b5cf6;
  font-weight: bold;
  margin-right: 0.5rem;
}

.destination-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.destination-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.flag {
  font-size: 1.5rem;
}

.country {
  font-weight: 600;
  color: #1f2937;
}

/* Contact Section */
.contact-section {
  margin: 4rem 0;
}

.contact-container {
  background: #f9fafb;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

.contact-header {
  margin-bottom: 2rem;
  text-align: center;
}

.contact-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.contact-content {
  display: flex;
  justify-content: center;
}

.contact-info {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.contact-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.address-line {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  min-width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  color: #8b5cf6;
}

.btn-icon {
  font-size: 1.25rem;
}

/* Legal Section */
.legal-section {
  margin: 4rem 0;
  padding: 3rem 0;
  border-top: 1px solid #e5e7eb;
}

.legal-container {
  max-width: 900px;
  margin: 0 auto;
}

.legal-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
}

.legal-content {
  color: #4b5563;
  line-height: 1.6;
}

.legal-content p {
  margin-bottom: 1.5rem;
}

.legal-content a {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 600;
}

.legal-content a:hover {
  text-decoration: underline;
}

.legal-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 2rem 0 1rem;
}

.legal-text {
  background: #f9fafb;
  border-left: 2px solid #8b5cf6;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.legal-text p {
  margin-bottom: 1rem;
}

.legal-text p:last-child {
  margin-bottom: 0;
}

/* Responsive (min-width: 768px / Tailwind md) */
@media (min-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
  }

  .mission-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .destination-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-links {
    flex-direction: row;
  }
}
</style>
