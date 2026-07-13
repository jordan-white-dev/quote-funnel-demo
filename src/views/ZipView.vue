<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import FunnelPage from '@/components/FunnelPage.vue'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()

const sendPhase = ref<'form' | 'sending' | 'sent'>('form')
let sendTimerId: ReturnType<typeof setTimeout> | undefined

function handleSend() {
  sendPhase.value = 'sending'
  sendTimerId = setTimeout(() => {
    sendPhase.value = 'sent'
  }, 600)
}

onBeforeUnmount(() => clearTimeout(sendTimerId))
</script>

<template>
  <FunnelPage
    :title="store.vehicleDisplayName"
    back-to-route="damage"
    :can-continue="store.isZipCodeValid"
    @continue-requested="router.push({ name: 'plan' })"
  >
    <BaseInput
      class="zip-code-input"
      label="Service ZIP"
      inputmode="numeric"
      autocomplete="postal-code"
      v-model="store.zipCode"
    />

    <section v-if="store.isZipCodeValid" class="email-capture">
      <span class="email-icon" aria-hidden="true">🏷️</span>
      <h2>Your quote is almost ready!</h2>
      <p class="email-subtitle">Where should we send it?</p>

      <BaseInput
        label="Enter your email address"
        type="email"
        autocomplete="email"
        v-model="store.quoteEmail"
      />

      <template v-if="sendPhase !== 'sent'">
        <button
          class="send-button"
          type="button"
          :disabled="!store.isQuoteEmailPlausible || sendPhase === 'sending'"
          @click="handleSend"
        >
          {{ sendPhase === 'sending' ? 'Sending...' : 'Send' }}
        </button>
        <p class="email-legal">By selecting Send you agree to placeholder terms.</p>
      </template>

      <p v-else class="email-confirmation" role="status">
        ✅ Got it! We'll continue to save your progress as you go.
      </p>
    </section>
  </FunnelPage>
</template>

<style scoped>
:deep(.zip-code-input) {
  max-width: 12rem;
}

.email-capture {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 26rem;
  margin-block: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}

.email-icon {
  font-size: 2rem;
  line-height: 1;
}

h2 {
  margin: 0;
  font-size: 1.125rem;
}

.email-subtitle {
  margin: 0;
  color: #555;
}

.send-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: 1.5px solid var(--color-accent);
  border-radius: 999px;
  background: #fff;
  color: var(--color-accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.send-button:not(:disabled):hover {
  background: var(--color-accent-soft);
}

.send-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.send-button:disabled {
  border-color: var(--color-border);
  color: #767676;
  cursor: not-allowed;
}

.email-legal {
  margin: 0;
  font-size: 0.75rem;
  color: #767676;
}

.email-confirmation {
  margin: 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-success);
  border-radius: 0.5rem;
  background: var(--color-success-soft);
}
</style>
