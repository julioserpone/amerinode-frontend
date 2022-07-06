<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">Company {{ companyName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <CompanyForm
            :company="companyData"
            :company-id="companyId"
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
import companyService from "@/services/company.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import CompanyForm from '@/views/Parametric/Companies/CompanyForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)
let companyData = ref({
  "description": "",
  "status": ""
})

let loading = ref(true)
let companyId = ref('')
let companyName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Companies', pathName: 'CompanyList', isLink: true, current: false },
  { description: 'Edit', pathName: 'CompanyEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  companyId.value = route.params.companyId

  companyService.edit(companyId.value).then(x => {
    companyData.value = x.data
    companyName.value = x.data.description
  }).catch(err => {

  }).finally(() => {

  })
})
const saveData = (event) => {
  let data = {
    'company': event.company,
    'status': event.status
  }
  companyService.save(companyId.value, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "CompanyList" })
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
