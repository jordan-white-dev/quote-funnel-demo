<script setup lang="ts" generic="T extends string">
defineProps<{ value: T; icon?: string }>()
const model = defineModel<T[]>({ required: true })
</script>

<template>
  <label class="pill-checkbox" :class="{ selected: model.includes(value) }">
    <input type="checkbox" :value="value" v-model="model" />
    <span class="pill-checkbox-label">{{ value }}</span>
    <span v-if="icon" class="pill-checkbox-icon" aria-hidden="true">{{ icon }}</span>
  </label>
</template>

<style scoped>
.pill-checkbox {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
}

.pill-checkbox-icon {
  margin-left: auto;
}

.pill-checkbox.selected {
  border-color: var(--color-accent);
  background-color: var(--color-accent-soft);
}
</style>
