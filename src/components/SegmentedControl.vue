<script setup lang="ts" generic="T extends string | number">
defineProps<{ name: string; options: Array<{ label: string; value: T }> }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="segmented-control">
    <label
      v-for="option in options"
      :key="option.value"
      class="segment"
      :class="{ selected: model === option.value }"
    >
      <input
        class="visually-hidden"
        type="radio"
        :name="name"
        :value="option.value"
        v-model="model"
      />
      {{ option.value }}
    </label>
  </div>
</template>

<style scoped>
.segmented-control {
  display: flex;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.segment {
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
}

.segment + .segment {
  border-left: 1px solid var(--color-border);
}

.segment.selected {
  background-color: var(--color-accent);
  color: #fff;
  font-weight: 600;
}

.segmented-control:focus-within {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
