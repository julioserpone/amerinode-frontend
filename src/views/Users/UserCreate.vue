<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New user</h1>
        </div>
      </div>
      <div class="mx-auto">
        <UserForm :user="userData" :user-id="userId" :assign-list="assignValue" @isLoading="statusLoading" @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import UserForm from '@/views/Users/UserForm.vue'
import userService from "@/services/user.service"
import {notify} from "notiwind"
import {useRouter} from "vue-router"

const router = useRouter()
const assignValue = ref(false)
let loading = ref(true)
let userId = ref('')
let userData = ref({
  "name": "",
  "username": "",
  "email": "",
  "title": "",
  "work_phone": "",
  "mobile_phone": "",
  "password": "",
  "password_confirmation": "",
  "status": "",
  "roles": [
    {
      "name": "",
      "guard_name": "",
      "description": "",
      "disabled": 0
    }
  ],
  "permissions": []
})

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Users', pathName: 'UserList', isLink: true, current: false },
  { description: 'Create', pathName: 'UserCreate', isLink: false, current: true }
]
const saveData = (event) => {
  let data = {
    'user': event.user,
    'role': event.role,
    'status': event.status
  }
  userService.save(0, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "UserList" })
  }).catch(err => {
    console.log(err)
    //Unprocessable content
    if (err.code === "ERR_BAD_REQUEST") {
      notify({
        group: "top",
        title: "Error",
        text: err.response.data.message,
        type: "error"
      }, 5000)
    } else {
      notify({
        group: "top",
        title: "Error",
        text: err.message,
        type: "error"
      }, 5000)
    }
  }).finally(() => {
  })
}
const statusLoading = (data) => {
  loading.value = data
}
</script>