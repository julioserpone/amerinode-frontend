<template>
  <div>
    <div class="py-4 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Information</h3>
            <p class="mt-1 text-sm text-gray-600">Descriptive information of the country.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">

                  <div v-show="newRegister" class="col-span-6 sm:col-span-5">
                    <Combobox as="div" v-model="selectedCountry">
                      <ComboboxLabel class="block text-sm font-medium text-gray-700">Select a country</ComboboxLabel>
                      <div class="relative mt-1">
                        <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-amerinode-blue-500 focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 sm:text-sm" @change="query = $event.target.value" :display-value="(country) => country?.name" />
                        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </ComboboxButton>

                        <ComboboxOptions v-if="filteredCountry.length > 0" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <ComboboxOption v-for="country in filteredCountry" :key="country.id" :value="country" as="template" v-slot="{ active, selected }">
                            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-amerinode-blue-600 text-white' : 'text-gray-900']">
                              <div class="flex items-center">
                                <img :src="country.flag_url" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                                <span :class="['ml-3 truncate', selected && 'font-semibold']">
                                  {{ country.name }}
                                </span>
                              </div>

                              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-amerinode-blue-600']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ComboboxOption>
                        </ComboboxOptions>
                      </div>
                    </Combobox>
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'name-country'"
                        :autocomplete="'name-country'"
                        v-model="country.name"
                        label="Name"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'capital'"
                        :autocomplete="'capital'"
                        v-model="country.capital"
                        label="Capital"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'code_iso'"
                        :autocomplete="'code_iso'"
                        v-model="country.code_iso"
                        label="ISO 3166-1 alpha-2"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'code_iso3'"
                        :autocomplete="'code_iso3'"
                        v-model="country.code_iso3"
                        label="ISO 3166-1 alpha-3"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'currency'"
                        :autocomplete="'currency'"
                        v-model="country.currency"
                        label="Currency"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div v-show="!newRegister" class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'calling_code'"
                        :autocomplete="'calling_code'"
                        v-model="country.calling_code"
                        label="Calling code"
                        type="text"
                        :is-disabled="true"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <Listbox as="div" v-model="selectedStatus" :disabled="!canEdit">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Status </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !canEdit ? 'disabled:opacity-75':'']">
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
              <div v-show="canEdit" class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
import {ref, computed, defineProps, defineEmits, toRefs, onUpdated, onBeforeMount } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import BaseInput from '@/components/BaseInput.vue'
import countryService from "@/services/country.service";

const statuses = ref([
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' }
])
let countries = []
let selectedStatus = ref({})
let selectedCountry = ref({
  "name": "",
  "capital": "",
  "code_iso": "",
  "code_iso3": "",
  "currency": "",
  "calling_code": "",
  "flag_url": "",
  "timezones": []
})
let query = ref('')
let loaded = ref(false)

let filteredCountry = computed(() =>
    query.value === ''
        ? countries
        : countries.filter((country) =>
            country.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

onBeforeMount(() => {
  if (data.newRegister.value) {
    countryService.available().then(x => {
      countries = x.data
      selectedCountry.value = countries[0]
      emit('isLoading', false)

    }).catch(err => {
    }).finally(() => {

      if (!data.modeEdit.value) {
        assignStatus()
        emit('isLoading', false)
      }
    })
  }
})
onUpdated( () => {
  if (data.modeEdit.value) {
    if (!loaded.value) {
      assignStatus()
      emit('isLoading', false)
      loaded.value = true
    }
  }
})

const props = defineProps({
  country: {
    type: Object
  },
  canEdit: {
    type: Boolean,
    default: true
  },
  assignList: {
    type: Boolean,
    default: false
  },
  countryId: {
    type: String,
    default: ''
  },
  modeEdit: {
    type: Boolean,
    default: true
  },
  newRegister: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'isLoading'])
const data = toRefs(props)

function assignStatus() {
  if (data.assignList.value) {
    //Assign status
    statuses.value.forEach((element, index) => {
      if (element.id === data.country.value.status) {
        selectedStatus.value = element
      }
    })
  } else {
    selectedStatus.value = statuses.value[0]
  }
}
const sendData = (event) => {
  event.preventDefault()
  emit('save', { country: selectedCountry.value, status: selectedStatus.value } )
}
</script>
