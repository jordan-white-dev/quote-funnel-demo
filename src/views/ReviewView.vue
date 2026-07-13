<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <FunnelPage
    title="Review, confirm, and submit"
    back-to-route="contact"
    :can-continue="false"
    continue-button-label="Submit"
    @continue-to-requested="router.push({ name: 'landing' })"
  >
    <p>TODO: Review & submit</p>
    <RouterLink :to="{ name: 'landing' }">DEV: start over</RouterLink>
  </FunnelPage>
</template>
