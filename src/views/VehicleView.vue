<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'
import BaseSelect from '@/components/BaseSelect.vue'
import { listMakes, listModels, listStyles, listYears } from '@/data/vehicles'
import { computed } from 'vue'

const router = useRouter()
const store = useFunnelStore()

const yearOptions = listYears()
const makeOptions = computed(() => listMakes(store.vehicle.year))
const modelOptions = computed(() => listModels(store.vehicle.year, store.vehicle.make))
const styleOptions = computed(() =>
  listStyles(store.vehicle.year, store.vehicle.make, store.vehicle.model),
)
</script>

<template>
  <FunnelPage
    title="Tell us about your vehicle"
    subtitle="Find your vehicle by entering the year, make, model and style."
    back-to-route="landing"
    :can-continue="store.isVehicleComplete"
    @continue-requested="router.push({ name: 'damage' })"
  >
    <BaseSelect
      label="Year"
      :options="yearOptions"
      :model-value="store.vehicle.year"
      @update:model-value="store.selectYear"
    />
    <BaseSelect
      label="Make"
      :options="makeOptions"
      :model-value="store.vehicle.make"
      @update:model-value="store.selectMake"
      :disabled="store.vehicle.year === ''"
    />
    <BaseSelect
      label="Model"
      :options="modelOptions"
      :model-value="store.vehicle.model"
      @update:model-value="store.selectModel"
      :disabled="store.vehicle.make === ''"
    />
    <BaseSelect
      label="Style"
      :options="styleOptions"
      v-model="store.vehicle.style"
      :disabled="store.vehicle.model === ''"
    />
  </FunnelPage>
</template>
