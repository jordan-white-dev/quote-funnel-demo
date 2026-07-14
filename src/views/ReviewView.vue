<script setup lang="ts">
import { ref } from 'vue'
import BaseAccordion from '@/components/BaseAccordion.vue'
import FunnelPage from '@/components/FunnelPage.vue'
import PillRadio from '@/components/PillRadio.vue'
import { REPAIR_SUPPLIES_PRICE, STORE_ADDRESS, formatUSD, useFunnelStore } from '@/stores/funnel'

const store = useFunnelStore()

const PAYMENT_TIMING_OPTIONS = [
  'Pay now',
  'Pay in 4 installments',
  'Pay with insurance',
  'Pay at my appointment',
]

const paymentChoice = ref('')
const isSubmitted = ref(false)
</script>

<template>
  <main v-if="isSubmitted" class="success page-column">
    <h1>You're all set! ✅</h1>
    <p>We'll see you {{ store.serviceSchedule.slot }}.</p>
    <RouterLink class="home-link" :to="{ name: 'vehicle' }">Back to start</RouterLink>
  </main>

  <FunnelPage
    v-else
    title="Review, confirm and submit"
    subtitle="Almost done! To finish scheduling, please review your appointment details then choose how you want to pay."
    back-to-route="contact"
    :can-continue="paymentChoice !== ''"
    continue-button-label="Submit"
    @continue-requested="isSubmitted = true"
    full-width-continue
  >
    <hr />

    <BaseAccordion default-open>
      <template #summary>Appointment details</template>

      <div class="detail-block">
        <p class="detail-caption">
          {{
            store.serviceSchedule.serviceLocation === 'store'
              ? "You're coming to us"
              : "We'll come to you"
          }}
        </p>
        <p v-if="store.serviceSchedule.serviceLocation === 'store'" class="detail-line">
          {{ STORE_ADDRESS }} on {{ store.serviceSchedule.slot }}
        </p>
        <p v-else class="detail-line">
          Your location in ZIP {{ store.zipCode }} on {{ store.serviceSchedule.slot }}
        </p>
      </div>
      <hr />

      <div class="detail-block">
        <p class="detail-line">{{ store.damageSummary }}</p>
        <p class="detail-caption">for your {{ store.vehicleDisplayName }}</p>
      </div>
      <hr />

      <div class="detail-block">
        <p class="detail-caption">Contact details</p>
        <p class="detail-line">{{ store.contactInformation.email }}</p>
        <p class="detail-line">{{ store.contactInformation.phoneNumber }}</p>
      </div>
      <hr />

      <div class="detail-block">
        <p class="detail-caption">We'll text service updates to</p>
        <p class="detail-line">
          {{
            store.contactInformation.allowsTextUpdates
              ? store.contactInformation.phoneNumber
              : 'Not opted in'
          }}
        </p>
      </div>
    </BaseAccordion>

    <hr />

    <BaseAccordion default-open>
      <template #summary>Order details</template>

      <p class="line-item">
        <span>{{ store.selectedTierLabel }}</span>
        <span>{{ formatUSD(store.selectedTierPrice) }}</span>
      </p>
      <p class="line-item">
        <span>Repair supplies</span>
        <span>{{ formatUSD(REPAIR_SUPPLIES_PRICE) }}</span>
      </p>
      <hr />
      <p class="line-item">
        <span>Subtotal</span>
        <span>{{ formatUSD(store.subtotal) }}</span>
      </p>
      <p class="line-item">
        <span>Sales tax</span>
        <span>{{ formatUSD(store.salesTax) }}</span>
      </p>
      <p class="line-item line-item-total">
        <span>Total</span>
        <span>{{ formatUSD(store.total) }}</span>
      </p>
    </BaseAccordion>

    <div class="pill-stack">
      <PillRadio
        v-for="option in PAYMENT_TIMING_OPTIONS"
        :key="option"
        name="payment-timing"
        :value="option"
        v-model="paymentChoice"
      />
    </div>
  </FunnelPage>
</template>

<style scoped>
hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin-block: 1rem;
}

.detail-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-block + hr {
  margin-block: 0.75rem;
}

.detail-caption {
  margin: 0;
  font-size: 0.875rem;
  color: #555;
}

.detail-line {
  margin: 0;
  font-weight: 600;
}

.line-item {
  margin: 0 0 0.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.line-item-total {
  font-weight: 700;
}

.pill-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-block: 1.5rem;
}

.success {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.home-link {
  color: #0070d1;
}
</style>
