<script setup lang="ts" generic="T extends string">
defineProps<{ name: string; value: T; label?: string }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <label class="pill-radio" :class="{ selected: model === value }">
    <input class="visually-hidden" type="radio" :name="name" :value="value" v-model="model" />
    {{ label ?? value }}
  </label>
</template>

<style scoped>
.pill-radio {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
}

.pill-radio.selected {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
}

.pill-radio:focus-within {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
