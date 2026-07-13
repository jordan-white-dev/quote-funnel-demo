<script setup lang="ts">
defineProps<{ label: string; options: string[]; disabled?: boolean }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="base-select">
    <span class="base-select-label">{{ label }}</span>
    <select v-model="model" :disabled="disabled">
      <option value="" disabled>Select one</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </label>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
  max-width: 24rem;
}

.base-select-label {
  font-size: 1rem;
  font-weight: 600;
}

.base-select select {
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #767676;
  border-radius: 0.375rem;
  background-color: #fff;
}

.base-select select:disabled {
  background-color: #f0f0f0;
  color: #9e9e9e;
  cursor: not-allowed;
}
</style>
