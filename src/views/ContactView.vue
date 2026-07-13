<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    title="How can we reach you?"
    subtitle="We'll send you an appointment confirmation and follow-up details."
    back-to-route="schedule"
    :can-continue="store.isZipCodeValid"
    @continue-to-requested="router.push({ name: 'review' })"
  >
    <p>TODO: Contact information form</p>
  </FunnelPage>
</template>
