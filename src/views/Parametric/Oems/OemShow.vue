<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">OEM {{ oemName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <OemForm
            :oem="oemData"
            :oem-id="oemId"
            :assign-list="canAssign"
            :can-edit="canEdit"
            @isLoading="statusLoading" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import oemService from "@/services/oem.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import OemForm from '@/views/Parametric/Oems/OemForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const canAssign = ref(true)
let oemData = ref({
  "description": "",
  "status": ""
})

let loading = ref(true)
let oemId = ref('')
let oemName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'OEMs', pathName: 'OemList', isLink: true, current: false },
  { description: 'Show', pathName: 'OemShow', isLink: false, current: true }
]
onBeforeMount( () => {

  oemId.value = route.params.oemId

  oemService.get(oemId.value).then(x => {
    oemData.value = x.data
    oemName.value = x.data.description
  }).catch(err => {
  }).finally(() => {
  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
