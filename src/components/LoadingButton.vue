<script setup>
  defineProps({
    isLoading: {
      type: Boolean,
      default: false
    },
    typeButton: {
      type: String,
      default: "submit"
    },
    backgroundColor: {
      type: String,
      default: "bg-blue-600"
    },
    focusColor: {
      type: String,
      default: "ring-blue-500"
    }
  });
</script>

<template>
  <button :type="typeButton" class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90 relative"
    :class="[ backgroundColor, 'focus:'+focusColor, isLoading ? 'disabled:opacity-75':'']" :disabled="isLoading"
  >
    <svg v-show="isLoading" class="w-5 h-5 mr-2 text-white animate-spin" fill="none"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"></path>
    </svg>
    <span>
      <slot class="relative"></slot>
    </span>
  </button>
</template>
