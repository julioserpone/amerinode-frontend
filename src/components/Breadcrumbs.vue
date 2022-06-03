<template>
  <div>
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <a @click="back" href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          Back
        </a>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <!--<li>
            <div class="flex">
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-700">Jobs</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Engineering</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Back End Developer</a>
            </div>
          </li>-->
          <li v-for="(item, index) in traceRoute">
            <div v-if="index === 0" class="flex">
              <router-link :to="{ name: item.pathName }" class="text-sm font-medium text-gray-500 hover:text-gray-700">{{ item.description }}</router-link>
            </div>
            <div v-else class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ item.description }}</a>
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
      pathName: 'HomePage'
    }]
  }
});

function back() {
  router.go(-1)
}
</script>