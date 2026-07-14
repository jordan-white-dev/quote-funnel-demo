<script setup lang="ts">
defineProps<{ label: string; icon: string }>()
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="checkbox-card" :class="{ selected: model }">
    <span class="checkbox-card-icon" aria-hidden="true">{{ icon }}</span>
    <input type="checkbox" v-model="model" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;
}

.checkbox-card-icon {
  font-size: 2rem;
  line-height: 1;
}

.checkbox-card.selected {
  border-color: var(--color-accent);
  background-color: var(--color-accent-soft);
}
</style>
