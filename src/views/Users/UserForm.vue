<template>
  <div>
    <div class="py-4 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
            <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'title'"
                        :autocomplete="'title'"
                        v-model="user.title"
                        label="Title"
                        type="text"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'names'"
                        :autocomplete="'names'"
                        v-model="user.name"
                        label="Name"
                        type="text"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" id="username" v-model="user.username" autocomplete="username" class="mt-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="text" name="email-address" id="email-address" v-model="user.email" autocomplete="email" class="mt-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label for="mobile-phone" class="block text-sm font-medium text-gray-700">Mobile Phone</label>
                    <input type="text" name="mobile-phone" id="mobile-phone" v-model="user.mobile_phone" autocomplete="mobile-phone" class="mt-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label for="work-phone" class="block text-sm font-medium text-gray-700">Work Phone</label>
                    <input type="text" name="work-phone" id="work-phone" v-model="user.work_phone" autocomplete="work-phone" class="mt-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" @click="(event) => sendData(event)" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amerinode-blue-600 hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Roles</h3>
            <p class="mt-1 text-sm text-gray-600">Assignment of the role that the user has.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <Listbox as="div" v-model="selectedRole">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Assigned role </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm">
                          <span class="block truncate">{{ selectedRole.name }}</span>
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>
                        <transition
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                          <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption
                                v-slot="{ active, selected }"
                                v-for="role in roles"
                                :key="role.id"
                                :value="role"
                                as="template"
                            >
                              <li :class="[active ? 'bg-amerinode-blue-100 text-amerinode-blue-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-10 pr-4']">
                                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ role.name }}</span>
                                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amerinode-blue-600">
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" @click="(event) => sendData(event)" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amerinode-blue-600 hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--<div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
            <p class="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <fieldset>
                  <legend class="sr-only">By Email</legend>
                  <div class="text-base font-medium text-gray-900" aria-hidden="true">By Email</div>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Comments</label>
                        <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="candidates" name="candidates" type="checkbox" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                        <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="offers" name="offers" type="checkbox" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="offers" class="font-medium text-gray-700">Offers</label>
                        <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend class="contents text-base font-medium text-gray-900">Push Notifications</legend>
                  <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300" />
                      <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700"> Everything </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300" />
                      <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700"> Same as email </label>
                    </div>
                    <div class="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" class="focus:ring-amerinode-blue-500 h-4 w-4 text-amerinode-blue-600 border-gray-300" />
                      <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700"> No push notifications </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amerinode-blue-600 hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script setup>
import {ref, defineProps, defineEmits, onBeforeMount, toRefs} from "vue";
import roleService from "../../services/rol.service.js"
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import BaseInput from '../../components/BaseInput.vue'

let roles = ref()
let selectedRole = ref({ })

onBeforeMount( () => {

  roleService.list().then(x => {
    roles.value = x.data
    if (data.editable.value) {
      //Assign the same type of object to the list (for the cases in which it is an already registered user)
      for (const [index, item] of Object.entries(roles.value)) {
        if (item.id === data.user.value.roles[0].id) {
          selectedRole.value = roles.value[index]
        }
      }
    } else {
      selectedRole.value = roles.value[0]
    }
    emit('isLoading', false)
  }).catch(err => {

  }).finally(() => {

  })
})

const props = defineProps({
  user: {
    type: Object
  },
  editable: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['save', 'isLoading'])
const data = toRefs(props)

const sendData = (event) => {
  event.preventDefault()
  emit('save', { user: data.user.value, role: selectedRole.value} )
}
</script>