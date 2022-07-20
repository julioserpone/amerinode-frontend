<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">Severity {{ severityName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <SeverityForm
            :severity-data="severityData"
            :status-id="severityId"
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
import severityService from "@/services/severity.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import SeverityForm from '@/views/Parametric/Severities/SeverityForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)
let severityData = ref({
  "code": "",
  "name": "",
  "description": "",
  "color": "",
  "status": ""
})

let loading = ref(true)
let severityId = ref('')
let severityName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Severities', pathName: 'SeverityList', isLink: true, current: false },
  { description: 'Edit', pathName: 'SeverityEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  severityId.value = route.params.severityId

  severityService.edit(severityId.value).then(x => {
    severityData.value = x.data
    severityName.value = x.data.name
  }).catch(err => {

  }).finally(() => {

  })
})
const saveData = (event) => {
  let data = {
    'data': event.data,
    'color': event.color,
    'status': event.status
  }
  severityService.save(severityId.value, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "SeverityList" })
  }).catch(err => {
    console.log(err)
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
