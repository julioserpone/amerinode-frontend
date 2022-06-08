<template>
  <main>
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New user</h1>
        </div>
      </div>
      <div class="mx-auto ">
        <UserForm :user="userData" @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { ref } from "vue";
import userService from "@/services/user.service";
import { useRoute } from 'vue-router'
import UserForm from '@/views/Users/UserForm.vue'

const route = useRoute()

let userData = ref({ name: '' })

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Users', pathName: 'UserList', isLink: true, current: false },
  { description: 'Create', pathName: 'UserCreate', isLink: false, current: true }
]
const saveData = () => {
  console.log(userData.value)
}
</script>