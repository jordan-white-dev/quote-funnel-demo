<script setup lang="ts">
import FunnelPage from '@/components/FunnelPage.vue'
import { useRouter } from 'vue-router'
import { SIDE_WINDOWS, useFunnelStore, type ChipCount } from '@/stores/funnel'
import CheckboxCard from '@/components/CheckboxCard.vue'
import RadioCard from '@/components/RadioCard.vue'
import SegmentedControl from '@/components/SegmentedControl.vue'
import PillCheckbox from '@/components/PillCheckbox.vue'

const router = useRouter()
const store = useFunnelStore()

const SIDES = ['driver', 'passenger'] as const
const CHIP_OPTIONS: Array<{ label: string; value: ChipCount }> = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
]
</script>

<template>
  <FunnelPage
    title="What do you need fixed?"
    back-to-route="vehicle"
    :can-continue="store.isDamageSelectionComplete"
    @continue-requested="router.push({ name: 'zip' })"
  >
    <div class="card-row">
      <CheckboxCard
        label="Windshield"
        icon="🚘"
        :model-value="store.damageState.windshield.isChecked"
        @update:model-value="store.setWindshieldChecked"
      />
      <CheckboxCard
        label="Side window"
        icon="🚙"
        :model-value="store.damageState.sideWindow.isChecked"
        @update:model-value="store.setSideWindowChecked"
      />
      <CheckboxCard
        label="Rear window"
        icon="🪟"
        v-model="store.damageState.rearWindow.isChecked"
      />
    </div>

    <section v-if="store.damageState.windshield.isChecked">
      <h2>What's your windshield damage?</h2>
      <div class="windshield-damage-row">
        <RadioCard
          name="windshield-action"
          value="replace"
          :model-value="store.damageState.windshield.repairAction"
          @update:model-value="store.setWindshieldRepairAction"
        >
          <span class="radio-card-icon" aria-hidden="true">💥</span>
          <p>My damage is larger than six inches.</p>
          <p class="radio-card-action">Replace my windshield</p>
        </RadioCard>

        <RadioCard
          name="windshield-action"
          value="repair"
          :model-value="store.damageState.windshield.repairAction"
          @update:model-value="store.setWindshieldRepairAction"
        >
          <span class="radio-card-icon" aria-hidden="true">✨</span>
          <p>I have three or fewer chips or cracks smaller than six inches.</p>
          <p class="radio-card-action">Repair my windshield</p>
        </RadioCard>
      </div>
    </section>

    <section v-if="store.damageState.windshield.repairAction === 'repair'">
      <h2>How many chips are we repairing?</h2>
      <SegmentedControl
        name="chip-count"
        :options="CHIP_OPTIONS"
        v-model="store.damageState.windshield.chipCount"
      ></SegmentedControl>
    </section>

    <section v-if="store.damageState.sideWindow.isChecked">
      <h2>Which side is your damage on?</h2>
      <div class="side-damage-row">
        <CheckboxCard
          label="Driver side"
          icon="🚶"
          :model-value="store.damageState.sideWindow.driver.isChecked"
          @update:model-value="(value: boolean) => store.setSideChecked('driver', value)"
        />
        <CheckboxCard
          label="Passenger side"
          icon="🚶‍➡️"
          :model-value="store.damageState.sideWindow.passenger.isChecked"
          @update:model-value="(value: boolean) => store.setSideChecked('passenger', value)"
        />
      </div>
    </section>

    <template v-for="side in SIDES" :key="side">
      <section v-if="store.damageState.sideWindow[side].isChecked">
        <h2>Which {{ side }} side window needs fixed?</h2>
        <div class="pill-stack">
          <PillCheckbox
            v-for="sideWindow in SIDE_WINDOWS"
            :key="sideWindow"
            :value="sideWindow"
            v-model="store.damageState.sideWindow[side].windows"
          />
        </div>
      </section>
    </template>
  </FunnelPage>
</template>

<style scoped>
.card-row {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.pill-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.windshield-damage-row,
.side-damage-row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

section {
  margin-block: 1.5rem;
}

h2 {
  font-size: 1.125rem;
  margin: 0 0 0.75rem;
}

.radio-card-icon {
  font-size: 2rem;
  line-height: 1;
}

.radio-card-action {
  font-weight: 600;
}

p {
  margin: 0;
}
</style>
