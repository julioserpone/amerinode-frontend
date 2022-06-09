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
        <UserForm :user="userData" @save="saveData"/>
      </div>
    </div>
  </main>
</template>
<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import UserForm from '@/views/Users/UserForm.vue'
import userService from "@/services/user.service";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
let userData = ref({})
let loading = ref(true)
let userId = ref()
let names = ref(String)
//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Users', pathName: 'UserList', isLink: true, current: false },
  { description: 'Edit', pathName: 'UserEdit', isLink: false, current: true }
]

onMounted(() => {
  userId.value = route.params.userId
  userService.edit(userId.value).then(x => {
    userData.value = x.data
    names.value = x.data.name
  }).catch(err => {

  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
})

const saveData = () => {
  console.log(userData.value)
  router.push({ name: "UserList" })
}
</script>
