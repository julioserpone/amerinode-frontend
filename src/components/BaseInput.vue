<template>
  <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
  <input
      v-bind="$attrs"
      v-bind:disabled="isDisabled"
      :id="id"
      :name="id"
      :autocomplete="autocomplete"
      :placeholder="label"
      :required="isRequired"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :class="[ isDisabled ? 'disabled:opacity-75':'']"
  />
</template>
<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  })
</script>
