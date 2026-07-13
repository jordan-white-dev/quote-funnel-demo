<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    :title="`We've got your ${store.vehicleDisplayName} covered!`"
    back-to-route="zip"
    :can-continue="store.isZipCodeValid"
    @continue-requested="router.push({ name: 'schedule' })"
  >
    <p>TODO: Quote form</p>
  </FunnelPage>
</template>
