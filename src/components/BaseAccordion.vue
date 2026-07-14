<script setup lang="ts">
defineProps<{ defaultOpen?: boolean }>()
</script>

<template>
  <details class="base-accordion" :open="defaultOpen">
    <summary>
      <slot name="summary" />
      <span class="accordion-chevron" aria-hidden="true">▾</span>
    </summary>
    <div class="accordion-body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.base-accordion {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

summary {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
}

summary::-webkit-details-marker {
  display: none;
}

.accordion-chevron {
  margin-left: auto;
  transition: transform 0.15s ease;
}

details[open] .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-body {
  padding: 0 1.25rem 1rem;
}
</style>
