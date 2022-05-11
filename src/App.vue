<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
  <!-- Notifications -->
  <NotificationGroup group="top">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              v-for="notification in notifications"
              :key="notification.id"
              class="w-full max-w-sm mt-4 overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="shrink-0">
                  <CheckCircleIcon class="h-6 w-6 text-green-500" aria-hidden="true" v-if="notification.type === 'success'" />
                  <InformationCircleIcon  class="h-6 w-6 text-blue-500" aria-hidden="true" v-if="notification.type === 'info'" />
                  <ExclamationIcon class="h-6 w-6 text-amber-400" aria-hidden="true" v-if="notification.type === 'warning'" />
                  <ExclamationCircleIcon  class="h-6 w-6 text-red-600" aria-hidden="true" v-if="notification.type === 'error'" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{ notification.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ notification.text }}
                  </p>
                </div>
                <div class="flex ml-4 shrink-0">
                  <button
                      class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                      @click="close(notification.id)"
                  >
                    <span class="sr-only">Close</span>
                    <XIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <NotificationGroup
      group="bottom"
      position="bottom"
  >
    <div class="fixed inset-x-0 bottom-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close }"
            enter="ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          >
            <div class="flex items-center justify-center w-12 bg-red-500">
              <ExclamationCircleIcon  class="h-6 w-6 text-white" aria-hidden="true" v-if="notification.type === 'error'" />
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-red-500">{{ notification.title }}</span>
                <p class="text-sm text-gray-600">
                  {{ notification.text }}
                </p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script>
import { CheckCircleIcon, InformationCircleIcon, ExclamationIcon, ExclamationCircleIcon, XIcon } from '@heroicons/vue/solid'

export default {
  name: 'App',
  data() {
    return {
      layout: 'div',
    };
  },
  components: {
    XIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationIcon,
    ExclamationCircleIcon
  }
};
</script>
