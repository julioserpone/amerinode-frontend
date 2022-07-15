<template>
  <div>
    <div class="py-4 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Information</h3>
            <p class="mt-1 text-sm text-gray-600">Basic project information.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">

                  <div class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'name'"
                        :autocomplete="'name-project'"
                        v-model="project.name"
                        label="Name"
                        type="text"
                        :is-disabled="!canEdit"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <base-input
                        :id="'description'"
                        :autocomplete="'description'"
                        v-model="project.description"
                        label="Description"
                        type="text"
                        :is-disabled="!canEdit"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <Listbox as="div" v-model="selectedProjectType" :disabled="!canEdit">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Project type </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !canEdit ? 'disabled:opacity-75':'']">
                          <span class="block truncate">{{ selectedProjectType.description }}</span>
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
                                v-for="project_type in projectTypes"
                                :key="project_type.id"
                                :value="project_type"
                                as="template"
                            >
                              <li :class="[active ? 'bg-amerinode-blue-100 text-amerinode-blue-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-10 pr-4']">
                                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ project_type.description }}</span>
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

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Branch</h3>
            <p class="mt-1 text-sm text-gray-600">Configuration of the branch where the project is located.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">

                  <div class="col-span-6 sm:col-span-5 lg:col-span-3">
                    <Listbox as="div" v-model="selectedCountry" :disabled="!canEdit">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Country </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !canEdit ? 'disabled:opacity-75':'']">
                          <span class="block truncate">{{ selectedCountry.name }}</span>
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
                                v-for="country in countries"
                                :key="country.id"
                                :value="country"
                                as="template"
                                @click="changeCompany(country.id)"
                            >
                              <li :class="[active ? 'bg-amerinode-blue-100 text-amerinode-blue-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-4 pr-4']">
                                <div class="flex items-center">
                                  <img :src="country.flag_url" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                                  <span :class="['ml-3 truncate', selected && 'font-semibold']">{{ country.name }}</span>
                                </div>
                                <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4 text-amerinode-blue-600">
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>

                  <div class="col-span-6 sm:col-span-5 lg:col-span-3">
                    <Listbox as="div" v-model="selectedCompany" :disabled="!canEdit || isLoadingCompany">
                      <ListboxLabel class="block text-sm font-medium text-gray-700"> Company </ListboxLabel>
                      <div class="relative mt-1">
                        <ListboxButton class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-amerinode-blue-500 focus:border-amerinode-blue-500 sm:text-sm"
                                       :class="[ !canEdit || isLoadingCompany ? 'disabled:opacity-75':'']">
                          <div v-if="isLoadingCompany">

                            <div class="flex items-center">
                              <div>
                                <svg role="status" class="mr-2 w-5 h-5 text-blue-200 animate-spin dark:text-blue-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                </svg>
                              </div>
                              <div class="ml-1">
                                <p class="text-sm text-gray-600">Getting available companies...</p>
                              </div>
                            </div>

                          </div>
                          <div v-else>
                            <span class="block truncate">{{ selectedCompany.description }}</span>
                          </div>
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
                                v-for="company in companies"
                                :key="company.id"
                                :value="company"
                                as="template"
                            >
                              <li :class="[active ? 'bg-amerinode-blue-100 text-amerinode-blue-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-10 pr-4']">
                                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ company.description }}</span>
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
import {ref, defineProps, defineEmits, toRefs, onBeforeMount } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import BaseInput from '@/components/BaseInput.vue'
import countryService from "@/services/country.service";
import companyService from "@/services/company.service";
import projectTypeService from "@/services/project_type.service";

let selectedStatus = ref({})
let selectedCountry = ref({})
let selectedCompany = ref({})
let selectedProjectType = ref({})
let isLoadingCompany = ref(true)
let countries = ref()
let companies = ref()
let projectTypes = ref()
const statuses = ref([
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' }
])
onBeforeMount(() => {

  projectTypeService.list().then(x => {
    projectTypes.value = x.data
    if (data.assignList.value) {
      //Assign project type
      //Assign the same type of object to the list (for the cases in which it is an already registered project type)
      for (const [index, item] of Object.entries(projectTypes.value)) {
        if (item.id === data.project.value.project_type.id) {
          selectedProjectType.value = projectTypes.value[index]
        }
      }
    } else {
      selectedProjectType.value = projectTypes.value[0]
    }
  }).catch(err => {
  }).finally(() => {
  })

  countryService.list().then(x => {
    countries.value = x.data
    if (data.assignList.value) {
      //Assign country
      //Assign the same type of object to the list (for the cases in which it is an already registered country)
      for (const [index, item] of Object.entries(countries.value)) {
        if (item.id === data.project.value.branch.country.id) {
          selectedCountry.value = countries.value[index]
        }
      }
    } else {
      selectedCountry.value = countries.value[0]
    }

    assignStatus()
    loadCompany()
    finishLoading()
  }).catch(err => {
  }).finally(() => {
  })
})

const props = defineProps({
  project: {
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
  projectId: {
    type: String,
    default: ''
  },
  modeEdit: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['save', 'isLoading'])
const data = toRefs(props)

function assignStatus() {
  if (data.assignList.value) {
    //Assign status
    statuses.value.forEach((element, index) => {
      if (element.id === data.project.value.status) {
        selectedStatus.value = element
      }
    })
  } else {
    selectedStatus.value = statuses.value[0]
  }
}

function loadCompany() {
  companyService.byCountry(selectedCountry.value.id).then(x => {
    companies.value = x.data
    if (data.assignList.value) {
      //Assign company
      //Assign the same type of object to the list (for the cases in which it is an already registered company)
      for (const [index, item] of Object.entries(companies.value)) {
        if (item.id === data.project.value.branch.company.id) {
          selectedCompany.value = companies.value[index]
        }
      }
    } else {
      selectedCompany.value = companies.value[0]
    }
    setTimeout(() => {
      isLoadingCompany.value = false
    }, 500)
  }).catch(err => {
  }).finally(() => {
  })
}

function changeCompany(id) {
  isLoadingCompany.value = true
  loadCompany();
}

function finishLoading() {
  emit('isLoading', false)
}

const sendData = (event) => {
  event.preventDefault()
  emit('save', {
    project: data.project.value,
    project_type: selectedProjectType.value,
    country: selectedCountry.value,
    company: selectedCompany.value,
    status: selectedStatus.value
  })
}
</script>
