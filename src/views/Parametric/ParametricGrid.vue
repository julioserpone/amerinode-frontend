<template>
  <div>
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <breadcrumbs :trace-route="trace" />
      <div class="mt-2 flex flex-col">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="py-4">
            <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
              <div v-for="(action, actionIdx) in actions" :key="action.title" :class="[actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', actionIdx === 1 ? 'sm:rounded-tr-lg' : '', (actionIdx > 0 && actionIdx === actions.length && (actionIdx % 2 === 0)) ? 'sm:rounded-bl-lg' : '', (actionIdx >= actions.length - 1)  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '', 'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amerinode-blue-500']">
                <div>
                  <span class='bg-amerinode-blue-50 text-amerinode-blue-700 rounded-lg inline-flex p-3 ring-4 ring-white'>
                    <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div class="mt-5">
                  <h3 class="text-lg font-medium">
                    <a :href="action.href" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true" />
                      {{ action.title }}
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">{{ action.description }}</p>
                </div>
                <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import {
  GlobeIcon,
  OfficeBuildingIcon,
  ChipIcon,
  CubeIcon,
  SupportIcon,
  ViewListIcon,
} from '@heroicons/vue/outline'

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: true }
]

const actions = [
  {
    title: 'Countries',
    href: 'parametric/countries',
    icon: GlobeIcon,
    description: 'Administration of countries where the company is present'
  },
  {
    title: 'Companies',
    href: 'parametric/companies',
    icon: OfficeBuildingIcon,
    description: 'The companies to which Amerinode provides its services',
  },
  {
    title: 'Technologies',
    href: 'parametric/technologies',
    icon: ChipIcon,
    description: 'Technologies on which Amerinode offers its software or hardware services',
  },
  {
    title: 'OEM',
    href: 'parametric/oems',
    icon: CubeIcon,
    description: 'List of brands or OEMs to which we provide services',
  },
  {
    title: 'Service types',
    href: 'parametric/service-types',
    icon: SupportIcon,
    description: 'Types of services we provide',
  },
  {
    title: 'Project types',
    href: 'parametric/project-types',
    icon: SupportIcon,
    description: 'Types of projects we provide',
  },
  {
    title: 'Statuses',
    href: 'parametric/statuses',
    icon: ViewListIcon,
    description: 'All statuses available and categorized by modules',
  }
]
</script>
