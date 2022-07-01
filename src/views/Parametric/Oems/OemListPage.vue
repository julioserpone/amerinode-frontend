<template>
  <div>
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <breadcrumbs :trace-route="trace" />
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <DataTable :value="oems" :paginator="true" :rows="5"
                         dataKey="id" :rowHover="true" v-model:filters="filters" filterDisplay="menu" :loading="loading"
                         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25,50]"
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                         :globalFilterFields="['id','description']" responsiveLayout="scroll">
                <template #header>
                  <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                      <h1 class="text-xl font-semibold text-gray-900">OEMs</h1>
                      <p class="mt-2 text-sm font-normal text-gray-700">A list of all the OEMs.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 inline-flex items-center sm:flex-none">
                      <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                      <router-link to="/parametric/oems/create" class="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-amerinode-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-amerinode-blue-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add OEM
                      </router-link>
                    </div>
                  </div>
                </template>
                <template #empty>
                  No OEMs found.
                </template>
                <template #loading>
                  <div class="grid place-items-center h-screen">
                    <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </template>
                <Column field="id" header="Id" sortable class="min-w-[5rem]">
                  <template #body="{data}">
                    {{data.id}}
                  </template>
                  <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by id"/>
                  </template>
                </Column>
                <Column field="description" header="Description" sortable class="min-w-[40rem]">
                  <template #body="{data}">
                    {{data.description}}
                  </template>
                  <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by description"/>
                  </template>
                </Column>
                <Column field="status" header="Status" sortable :filterMenuStyle="{'width':'14rem'}" class="min-w-[12rem]">
                  <template #body="{data}">
                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium uppercase" :class="data.status === 'active' ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800'">{{data.status}}</span>
                  </template>
                  <template #filter="{filterModel}">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                      <template #value="slotProps">
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium uppercase" :class="slotProps.value === 'active' ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800'" v-if="slotProps.value">{{slotProps.value}}</span>
                        <span v-else>{{slotProps.placeholder}}</span>
                      </template>
                      <template #option="slotProps">
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium uppercase" :class="slotProps.option === 'active' ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800'">{{slotProps.option}}</span>
                      </template>
                    </Dropdown>
                  </template>
                </Column>
                <Column :exportable="false">
                  <template #body="slotProps">
                    <div class="ml-4 flex items-center md:ml-6">
                      <router-link :to="{ name: 'OemShow', params: { oemId: slotProps.data.id }}" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <EyeIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">show</span>
                      </router-link>
                      <router-link :to="{ name: 'OemEdit', params: { oemId: slotProps.data.id }}" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <PencilIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">edit</span>
                      </router-link>
                      <button v-show="slotProps.data.status !== 'inactive'" type="button" @click="confirmDelete(slotProps.data)" class="bg-white rounded-full p-1 mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amerinode-blue-500">
                        <TrashIcon class="h-6 w-6" aria-hidden="true" />
                        <span class="sr-only">delete</span>
                      </button>
                    </div>
                  </template>
                </Column>
              </DataTable>
              <dialog-confirm
                  :showDialog="openDialogConfirm"
                  :title="'Inactive OEM'"
                  :message="messageDelete"
                  @executeAction="deleteOem"
                  @closeDialog="closeDeleteDialog"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { notify } from "notiwind";
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import oemService from "../../../services/oem.service.js"
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import DialogConfirm from '@/components/DialogConfirm.vue'

const router = useRouter()
let oems = ref()
let oem = ref({})
let loading = ref(true)
let openDialogConfirm = ref(false)
let messageDelete = ref("")
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'OEMs', pathName: 'OemList', isLink: true, current: true }
]
let statuses = ref([
  'active', 'inactive'
]);
let filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  'id': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  'description': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  'status': {value: null, matchMode: FilterMatchMode.EQUALS},
})

onMounted(() => {
  loadOems()
})

function loadOems() {
  oemService.list().then(x => {
    oems.value = x.data
  }).catch(err => {

  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}

function confirmDelete(data) {
  oem.value = data
  messageDelete.value = "Are you sure you want to inactive the OEM "+oem.value.description+"?"
  openDialogConfirm.value = true
}

const deleteOem = () => {
  closeDeleteDialog()
  oemService.delete(oem.value.id).then(x => {
    notify({
      group: "top",
      title: "Delete",
      text: x.data,
      type: "success"
    }, 5000)
    loadOems()
  }).catch(err => {

  }).finally(() => {

  })
}
const closeDeleteDialog = () => {
  openDialogConfirm.value = false
}
</script>
