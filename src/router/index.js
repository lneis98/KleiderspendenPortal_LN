import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Kleiderspende Birkenau - Helfen Sie mit Ihrer Spende',
        transition: 'fade'
      }
    },
    {
      path: '/register-type',
      name: 'register-type',
      component: () => import('../views/RegisterTypeView.vue'),
      meta: {
        title: 'Spende registrieren - Art wählen',
        transition: 'slide-left'
      }
    },
    {
      path: '/register-pickup',
      name: 'register-pickup',
      component: () => import('../views/RegisterPickupView.vue'),
      meta: {
        title: 'Abholung registrieren',
        transition: 'slide-left'
      }
    },
    {
      path: '/register-dropoff',
      name: 'register-dropoff',
      component: () => import('../views/RegisterDropoffView.vue'),
      meta: {
        title: 'Abgabe registrieren',
        transition: 'slide-left'
      }
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: () => import('../views/TrackingView.vue'),
      meta: {
        title: 'Spende verfolgen',
        transition: 'fade'
      }
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('../views/ConfirmationView.vue'),
      meta: {
        title: 'Bestätigung',
        transition: 'fade'
      }
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
      meta: {
        title: 'Informationen',
        transition: 'fade'
      }
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/ImpressumView.vue'),
      meta: {
        title: 'Impressum',
        transition: 'fade'
      }
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      component: () => import('../views/DatenschutzView.vue'),
      meta: {
        title: 'Datenschutz',
        transition: 'fade'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '404 - Seite nicht gefunden'
      }
    }
  ]
});

// Update page title on route change
router.afterEach((to) => {
  document.title = to.meta.title || 'Kleiderspende Birkenau';
});

export default router;
