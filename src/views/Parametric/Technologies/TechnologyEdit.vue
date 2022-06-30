<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">Technology {{ technologyName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <TechnologyForm
            :technology="technologyData"
            :technology-id="technologyId"
            :assign-list="canAssign"
            @isLoading="statusLoading"
            @save="saveData"/>
      </div>
    </div>
  </main>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import { useRouter, useRoute } from 'vue-router'
import { notify } from "notiwind";
import technologyService from "@/services/technology.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import TechnologyForm from '@/views/Parametric/Technologies/TechnologyForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)
let technologyData = ref({
  "description": "",
  "status": ""
})

let loading = ref(true)
let technologyId = ref('')
let technologyName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Technologies', pathName: 'TechnologyList', isLink: true, current: false },
  { description: 'Edit', pathName: 'TechnologyEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  technologyId.value = route.params.technologyId

  technologyService.edit(technologyId.value).then(x => {
    technologyData.value = x.data
    technologyName.value = x.data.description
  }).catch(err => {

  }).finally(() => {

  })
})
const saveData = (event) => {
  let data = {
    'technology': event.technology,
    'status': event.status
  }
  technologyService.save(technologyId.value, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "TechnologyList" })
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
