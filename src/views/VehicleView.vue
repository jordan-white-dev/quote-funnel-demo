<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    title="Tell us about your vehicle"
    subtitle="Find your vehicle by entering the year, make, model and style."
    back-to-route="landing"
    :can-continue="store.isVehicleComplete"
    @continue-requested="router.push({ name: 'damage' })"
  >
    <p>TODO: Vehicle form</p>
  </FunnelPage>
</template>
