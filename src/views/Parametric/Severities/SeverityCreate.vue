<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New severity</h1>
        </div>
      </div>
      <div class="mx-auto">
        <SeverityForm
            :severity-data="severityData"
            :severity-id="severityId"
            :assign-list="canAssign"
            :mode-edit="false"
            @isLoading="statusLoading"
            @save="saveData" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import SeverityForm from '@/views/Parametric/Severities/SeverityForm.vue'
import severityService from "@/services/severity.service"
import {notify} from "notiwind"
import {useRouter} from "vue-router"

const router = useRouter()
const canAssign = ref(false)
let loading = ref(false)
let severityId = ref('')
let severityData = ref({
  "code": "",
  "name": "",
  "description": "",
  "color": "#007fce",
  "status": ""
})

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Severities', pathName: 'SeverityList', isLink: true, current: false },
  { description: 'Create', pathName: 'SeverityCreate', isLink: false, current: true }
]
const saveData = (event) => {
  let data = {
    'data': event.data,
    'color': event.color,
    'status': event.status
  }
  severityService.save(0, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "SeverityList" })
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
