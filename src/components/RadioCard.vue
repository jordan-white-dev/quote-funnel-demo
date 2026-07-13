<script setup lang="ts" generic="T extends string">
defineProps<{ name: string; value: T }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <label class="radio-card" :class="{ selected: model === value }">
    <input class="visually-hidden" type="radio" :name="name" :value="value" v-model="model" />
    <slot />
  </label>
</template>

<style scoped>
.radio-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  padding: 1.25rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;
}

.radio-card.selected {
  border-color: var(--color-accent);
  background-color: var(--color-accent-soft);
}

.radio-card:focus-within {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
