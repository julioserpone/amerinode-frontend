<template>
  <div>
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <breadcrumbs :trace-route="trace" />
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <DataTable :value="users" :paginator="true" :rows="5"
                         dataKey="id" :rowHover="true" v-model:selection="selectedUsers" v-model:filters="filters" filterDisplay="menu" :loading="loading"
                         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25,50]"
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                         :globalFilterFields="['name','username','email']" responsiveLayout="scroll">
                <template #header>
                  <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                      <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                      <p class="mt-2 text-sm font-normal text-gray-700">A list of all the users including their roles and permissions.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 inline-flex items-center sm:flex-none">
                      <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                      <router-link to="/users/create" class="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-amerinode-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-amerinode-blue-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add user
                      </router-link>
                    </div>
                  </div>
                </template>
                <template #empty>
                  No users found.
                </template>
                <template #loading>
                  Loading users data. Please wait.
                </template>
                <Column selectionMode="multiple" style="min-width: 1rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 14rem">
                  <template #body="{data}">
                    {{data.name}}
                  </template>
                  <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                  </template>
                </Column>
                <Column field="username" header="Username" sortable style="min-width: 14rem">
                  <template #body="{data}">
                    {{data.username}}
                  </template>
                  <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by username"/>
                  </template>
                </Column>
                <Column field="email" header="Email" sortable style="min-width: 14rem">
                  <template #body="{data}">
                    {{data.email}}
                  </template>
                  <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email"/>
                  </template>
                </Column>
                <Column :exportable="false">
                  <template #body="slotProps">
                    <div class="ml-4 flex items-center md:ml-6">
                      <router-link :to="{ name: 'UserShow', params: { userId: slotProps.data.id }}" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <EyeIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">show</span>
                      </router-link>
                      <router-link :to="{ name: 'UserEdit', params: { userId: slotProps.data.id }}" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <PencilIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">edit</span>
                      </router-link>
                      <button type="button" @click="confirmDeleteUser(slotProps.data)" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <TrashIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">delete</span>
                      </button>
                    </div>
                  </template>
                </Column>
              </DataTable>
              <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                  <TransitionChild
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                  >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                  </TransitionChild>

                  <div class="fixed inset-0 overflow-y-auto">
                    <div
                        class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                      <TransitionChild
                          as="template"
                          enter="duration-300 ease-out"
                          enter-from="opacity-0 scale-95"
                          enter-to="opacity-100 scale-100"
                          leave="duration-200 ease-in"
                          leave-from="opacity-100 scale-100"
                          leave-to="opacity-0 scale-95"
                      >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <DialogTitle
                              as="h3"
                              class="text-lg font-medium leading-6 text-gray-900"
                          >
                            Payment successful
                          </DialogTitle>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                              Your payment has been successfully submitted. We’ve sent you
                              an email with all of the details of your order.
                            </p>
                          </div>

                          <div class="mt-4">
                            <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                @click="closeModal"
                            >
                              Got it, thanks!
                            </button>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userService from "../../services/user.service.js"
import {onMounted, ref} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import InputText from 'primevue/inputtext';
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

let users = ref()
let user = ref({})
let loading = ref(true)
let selectedUsers = ref()
const isOpen = ref(false)
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Users', pathName: 'UserList', isLink: true, current: true }
]
let filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  'username': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
})

onMounted(() => {
  userService.list().then(x => {
    users.value = x.data
  }).catch(err => {

  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
})

function confirmDeleteUser(data) {
  user.value = data
  console.log(data)
  isOpen.value = true
}
function closeModal() {
  isOpen.value = false
}

</script>