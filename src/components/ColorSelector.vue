<template>
  <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
  <ColorPicker
      v-bind="$attrs"
      :color="modelValue"
      @color-change="updateColor"
  >
    <template #hue-range-input-label>
      <span class="sr-only">Hue</span>
    </template>

    <template #alpha-range-input-label>
      <span class="sr-only">Alpha</span>
    </template>

    <template #copy-button>
      <span class="sr-only">Copy color</span>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
        <path d="M5 0v2H1v13h12v-3h-1v2H2V5h10v3h1V2H9V0zm1 1h2v2h3v1H3V3h3z" fill="currentColor"/>
        <path d="M10 7v2h5v2h-5v2l-3-3zM3 6h5v1H3zm0 2h3v1H3zm0 2h3v1H3zm0 2h5v1H3z" fill="currentColor"/>
      </svg>
    </template>

    <template #format-switch-button>
      <span class="sr-only">Switch format</span>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15">
        <path d="M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z" fill="currentColor"/>
      </svg>
    </template>
  </ColorPicker>
</template>

<script setup>
import { ColorPicker } from 'vue-accessible-color-picker'
import { defineEmits } from "vue";

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['saveColor'])

function updateColor (eventData) {
  emit('saveColor', { selectedColor: eventData.cssColor } )
}
</script>
