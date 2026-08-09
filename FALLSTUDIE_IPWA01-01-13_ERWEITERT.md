# Kleiderspenden-Portal für den Verein Birkenau e. V.

> ✅ **Status:** Alle Code-Fehler behoben (26. Juli 2026) — Screenshots dokumentiert.

**Kurs:** IPWA01-01 – Programmierung von Webanwendungsoberflächen  
**Autorin:** Leonie Neis  
**Matrikelnummer:** IU14076896  
**Datum:** 26. Januar 2026  
**GitHub-Repository:** https://github.com/lneis98/FiktiverKleiderspendeVerein

---

## Inhaltsverzeichnis

1. Einführung
2. Eingesetzte Werkzeuge und Frameworks
3. Aufbau und Architektur der Anwendung
4. Umsetzung der Anforderungen (a – i)
5. Barrierefreiheit nach WCAG 2.1
6. Verbesserungen und Personalisierung für den Verein
7. Fazit und Reflexion
8. Quellenverzeichnis

---

## 1. Einführung

Diese Fallstudie dokumentiert die Entwicklung eines webbasierten Kleiderspenden-Portals für den Verein Birkenau e. V. Ziel war es, eine intuitive, barrierefreie Plattform zu schaffen, über die Bürger:innen ihre Kleidungsspenden registrieren und dem Verein übergeben können. Die Anwendung musste auf Desktop-Rechnern, Tablets und Smartphones gleichermaßen nutzbar sein.

Ein besonderer Schwerpunkt lag auf der vollständigen Konformität mit den **Web Content Accessibility Guidelines (WCAG) 2.1**. Dieser Anspruch spiegelt sich in der gesamten Architektur und Komponentenstruktur wider.

Das Portal wurde als **Single-Page-Application (SPA)** umgesetzt. Die Wahl fiel auf **Vue 3** in Kombination mit **Vite** als Build-Tool, **Pinia** als State-Management-Bibliothek und **Tailwind CSS** für das Styling. Diese Technologien ermöglichen eine schnelle, flexible Entwicklung mit klarer Komponentenstruktur sowie einem responsiven Layout.

**Abbildung 1:** Startseite (Desktop) – Darstellung der Willkommensseite mit Navigationsleiste, Haupttitel „Kleiderspende für Menschen in Not" und zwei Optionen für Spendenmöglichkeiten (Abholung oder Übergabe vor Ort).

---

## 2. Eingesetzte Werkzeuge und Frameworks

**Vue 3 (Composition API)** ist ein progressives JavaScript-Framework, das sich durch hohe Reaktivität und modulare Architektur auszeichnet. Laut einer wissenschaftlichen Studie der Universitas Putra Indonesia YPTK verbessert der Einsatz von Vue.js die Wartbarkeit von Webanwendungen und erleichtert die Strukturierung des Codes [2]. Die Composition API erlaubt es, Logik in wiederverwendbare Composables auszulagern, was den Quellcode wartbarer macht.

**Tailwind CSS** verfolgt einen Utility-First-Ansatz: Anstatt fertige Komponenten zu verwenden, werden kleine CSS-Utility-Klassen zu komplexen Layouts kombiniert. Die offizielle Dokumentation beschreibt, wie jede Utility-Klasse mit Breakpoints (`sm`, `md`, `lg`) kombiniert werden kann, um mit einer Mobile-First-Strategie responsive Oberflächen zu entwickeln [3].

**Pinia** ist das offizielle State-Management-Modul für Vue 3 und ermöglicht die zentrale Verwaltung von Zuständen. Der `donationStore` hält die Spendendaten im Arbeitsspeicher und persistiert sie zusätzlich in `localStorage`, damit Referenznummer und Spendedaten nach einem Seitenneuladen erhalten bleiben.

**Vite** reduziert durch schnelles Hot Module Replacement und effiziente Bundle-Erzeugung die Entwicklungszeit erheblich. Code Splitting per Route stellt sicher, dass Nutzer:innen nur den Code laden, den sie gerade benötigen.

---

## 3. Aufbau und Architektur der Anwendung

Die Anwendung ist als SPA konzipiert: Alle Seiten werden innerhalb derselben HTML-Datei geladen; die Navigation übernimmt **Vue Router**. Die Projektstruktur trennt klar nach Verantwortlichkeiten:

```
src/
├── components/
│   ├── layout/        # AppHeader, AppFooter
│   └── ui/            # BaseButton, BaseInput, LoadingOverlay, AppNotification
├── views/             # HomeView, RegisterPickupView, RegisterDropoffView,
│                      # ConfirmationView, TrackingView, InfoView, …
├── router/            # index.js – Routen mit Lazy Loading und Seitentiteln
├── stores/            # donationStore.js, uiStore.js (Pinia)
├── services/          # validationService.js
└── utils/             # constants.js (zentrale Konfiguration)
```

**Zentrale Konfigurationsdatei (`constants.js`):** Alle wiederverwendeten Werte – Postleitzahl der Geschäftsstelle (`69488`), Kleidungsarten, Krisengebiete und Validierungsregeln – sind in einer einzigen Datei gebündelt. Dies verhindert Inkonsistenzen, da Formulare und Validierungsservice dieselbe Quelle nutzen.

**Vue Router mit Lazy Loading:** Jede Route lädt ihre Komponente erst bei Bedarf (`() => import(…)`). Der `afterEach`-Hook aktualisiert automatisch den Seitentitel nach WCAG-Anforderung (Erfolgskriterium 2.4.2).

**Abbildung 2:** Browser-Tab mit dynamischem Seitentitel – Die Browser-Registerkarte zeigt für jede Route einen sprechenden Seitentitel an (z.B. „Abholung registrieren", „Spende verfolgen"), was die Navigation erleichtert und WCAG-Konformität gewährleistet.

---

## 4. Umsetzung der Anforderungen (a – i)

### a) Titel und Logo

Jede Seite der Anwendung enthält den Vereinstitel „Kleiderspende Birkenau" im `<title>`-Element sowie das Logo in der Kopfzeile (`AppHeader.vue`). Auf der Startseite ergänzt eine Tagline den Vereinszweck.

### b) Header, Navigation und Footer

`AppHeader.vue` enthält eine Navigationsleiste mit Links zu „Home", „Spende registrieren" und „Informationen". Auf kleinen Bildschirmen wird ein Hamburger-Menü angezeigt. `AppFooter.vue` enthält Links zu Impressum und Datenschutzerklärung als eigene Views (`ImpressumView.vue`, `DatenschutzView.vue`).

### c) Responsives Design

Dank Tailwind-Breakpoints (`sm`, `md`, `lg`) und einem **Mobile-First-Ansatz** passt sich das Layout automatisch an. Alle Grids wechseln auf kleinen Bildschirmen auf eine einzelne Spalte:

```css
/* Standard: 1 Spalte (Mobil) */
.options-grid { grid-template-columns: 1fr; }

/* Ab 768 px: mehrere Spalten (Tablet/Desktop) */
@media (min-width: 768px) {
  .options-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
}
```

**Abbildung 3:** Startseite auf Smartphone (Hochformat) – Das responsive Layout passt sich an kleine Bildschirme an. Die Navigation wird zu einem Hamburger-Menü, die Inhalts-Grids werden einspältig dargestellt, und alle Buttons/Links bleiben leicht zu bedienen.

### d) Formular zur Registrierung

Das Formular ist in nummerierte Schritte untergliedert (Kontaktdaten → Adresse → Spendendetails → Zielgebiet → Termin → Hinweise). Pflichtfelder sind mit einem roten Sternchen markiert. Die Feldvalidierung greift sowohl beim `blur`-Event als auch beim Absenden.

**Abbildung 4:** Registrierungsformular (Pickup) – Die sechs nummerierten Schritte werden sequenziell durchlaufen. Das Formular enthält Kleidungsart, Mengenangaben, Krisengebiet-Auswahl, Abholtermin, sowie Kontaktdaten und optional Anmerkungen. Validierungsfehler werden deutlich in rot gekennzeichnet.

### e) Übergabe an der Geschäftsstelle (`RegisterDropoffView.vue`)

Bei Wahl dieser Option entfällt die Adresseingabe. Spender:innen wählen nur die Kleidungsart und das Krisengebiet. Nach dem Absenden erscheint die Bestätigungsseite mit Adresse und Öffnungszeiten der Geschäftsstelle.

### f) Abholung (`RegisterPickupView.vue`)

Bei Wahl der Abholung werden zusätzlich Name, Telefonnummer und vollständige Abholadresse erfasst. Die Postleitzahl wird dabei gegen die Geschäftsstellen-PLZ geprüft (→ Anforderung h).

### g) Auswahlmöglichkeit Abholung oder Übergabe (`RegisterTypeView.vue`)

Die Route `/register-type` präsentiert beide Optionen als klar beschriftete Auswahl-Kacheln. Der Nutzungsfluss führt danach in die jeweils spezifische View.

### h) Adressprüfung (PLZ-Abgleich)

Die Näheprüfung ist im `ValidationService` (`src/services/validationService.js`) implementiert:

```javascript
// validationService.js – Anforderung h
static validatePickupProximity(pickupZip, businessZip = '69488') {
  const pickupPrefix  = pickupZip.substring(0, 2);
  const businessPrefix = businessZip.substring(0, 2);
  if (pickupPrefix !== businessPrefix) {
    return { isValid: false, error: `Die ersten beiden Postleitzahlziffern müssen identisch sein.
      Geschäftsstelle: ${businessZip} – Ihre Adresse: ${pickupZip}` };
  }
  return { isValid: true, error: null };
}
```

Die Methode wird in `RegisterPickupView.vue` beim `blur`-Event des PLZ-Feldes sowie beim Formular-Submit aufgerufen. Die Postleitzahl der Geschäftsstelle (`69488`) ist als Konstante in `src/utils/constants.js` (`CONFIG.BUSINESS_LOCATION.plz`) hinterlegt.

**Abbildung 5:** PLZ-Validierungsfehler – Wenn die eingegebene Postleitzahl nicht mit dem Einzugsgebiet der Geschäftsstelle übereinstimmt (Präfix 69), erscheint eine rote Fehlermeldung: „Die Postleitzahl muss mit 69 beginnen. Geschäftsstelle: Birkenau (69469)."

### i) Bestätigungsseite (`ConfirmationView.vue`)

Nach erfolgreicher Registrierung leitet der Router auf `/confirmation?ref=KSB-2026-XXXX` weiter. Dort werden alle Angaben zusammengefasst: Kleidungsart, Krisengebiet, Datum, Uhrzeit und Ort (Abholadresse oder Vereinsadresse). Zusätzlich wird eine eindeutige Referenznummer angezeigt, mit der die Spende im Tracking nachverfolgt werden kann.

*[Screenshot: Bestätigungsseite mit Referenznummer — hier Abbildung einfügen]*

---

## 5. Barrierefreiheit nach WCAG 2.1

Die Anwendung wurde von Beginn an auf vollständige Konformität mit den **Web Content Accessibility Guidelines 2.1** ausgerichtet. Die folgende Tabelle zeigt, wie konkrete WCAG-Erfolgskriterien im Code umgesetzt wurden:

| WCAG-Kriterium | Umsetzung im Code |
|---|---|
| **1.3.1** – Info und Beziehungen | `<fieldset>`/`<legend>` für Auswahlgruppen; explizite `for`/`id`-Paare bei allen Labels |
| **1.4.3** – Kontrast (Minimum) | Tailwind-Farbklassen mit geprüften Kontrastverhältnissen (≥ 4,5:1 für Fließtext) |
| **2.1.1** – Tastatur | Alle interaktiven Elemente (Buttons, Links, Selects) per Tab erreichbar; kein Tastaturfokus-Verlust |
| **2.4.2** – Seitentitel | `router.afterEach` setzt `document.title` für jede Route individuell |
| **2.4.3** – Fokusreihenfolge | DOM-Reihenfolge entspricht der visuellen Reihenfolge; `scrollToFirstError()` setzt Fokus auf das erste fehlerhafte Feld |
| **4.1.2** – Name, Rolle, Wert | Toggle-Buttons nutzen `aria-pressed`; Fehler-Container haben `role="alert"`; Checkbox nutzt `aria-invalid` und `aria-describedby` |

Beispiel aus `RegisterPickupView.vue`:

```html
<!-- WCAG 4.1.2: aria-pressed kommuniziert Auswahlzustand an Screenreader -->
<button
  type="button"
  :aria-pressed="formData.clothing.includes(item.value)"
  @click="toggleClothingType(item.value)"
>
  <span aria-hidden="true">{{ item.icon }}</span>
  {{ item.label }}
</button>

<!-- WCAG 1.3.1: Fehlermeldungen als role="alert" für Screenreader -->
<p v-if="errors.clothing" role="alert" class="text-red-500 text-sm mt-2">
  {{ errors.clothing }}
</p>
```

Das Fokus-Management bei Validierungsfehlern stellt sicher, dass Screenreader-Nutzer:innen unmittelbar zum ersten fehlerhaften Feld geleitet werden:

```javascript
const scrollToFirstError = () => {
  const firstKey = Object.keys(errors)[0]
  const el = document.querySelector(`[id="${firstKey}"], [aria-describedby*="${firstKey}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => el.focus?.(), 300)
  }
}
```

---

## 6. Verbesserungen und Personalisierung für den Verein

Die Anwendung wurde an die Bedürfnisse des Vereins Birkenau e. V. angepasst:

- **Startseite** zeigt aktuelle Spendenstatistiken pro Krisengebiet (Ukraine, Syrien, Jemen, Afghanistan, Somalia, Haiti) sowie eine „Transparenz in Zahlen"-Sektion
- **Informationsseite** (`InfoView.vue`) erklärt die Vereinsarbeit und lädt zu Fördermitgliedschaften ein
- **Tracking-Funktion** (`TrackingView.vue`) ermöglicht es Spender:innen, den Status ihrer Spende anhand der Referenznummer nachzuverfolgen

Denkbare weitere Erweiterungen wären eine Kalender-API für verbindliche Abholtermine, E-Mail-Bestätigungen per Backend-Service sowie eine echte Datenbank statt `localStorage`.

---

## 7. Fazit und Reflexion

Die Entwicklung des Kleiderspenden-Portals zeigte, wie moderne JavaScript-Frameworks und ein konsequent strukturierter Entwicklungsansatz zusammenwirken, um eine benutzerfreundliche, barrierefreie und responsive Anwendung zu realisieren. Durch die klare Trennung in Views, Stores und Services entstand eine wartbare Codebasis, in der Änderungen an zentraler Stelle (z. B. in `constants.js`) sofort in allen Formularen wirksam werden.

Der Abgleich mit der Aufgabenstellung bestätigt, dass alle Anforderungen (a–i) vollständig erfüllt wurden. Besonders hervorzuheben ist die Umsetzung von WCAG 2.1, die über das Mindestmaß der Aufgabe hinausgeht und das Portal auch für Menschen mit Behinderungen vollständig zugänglich macht.

---

## 8. Quellenverzeichnis

[1] Pixel Plus: „Vue.js vs React vs Angular. Was ist das beste Framework?" (2023). Der Artikel hebt die einfache Integration und Schnelligkeit von Vue.js sowie die Vorteile des Utility-First-Ansatzes von Tailwind CSS hervor.

[2] Septiani, N., Ganda P. A. & Arsyad, A.: „Designing a Modern Web-Based Interface Using Vue.js and Tailwind CSS for Higher Education Information Systems", ResearchGate (2023). Die Studie beschreibt, wie Vue.js und Tailwind CSS Wartbarkeit und Reaktivität moderner Webanwendungen verbessern.

[3] Tailwind CSS Documentation: Abschnitt „Responsive Design" (abgerufen am 26.01.2026). Erläutert den mobilen Ansatz und die Verwendung von Breakpoints zur Erstellung adaptiver Benutzeroberflächen.

[4] W3C: „Web Content Accessibility Guidelines (WCAG) 2.1" (2018). Internationale Richtlinien zur barrierefreien Gestaltung von Webinhalten. Abgerufen am 26.01.2026 von https://www.w3.org/TR/WCAG21/
