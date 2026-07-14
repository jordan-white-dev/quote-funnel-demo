<script setup lang="ts">
import { useRouter } from 'vue-router'
import FunnelPage from '@/components/FunnelPage.vue'
import PlanPrice from '@/components/PlanPrice.vue'
import RadioCard from '@/components/RadioCard.vue'
import SegmentedControl from '@/components/SegmentedControl.vue'
import { PLANS } from '@/data/plans'
import { useFunnelStore, type PaymentMethod } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()

const PAYMENT_OPTIONS: Array<{ label: string; value: PaymentMethod }> = [
  { label: 'Pay on my own', value: 'own' },
  { label: 'Pay with insurance', value: 'insurance' },
]
</script>

<template>
  <FunnelPage
    :title="`We've got your ${store.vehicleDisplayName} covered!`"
    subtitle="Now choose your payment and service options.*"
    back-to-route="zip"
    :can-continue="store.isPlanComplete"
    @continue-requested="router.push({ name: 'schedule' })"
  >
    <div class="payment-method">
      <SegmentedControl
        name="payment-method"
        :options="PAYMENT_OPTIONS"
        v-model="store.plan.paymentMethod"
      />
    </div>

    <div class="plan-row">
      <RadioCard
        v-for="planDefinition in PLANS"
        :key="planDefinition.id"
        name="plan-tier"
        :value="planDefinition.id"
        v-model="store.plan.planTier"
      >
        <p class="plan-label">{{ planDefinition.label }}</p>
        <ul class="plan-bullets">
          <li v-for="bullet in planDefinition.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <p v-if="planDefinition.special" class="plan-special">{{ planDefinition.special }}</p>
        <p v-if="planDefinition.disclaimer" class="plan-disclaimer">
          {{ planDefinition.disclaimer }}
        </p>
        <PlanPrice
          class="plan-price"
          :payment-method="store.plan.paymentMethod"
          :price="planDefinition.price"
          :was-price="planDefinition.wasPrice"
        />
      </RadioCard>
    </div>

    <div class="pay-later-strip">
      <p class="pay-later-headline">Fix now.<br />Pay later.</p>
      <p class="pay-later-copy">
        Choose flexible, interest-free payment options to fit your budget and timeline.
        <span class="learn-more">Learn more</span>
      </p>
    </div>

    <p class="quote-disclaimer">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
  </FunnelPage>
</template>

<style scoped>
.payment-method {
  max-width: 26rem;
  margin-block: 1.5rem;
}

.plan-row {
  --plan-row-width: min(60rem, 100vw - 3rem);
  display: flex;
  gap: 1rem;
  align-items: stretch;
  margin-block: 1.5rem;
  width: var(--plan-row-width);
  margin-inline: calc((100% - var(--plan-row-width)) / 2);
}

@media (max-width: 45rem) {
  .plan-row {
    --plan-row-width: 100%;
    flex-direction: column;
  }

  .plan-row .radio-card {
    flex: none;
  }
}

.plan-row .radio-card {
  align-items: stretch;
  text-align: left;
}

.plan-label {
  font-size: 1.125rem;
  font-weight: 700;
}

.plan-bullets {
  margin: 0;
  padding-inline-start: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.875rem;
}

.plan-special {
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  background: var(--color-success-soft);
  color: var(--color-success);
  font-size: 0.8125rem;
  font-weight: 600;
}

.plan-disclaimer {
  color: #b91c1c;
  font-size: 0.75rem;
}

.plan-price {
  margin-top: auto;
  padding-top: 0.75rem;
}

.pay-later-strip {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-block: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background: #eef6fc;
}

.pay-later-headline {
  margin: 0;
  font-weight: 700;
  line-height: 1.25;
}

.pay-later-copy {
  margin: 0;
  padding-inline-start: 1.25rem;
  border-inline-start: 1px solid #b9d7ee;
  font-size: 0.875rem;
}

.learn-more {
  color: #0070d1;
  font-weight: 600;
}

.quote-disclaimer {
  font-size: 0.75rem;
  color: #767676;
}
</style>
