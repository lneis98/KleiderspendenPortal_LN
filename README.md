# Kleiderspende Portal

Vue 3 Single-Page-App für Kleiderspenden mit Vite, Pinia, Vue Router und Tailwind CSS.

## Funktionen

- ✅ Spenden registrieren (Abholung oder Abgabe)
- ✅ Spendenstatus verfolgen
- ✅ Informations- und Rechtstexte
- ✅ Vollständig WCAG 2.1 konform (barrierefrei)

## Technische Features

- **Vue 3 Composition API** - Moderne, typsichere Entwicklung
- **Pinia State Management** - Zentralisiertes State Management
- **Vue Router** - Client-side Routing mit Transitions
- **Tailwind CSS** - Utility-first CSS Framework
- **Vite** - Blitzschnelles Build-Tool
- **Code Splitting** - Optimierte Performance
- **Clean Architecture** - Saubere Code-Struktur
- **Responsive Design** - User-friendly in allen Formaten

## Voraussetzungen

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

```bash
npm install
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Verfügbare Scripts

- `npm run dev` - Starte Entwicklungs-Server
- `npm run build` - Produkive Build erstellen
- `npm run preview` - Preview des Builds
- `npm run lint` - ESLint prüfung mit Auto-Fix

## Projektstruktur

```
src/
├── components/          # Vue Komponenten
│   ├── layout/         # Layout Komponenten (Header, Footer)
│   └── ui/             # Basis UI Komponenten
├── views/              # Seiten/Views
├── router/             # Vue Router Konfiguration
├── stores/             # Pinia Stores (State Management)
├── services/           # Business Logic Services
│   ├── storageService  # LocalStorage Abstraktion
│   └── validationService # Formular-Validierung
├── composables/        # Vue Composables (Reusable Logic)
├── utils/              # Utilities und Constants
└── styles/             # Global Styles
```

## Architektur

### Services

- **storageService** - LocalStorage Abstraktion für Datenpersistierung
- **validationService** - Formular-Validierung und Regeln

### Composables

- **useFormValidation** - Formular-Validierung Logic

### UI Komponenten

- **BaseButton** - Button mit verschiedenen Varianten
- **BaseInput** - Input-Feld mit Validierung
- **LoadingOverlay** - Loading Indikator
- **AppNotification** - Toast Notifications

## Design System

### Farben

- **Primary**: Blue (#2563eb)
- **Secondary**: Gray shades
- **Success**: Green
- **Error**: Red

## Barrierefreiheit (WCAG 2.1)

- ✅ ARIA Labels auf allen interaktiven Elementen
- ✅ Keyboard Navigation Support
- ✅ Skip Links
- ✅ Semantisches HTML
- ✅ Focus States
- ✅ Screen Reader optimiert
- ✅ Contrast Ratios konform

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## Performance Optimierungen

- Code Splitting per Route
- Lazy Loading von Komponenten
- Vendor Bundle Separation
- Asset Optimization
- Tree Shaking

## Konfiguration

- **Vite Config**: Siehe [`vite.config.js`](vite.config.js)
- **Tailwind Config**: Siehe [`tailwind.config.js`](tailwind.config.js)
- **ESLint Config**: Siehe [`.eslintrc.cjs`](.eslintrc.cjs)

## Kontakt

**Kleiderspende Birkenau**
- E-Mail: info@kleiderspende-birkenau.de
- Web: https://kleiderspende-birkenau.de

**Entwicklung**
- Leonie Neis
- E-Mail: leonie.neis@iu-study.org
- Matrikelnummer: IU14076896

## Lizenz

MIT License - Siehe LICENSE Datei
