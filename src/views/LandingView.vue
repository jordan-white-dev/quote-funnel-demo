<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useFunnelStore } from '@/stores/funnel'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useFunnelStore()

const isDevEnvironment = import.meta.env.DEV
</script>

<template>
  <FunnelPage
    title="America's largest vehicle glass specialist"
    subtitle="Find your vehicle by entering the year, make, model and style."
    :can-continue="true"
    continue-button-label="Let's get started"
    @continue-to-requested="router.push({ name: 'vehicle' })"
  >
    <button v-if="isDevEnvironment" type="button" @click="store.devFillOutProfile()">
      DEV: fill out profile
    </button>
    <RouterLink v-if="isDevEnvironment" :to="{ name: 'review' }"
      >DEV: jump to review page</RouterLink
    >
    <p>TODO: Landing page</p>
  </FunnelPage>
</template>
