<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">{{ names }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <UserForm :user="userData" :user-id="userId" :assign-list="assignValue" :grant-edit-values="canEdit" @isLoading="statusLoading" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import userService from "@/services/user.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import UserForm from '@/views/Users/UserForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const assignValue = ref(true)
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

let loading = ref(true)
let userId = ref('')
let names = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Users', pathName: 'UserList', isLink: true, current: false },
  { description: 'Show', pathName: 'UserShow', isLink: false, current: true }
]
onBeforeMount( () => {

  userId.value = route.params.userId
  //query to User
  userService.edit(userId.value).then(x => {
    userData.value = x.data
    names.value = x.data.name
  }).catch(err => {

  }).finally(() => {

  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
