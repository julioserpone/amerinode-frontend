<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">Role {{ roleName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <RoleForm :role="roleData" :role-id="roleId" :assign-list="canAssign" @isLoading="statusLoading" @save="saveData"/>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { notify } from "notiwind";
import roleService from "@/services/rol.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import RoleForm from '@/views/Roles/RoleForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)

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

let loading = ref(true)
let roleId = ref('')
let roleName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Roles', pathName: 'RoleList', isLink: true, current: false },
  { description: 'Edit', pathName: 'RoleEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  roleId.value = route.params.roleId
  //query to Role
  roleService.edit(roleId.value).then(x => {
    roleData.value = x.data
    roleName.value = x.data.name
  }).catch(err => {

  }).finally(() => {

  })
})

const saveData = (event) => {

  let data = {
    'role': event.role,
    'status': event.status,
    'permissions': event.permissions
  }
  roleService.save(roleId.value, data).then(x => {
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
