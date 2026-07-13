<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    title="We'll come to you for free!"
    back-to-route="quote"
    :can-continue="store.isZipCodeValid"
    @continue-requested="router.push({ name: 'contact' })"
  >
    <p>TODO: Schedule form</p>
  </FunnelPage>
</template>
