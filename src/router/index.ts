import LandingView from '@/views/LandingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    step?: number
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/vehicle',
      name: 'vehicle',
      component: () => import('@/views/VehicleView.vue'),
      meta: { step: 1 },
    },
    {
      path: '/damage',
      name: 'damage',
      component: () => import('@/views/DamageView.vue'),
      meta: { step: 1 },
    },
    {
      path: '/zip',
      name: 'zip',
      component: () => import('@/views/ZipView.vue'),
      meta: { step: 1 },
    },
    {
      path: '/quote',
      name: 'quote',
      component: () => import('@/views/QuoteView.vue'),
      meta: { step: 2 },
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/views/ScheduleView.vue'),
      meta: { step: 3 },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { step: 3 },
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('@/views/ReviewView.vue'),
      meta: { step: 4 },
    },
  ],
})

export default router
