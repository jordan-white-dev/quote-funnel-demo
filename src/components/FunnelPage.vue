<script setup lang="ts">
type Props = {
  title: string
  subtitle?: string
  backToRoute?: string
  canContinue: boolean
  continueButtonLabel?: string
}

withDefaults(defineProps<Props>(), { continueButtonLabel: 'Continue' })

const emit = defineEmits<{ continueRequested: [] }>()
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
    <slot />
    <div class="buttons-footer">
      <RouterLink class="back-link" v-if="backToRoute" :to="{ name: backToRoute }">Back</RouterLink>
      <button
        class="continue-button"
        type="button"
        :disabled="!canContinue"
        @click="emit('continueRequested')"
      >
        {{ continueButtonLabel }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.buttons-footer {
  display: flex;
  align-items: center;
}
.back-link {
  color: #0070d1;
}
.continue-button {
  margin-left: auto;
}
</style>
