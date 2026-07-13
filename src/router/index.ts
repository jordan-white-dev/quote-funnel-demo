import LandingView from '@/views/LandingView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

declare module 'vue-router' {
  interface RouteMeta {
    step?: number
  }
}

type FunnelStore = ReturnType<typeof useFunnelStore>

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
      path: '/plan',
      name: 'plan',
      component: () => import('@/views/PlanView.vue'),
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

const funnelGates: { name: string; isComplete: (store: FunnelStore) => boolean }[] = [
  { name: 'vehicle', isComplete: (store) => store.isVehicleComplete },
  { name: 'damage', isComplete: (store) => store.isDamageSelectionComplete },
  { name: 'zip', isComplete: (store) => store.isZipCodeValid },
  { name: 'plan', isComplete: (store) => store.isPlanComplete },
  { name: 'schedule', isComplete: (store) => store.isServiceScheduleComplete },
  { name: 'contact', isComplete: (store) => store.isContactInformationComplete },
  { name: 'review', isComplete: () => false },
]

router.beforeEach((to) => {
  if (to.meta.step === undefined) {
    return true
  }

  const store = useFunnelStore()

  const frontierGateIndex = funnelGates.findIndex((funnelGate) => !funnelGate.isComplete(store))
  const targetGateIndex = funnelGates.findIndex((funnelGate) => to.name === funnelGate.name)

  if (funnelGates[frontierGateIndex] === undefined) {
    return true
  }

  if (targetGateIndex > frontierGateIndex) {
    return { name: funnelGates[frontierGateIndex].name }
  }

  return true
})

export default router
