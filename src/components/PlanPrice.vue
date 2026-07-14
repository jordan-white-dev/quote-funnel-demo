<script setup lang="ts">
import { computed } from 'vue'
import { formatUSD, type PaymentMethod } from '@/stores/funnel'

const props = defineProps<{ paymentMethod: PaymentMethod; price: number; wasPrice?: number }>()

const installmentDisplay = computed(() => formatUSD(props.price / 4))
const insuranceDisplay = computed(() => formatUSD(props.price / 2))
</script>

<template>
  <p v-if="paymentMethod === 'own'" class="price-own">
    <span class="price-installment">
      <span class="price-amount">{{ installmentDisplay }}</span> in 4 interest-free payments
    </span>
    <span class="price-single"
      >or {{ formatUSD(price) }} <s v-if="wasPrice">{{ formatUSD(wasPrice) }}</s> in single
      payment</span
    >
  </p>
  <p v-else class="price-insurance">As little as {{ insuranceDisplay }}</p>
</template>

<style scoped>
.price-own {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.price-installment {
  font-size: 1rem;
  color: #555;
  font-weight: 600;
  line-height: 1.2;
}

.price-amount {
  color: var(--color-success);
  font-size: 1.375rem;
}

.price-single {
  font-size: 0.875rem;
  color: #555;
}

.price-single s {
  color: #767676;
}

.price-insurance {
  margin: 0;
  color: var(--color-success);
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
