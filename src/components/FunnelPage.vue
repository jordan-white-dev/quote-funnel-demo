<script setup lang="ts">
type Props = {
  title: string
  subtitle?: string
  backToRoute?: string
  canContinue: boolean
  continueButtonLabel?: string
  fullWidthContinue?: boolean
  centeredHeader?: boolean
}

withDefaults(defineProps<Props>(), { continueButtonLabel: 'Continue' })

const emit = defineEmits<{ continueRequested: [] }>()
</script>

<template>
  <main class="page-column">
    <slot name="banner" />
    <h1 class="page-title" :class="{ centered: centeredHeader }">{{ title }}</h1>
    <p v-if="subtitle" :class="{ centered: centeredHeader }">{{ subtitle }}</p>
    <slot />
    <div class="buttons-footer" :class="{ 'buttons-footer--stacked': fullWidthContinue }">
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
.centered {
  text-align: center;
}

.page-title {
  font-size: 1.375rem;
}

.buttons-footer {
  display: flex;
  align-items: center;
  margin-block-start: 2rem;
}

.buttons-footer--stacked {
  flex-direction: column-reverse;
  align-items: stretch;
  gap: 1rem;
}

.buttons-footer--stacked .back-link {
  align-self: flex-start;
}

.buttons-footer--stacked .continue-button {
  margin-left: 0;
}

.back-link {
  color: #0070d1;
  font-weight: 600;
  text-decoration: none;
}

.continue-button {
  margin-left: auto;
  padding: 0.75rem 2rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.continue-button:not(:disabled):hover {
  background: var(--color-accent-strong);
}

.continue-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.continue-button:disabled {
  background: #f0f0f0;
  border-color: var(--color-border);
  color: #9e9e9e;
  cursor: not-allowed;
}
</style>
