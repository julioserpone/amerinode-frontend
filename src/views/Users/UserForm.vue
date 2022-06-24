<template>
  <div>
    <div class="py-4 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
            <p class="mt-1 text-sm text-gray-600">Information needed to contact the user.</p>
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
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'names'"
                        :autocomplete="'names'"
                        v-model="user.name"
                        label="Name"
                        type="text"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <base-input
                        :id="'username'"
                        :autocomplete="'username'"
                        v-model="user.username"
                        label="Username"
                        type="text"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <base-input
                        :id="'email-address'"
                        :autocomplete="'email'"
                        v-model="user.email"
                        label="Email address"
                        type="text"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <base-input
                        :id="'mobile-phone'"
                        :autocomplete="'mobile-phone'"
                        v-model="user.mobile_phone"
                        label="Mobile Phone"
                        type="text"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <base-input
                        :id="'work-phone'"
                        :autocomplete="'work-phone'"
                        v-model="user.work_phone"
                        label="Work Phone"
                        type="text"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <Listbox as="div" v-model="selectedStatus" :disabled="!grantEditValues">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Status </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !grantEditValues ? 'disabled:opacity-75':'']">
                          <span class="block truncate">{{ selectedStatus.name }}</span>
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
                                v-for="status in statuses"
                                :key="status.id"
                                :value="status"
                                as="template"
                            >
                              <li :class="[active ? 'bg-amerinode-blue-100 text-amerinode-blue-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-10 pr-4']">
                                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ status.name }}</span>
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
              <div v-show="grantEditValues" class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
            <h3 class="text-lg font-medium leading-6 text-gray-900">Security</h3>
            <p class="mt-1 text-sm text-gray-600">Assignment of roles and access password.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div v-show="grantEditValues" class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <base-input
                        :id="'password'"
                        :autocomplete="'password'"
                        v-model="user.password"
                        label="Password"
                        type="password"
                        :is-disabled="!grantEditValues"
                    />
                  </div>

                  <div v-show="grantEditValues" class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <base-input
                        :id="'password-confirmation '"
                        :autocomplete="'password-confirmation '"
                        v-model="user.password_confirmation "
                        label="Password confirmation"
                        type="password"
                        :is-disabled="!grantEditValues"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <Listbox as="div" v-model="selectedRole" :disabled="!grantEditValues">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Assigned role </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !grantEditValues ? 'disabled:opacity-75':'']">
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
              <div v-show="grantEditValues" class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" @click="(event) => sendData(event)" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amerinode-blue-600 hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, defineProps, defineEmits, onBeforeMount, toRefs} from "vue";
import roleService from "../../services/role.service.js"
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
let selectedRole = ref({})
let selectedStatus = ref({})
const statuses = ref([
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' }
])

onBeforeMount( () => {

  roleService.list().then(x => {
    roles.value = x.data
    if (data.assignList.value) {
      //Assign the same type of object to the list (for the cases in which it is an already registered user)
      for (const [index, item] of Object.entries(roles.value)) {
        if (item.id === data.user.value.roles[0].id) {
          selectedRole.value = roles.value[index]
        }
      }
      //Assign status
      statuses.value.forEach((element, index) => {
        if (element.id === data.user.value.status) {
          selectedStatus.value = element
        }
      })
    } else {
      selectedRole.value = roles.value[0]
      selectedStatus.value = statuses.value[0]
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
  grantEditValues: {
    type: Boolean,
    default: true
  },
  assignList: {
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
  emit('save', { user: data.user.value, role: selectedRole.value, status: selectedStatus.value } )
}
</script>