<template>
  <div>
    <div class="ml-1 mt-4">
      <nav class="sm:hidden" aria-label="Back">
        <a @click="goBack" href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          Back
        </a>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li v-for="(item, index) in traceRoute">
            <div v-if="index === 0" class="flex">
              <router-link :to="{ name: item.pathName }" class="text-sm font-medium text-gray-500 hover:text-gray-700">{{ item.description }}</router-link>
            </div>
            <div v-else class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <router-link v-if="item.isLink" :to="{ name: item.pathName }" :aria-current="item.current ? 'page' : undefined" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ item.description }}</router-link>
              <span v-else class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ item.description }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>
<script setup>
import router from "@/routes";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

defineProps({
  traceRoute: {
    type: Array,
    default: [{
      description: 'Home',
      pathName: 'HomePage',
      current: true
    }]
  }
});

function goBack() {
  router.go(-1)
}
</script>