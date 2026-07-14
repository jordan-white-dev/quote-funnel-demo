<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import FunnelPage from '@/components/FunnelPage.vue'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const store = useFunnelStore()
</script>

<template>
  <FunnelPage
    title="How can we reach you?"
    subtitle="We'll send you an appointment confirmation and follow-up details."
    back-to-route="schedule"
    :can-continue="store.isContactInformationComplete"
    @continue-requested="router.push({ name: 'review' })"
  >
    <div class="contact-fields">
      <BaseInput
        label="First name"
        autocomplete="given-name"
        v-model="store.contactInformation.firstName"
      />
      <BaseInput
        label="Last name"
        autocomplete="family-name"
        v-model="store.contactInformation.lastName"
      />
      <BaseInput
        label="Email address"
        type="email"
        autocomplete="email"
        v-model="store.contactInformation.email"
      />
      <BaseInput
        label="Phone number"
        type="tel"
        autocomplete="tel"
        v-model="store.contactInformation.phoneNumber"
      />
    </div>

    <label class="text-updates">
      <input type="checkbox" v-model="store.contactInformation.allowsTextUpdates" />
      Text me updates about my appointment*
    </label>

    <p class="contact-disclaimer">
      *Placeholder: by selecting text updates you consent to demo messages about your vehicle.
      Consent not required.
    </p>
  </FunnelPage>
</template>

<style scoped>
.contact-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 1.5rem;
}

.text-updates {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.contact-disclaimer {
  margin-block-start: 1rem;
  font-size: 0.75rem;
  color: #767676;
}
</style>
