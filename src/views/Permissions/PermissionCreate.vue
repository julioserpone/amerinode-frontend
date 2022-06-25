<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New permission</h1>
        </div>
      </div>
      <div class="mx-auto">
        <PermissionForm
            :permission="permissionData"
            :permission-id="permissionId"
            :assign-list="canAssign"
            :mode-edit="false"
            @isLoading="statusLoading"
            @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import PermissionForm from '@/views/Permissions/PermissionForm.vue'
import permissionService from "@/services/permission.service"
import {notify} from "notiwind"
import {useRouter} from "vue-router"

const router = useRouter()
const canAssign = ref(false)
let loading = ref(false)
let permissionId = ref('')
let permissionData = ref({
  "name": "",
  "description": "",
  "guard_name": "",
  "status": ""
})

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Permissions', pathName: 'PermissionList', isLink: true, current: false },
  { description: 'Create', pathName: 'PermissionCreate', isLink: false, current: true }
]
const saveData = (event) => {
  let data = {
    'permission': event.permission,
    'status': event.status
  }
  permissionService.save(0, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "PermissionList" })
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