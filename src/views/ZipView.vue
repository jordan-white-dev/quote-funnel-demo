<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    :title="store.vehicleDisplayName"
    back-to-route="damage"
    :can-continue="store.isZipCodeValid"
    @continue-to-requested="router.push({ name: 'quote' })"
  >
    <p>TODO: Zip form</p>
  </FunnelPage>
</template>
