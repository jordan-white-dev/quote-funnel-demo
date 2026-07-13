<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    title="What do you need fixed?"
    back-to-route="vehicle"
    :can-continue="store.isDamageSelectionComplete"
    @continue-to-requested="router.push({ name: 'zip' })"
  >
    <p>TODO: Damage form</p>
  </FunnelPage>
</template>
