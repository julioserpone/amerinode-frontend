<template>
  <div>
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <breadcrumbs />
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
                      <p class="mt-2 text-sm font-normal text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                      <button type="button" class=" ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-amerinode-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amerinode-blue-700 focus:outline-none focus:ring-2 focus:ring-amerinode-blue-500 focus:ring-offset-2 sm:w-auto">Add user</button>
                    </div>
                  </div>
                </template>
                <template #empty>
                  No users found.
                </template>
                <template #loading>
                  Loading users data. Please wait.
                </template>
                <Column selectionMode="multiple" style="min-width: 3rem"></Column>
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
              </DataTable>
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

let users = ref()
let loading = ref(true)
let selectedUsers = ref()
let trace = [
  { description: 'Home', pathName: 'HomePage' },
  { description: 'User', pathName: 'UserList' }
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

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director, Product Development', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floy.dmiles@example.com', role: 'Member' },
]
</script>