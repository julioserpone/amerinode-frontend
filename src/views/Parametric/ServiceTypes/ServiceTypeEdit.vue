<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">{{ serviceTypeName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <ServiceTypeForm
            :service-type="serviceTypeData"
            :service-type-id="serviceTypeId"
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
import serviceTypeService from "@/services/service_type.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import ServiceTypeForm from '@/views/Parametric/ServiceTypes/ServiceTypeForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)
let serviceTypeData = ref({
  "description": "",
  "status": ""
})

let loading = ref(true)
let serviceTypeId = ref('')
let serviceTypeName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Service types', pathName: 'ServiceTypeList', isLink: true, current: false },
  { description: 'Edit', pathName: 'ServiceTypeEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  serviceTypeId.value = route.params.serviceTypeId

  serviceTypeService.edit(serviceTypeId.value).then(x => {
    serviceTypeData.value = x.data
    serviceTypeName.value = x.data.description
  }).catch(err => {

  }).finally(() => {

  })
})
const saveData = (event) => {
  let data = {
    'service_type': event.service_type,
    'status': event.status
  }
  serviceTypeService.save(serviceTypeId.value, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "ServiceTypeList" })
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
