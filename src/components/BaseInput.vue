<script setup lang="ts">
import { useId } from 'vue'

defineOptions({ inheritAttrs: false })
defineProps<{ label: string }>()
const model = defineModel<string>({ required: true })
const inputId = useId()
</script>

<template>
  <div class="base-input">
    <label :for="inputId">{{ label }}</label>
    <input :id="inputId" v-bind="$attrs" v-model="model" />
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: #fff;
  font: inherit;
}

input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

input::placeholder {
  color: #767676;
}
</style>
