<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New role</h1>
        </div>
      </div>
      <div class="mx-auto">
        <RoleForm :role="roleData" :role-id="roleId" :assign-list="canAssign" @isLoading="statusLoading" @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import RoleForm from '@/views/Roles/RoleForm.vue'
import roleService from "@/services/rol.service"
import {notify} from "notiwind"
import {useRouter} from "vue-router"

const router = useRouter()
const canAssign = ref(false)
let loading = ref(true)
let roleId = ref('')
let roleData = ref({
  "name": "",
  "description": "",
  "guard_name": "",
  "roleId": "",
  "status": "",
  "permissions": [{
    "id": 0,
    "name": "",
    "guard_name": "",
    "description": "",
  }]
})

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Roles', pathName: 'RoleList', isLink: true, current: false },
  { description: 'Create', pathName: 'RoleCreate', isLink: false, current: true }
]
const saveData = (event) => {
  let data = {
    'role': event.role,
    'status': event.status,
    'permissions': event.permissions
  }
  roleService.save(0, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "RoleList" })
  }).catch(err => {
    let message = (err.code === "ERR_BAD_REQUEST") ? err.response.data.message : err.message;
    notify({
      group: "top",
      title: "Error",
      text: message,
      type: "error"
    }, 5000)
  }).finally(() => {
  })
}
const statusLoading = (data) => {
  loading.value = data
}
</script>