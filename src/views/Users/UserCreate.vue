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
        <UserForm :user="userData" :user-id="userId" :editable="editable" @isLoading="statusLoading" @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import UserForm from '@/views/Users/UserForm.vue'
import userService from "@/services/user.service";

const editable = ref(false)
let loading = ref(true)
let userId = ref('')
let userData = ref({
  "name": "",
  "username": "",
  "email": "",
  "title": "",
  "work_phone": "",
  "mobile_phone": "",
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
  console.log(event)
}
const statusLoading = (data) => {
  loading.value = data
}
</script>