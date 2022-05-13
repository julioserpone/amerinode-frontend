<template>
  <TransitionRoot as="template" :show="sidebarIsOpen">
    <Dialog as="div" class="relative z-40 md:hidden" @close="closeSideBar">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 flex z-40">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="closeSideBar">
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                  <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" />
      </div>
      <div class="mt-5 flex-1 flex flex-col">
        <nav class="flex-1 px-2 pb-4 space-y-1">
          <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
            <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
            {{ item.name }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XIcon } from '@heroicons/vue/outline'
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    navigation: {
      type: Object
    },
    sidebarIsOpen: {
      type: Boolean
    }
  })
  const emit = defineEmits(['sideBarOpen'])

  const closeSideBar = () => {
    console.log('cerrar sidebar')
    emit('sideBarOpen', false)
  }

/*export default {
  setup() {
    const navigation = [
      { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
      { name: 'Team', href: '#', icon: UsersIcon, current: false },
      { name: 'Projects', href: '#', icon: FolderIcon, current: false },
      { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
      { name: 'Documents', href: '#', icon: InboxIcon, current: false },
      { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
    ]
  return {
      sidebarOpen,
      navigation
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    XIcon,
    HomeIcon,
    UsersIcon,
    FolderIcon,
    CalendarIcon,
    InboxIcon,
    ChartBarIcon
  }
}*/
</script>
