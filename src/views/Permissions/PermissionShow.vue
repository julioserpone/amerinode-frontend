<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">Permission {{ permissionName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <PermissionForm
            :permission="permissionData"
            :permission-id="permissionId"
            :assign-list="canAssign"
            :can-edit="canEdit"
            @isLoading="statusLoading" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import permissionService from "@/services/permission.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import PermissionForm from '@/views/Permissions/PermissionForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const canAssign = ref(true)
let permissionData = ref({
  "name": "",
  "description": "",
  "guard_name": "",
  "status": ""
})

let loading = ref(true)
let permissionId = ref('')
let permissionName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Permissions', pathName: 'PermissionList', isLink: true, current: false },
  { description: 'Show', pathName: 'PermissionShow', isLink: false, current: true }
]
onBeforeMount( () => {

  permissionId.value = route.params.permissionId

  permissionService.edit(permissionId.value).then(x => {
    permissionData.value = x.data
    permissionName.value = x.data.name
  }).catch(err => {
  }).finally(() => {
  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
