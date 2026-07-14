<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseAccordion from '@/components/BaseAccordion.vue'
import FunnelPage from '@/components/FunnelPage.vue'
import PillRadio from '@/components/PillRadio.vue'
import { STORE_ADDRESS, useFunnelStore, type ServiceLocation } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()

const LOCATION_OPTIONS: Array<{ label: string; value: ServiceLocation }> = [
  { label: 'Our mobile shop comes to you', value: 'mobile' },
  { label: 'You come to our store', value: 'store' },
]

const TIME_SLOTS = [
  'Wednesday, July 15, 2026 at 10:00 AM',
  'Thursday, July 16, 2026 at 1:30 PM',
  'Friday, July 17, 2026 at 9:00 AM',
]
</script>

<template>
  <FunnelPage
    title="Where would you like service?"
    back-to-route="plan"
    :can-continue="store.isServiceScheduleComplete"
    @continue-requested="router.push({ name: 'contact' })"
  >
    <template #banner>
      <BaseAccordion class="mobile-banner">
        <template #summary>
          <span aria-hidden="true">✅</span>
          We'll come to you for free!
        </template>
        <p class="banner-copy">
          Schedule now to take advantage of our mobile service at no additional cost.
        </p>
        <p class="banner-price">
          <s>reg. price $49.99</s>
          <span class="free-pill">$0.00</span>
        </p>
      </BaseAccordion>
    </template>

    <div class="pill-stack">
      <PillRadio
        v-for="option in LOCATION_OPTIONS"
        :key="option.value"
        name="service-location"
        :value="option.value"
        :label="option.label"
        :model-value="store.serviceSchedule.serviceLocation"
        @update:model-value="store.setServiceLocation"
      />
    </div>

    <section v-if="store.serviceSchedule.serviceLocation !== ''">
      <p v-if="store.serviceSchedule.serviceLocation === 'store'" class="location-line">
        You'll visit us at {{ STORE_ADDRESS }}
      </p>
      <p v-else class="location-line">We'll come to your location in ZIP {{ store.zipCode }}</p>

      <h2>When works best?</h2>
      <div class="pill-stack">
        <PillRadio
          v-for="slot in TIME_SLOTS"
          :key="slot"
          name="time-slot"
          :value="slot"
          v-model="store.serviceSchedule.slot"
        />
      </div>
    </section>
  </FunnelPage>
</template>

<style scoped>
.mobile-banner {
  margin-block-end: 1.5rem;
  border-color: var(--color-success);
  background: var(--color-success-soft);
}

.banner-copy {
  margin: 0 0 0.5rem;
}

.banner-price {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.banner-price s {
  color: #555;
  font-size: 0.875rem;
}

.free-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--color-success);
  color: #fff;
  font-weight: 700;
}

.pill-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 26rem;
}

section {
  margin-block: 1.5rem;
}

.location-line {
  margin: 0 0 1rem;
  font-weight: 600;
}

h2 {
  font-size: 1.125rem;
  margin: 0 0 0.75rem;
}
</style>
