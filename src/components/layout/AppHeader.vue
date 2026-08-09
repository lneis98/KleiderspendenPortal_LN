<template>
  <header class="header sticky top-0 z-50 border-b border-white/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between min-h-[80px] sm:min-h-[100px] py-4">
        <!-- Logo -->
        <router-link to="/" class="logo-link flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 hover:scale-[1.02] transition-transform duration-300 focus-ring rounded-lg p-2">
          <img 
            src="/assets/logo.png" 
            alt="Kleiderspendenverein Birkenau" 
            class="logo-image w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[72px] md:h-[72px] lg:w-[90px] lg:h-[90px] rounded-lg object-cover shadow-sm hidden sm:block"
            loading="lazy"
            decoding="async"
          />
          <div class="logo-text flex flex-col gap-1">
            <span class="logo-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Kleider<span class="text-purple-600">Spende</span>
            </span>
            <p class="logo-subtitle text-sm sm:text-base font-semibold text-gray-600 m-0 leading-none md:hidden">Kleiderverein Birkenau</p>
            <p class="logo-subtitle text-xs sm:text-sm font-semibold text-gray-600 m-0 leading-none hidden md:block">Birkenau</p>
            <p class="logo-tagline text-xs text-gray-500 m-0 max-w-[200px] leading-tight hidden lg:block">
              Helfen Sie mit Ihrer Kleiderspende aktuellen Krisenländern weltweit
            </p>
          </div>
        </router-link>

        <!-- Desktop Navigation (ab 1024px) -->
        <nav class="hidden lg:flex items-center gap-6" aria-label="Hauptnavigation">
          <router-link 
            to="/" 
            class="nav-link"
            active-class="nav-link-active"
          >
            Home
          </router-link>
          <router-link 
            to="/register-type" 
            class="nav-link"
            active-class="nav-link-active"
          >
            Spenden
          </router-link>
          <router-link 
            to="/tracking" 
            class="nav-link"
            active-class="nav-link-active"
          >
            Spende verfolgen
          </router-link>
          <router-link 
            to="/info" 
            class="nav-link"
            active-class="nav-link-active"
          >
            Info
          </router-link>
        </nav>

        <!-- Mobile/Tablet Menu Button (bis 1024px) -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden mobile-menu-toggle p-2 rounded-lg hover:bg-gray-100 focus-ring flex flex-col gap-1.5 w-10 h-10 justify-center items-center"
          type="button"
          aria-label="Menü öffnen"
          :aria-expanded="mobileMenuOpen"
          :aria-controls="mobileMenuOpen ? 'mobile-menu' : undefined"
        >
          <span class="block w-6 h-0.5 bg-gray-900 transition-all duration-300" :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }" aria-hidden="true"></span>
          <span class="block w-6 h-0.5 bg-gray-900 transition-all duration-300" :class="{ 'opacity-0': mobileMenuOpen }" aria-hidden="true"></span>
          <span class="block w-6 h-0.5 bg-gray-900 transition-all duration-300" :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }" aria-hidden="true"></span>
        </button>
      </div>

      <!-- Mobile Navigation (bis 1024px) -->
      <Transition name="slide-down">
        <nav 
          v-if="mobileMenuOpen" 
          id="mobile-menu"
          class="lg:hidden py-4 border-t border-purple-100"
          aria-label="Mobile Navigation"
        >
          <div class="flex flex-col space-y-2">
            <router-link 
              to="/" 
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="closeMobileMenu"
            >
              Home
            </router-link>
            <router-link 
              to="/register-type" 
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="closeMobileMenu"
            >
              Spenden
            </router-link>
            <router-link 
              to="/tracking" 
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="closeMobileMenu"
            >
              Spende verfolgen
            </router-link>
            <router-link 
              to="/info" 
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="closeMobileMenu"
            >
              Info
            </router-link>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUIStore } from '../../stores/uiStore';

const uiStore = useUIStore();
const { mobileMenuOpen } = storeToRefs(uiStore);
const { toggleMobileMenu, closeMobileMenu } = uiStore;
</script>

<style scoped>
/* Header Background - Lavender Gradient */
.header {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #8b5cf6 75%, #7c3aed 100%);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

/* Logo Styles */
.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo-image {
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-image {
  transform: scale(1.05);
}

.logo-text .logo-title {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Navigation Links - Ultra Modern Design */
.nav-link {
  @apply relative text-white font-bold text-base px-6 py-3 rounded-2xl transition-all duration-300;
  text-decoration: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(16px) saturate(180%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15),
              inset 0 1px 1px rgba(255, 255, 255, 0.4),
              inset 0 -1px 1px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.3px;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: -1;
}

.nav-link:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 100%);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.25),
              0 4px 12px rgba(139, 92, 246, 0.3),
              inset 0 1px 2px rgba(255, 255, 255, 0.5),
              inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link-active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.25) 100%);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.4),
              0 6px 16px rgba(31, 38, 135, 0.2),
              inset 0 2px 4px rgba(255, 255, 255, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.05);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 4px;
  background: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(255, 255, 255, 0.8);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Mobile Menu Toggle Animation */
.mobile-menu-toggle {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15));
  backdrop-filter: blur(16px) saturate(180%);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.15),
              inset 0 1px 1px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.25));
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(31, 38, 135, 0.25),
              inset 0 1px 2px rgba(255, 255, 255, 0.4);
}

.mobile-menu-toggle span {
  transform-origin: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Mobile Navigation */
.mobile-nav-link {
  @apply block px-5 py-3.5 text-gray-700 rounded-xl transition-all duration-300 font-semibold;
  border: 2px solid transparent;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(249, 250, 251, 0.8));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mobile-nav-link:hover {
  border-color: rgba(139, 92, 246, 0.3);
  background: linear-gradient(135deg, rgba(243, 232, 255, 0.8), rgba(237, 233, 254, 0.9));
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.mobile-nav-link-active {
  @apply text-purple-700 font-bold;
  border-color: rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, rgba(243, 232, 255, 1), rgba(237, 233, 254, 1));
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3),
              inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
