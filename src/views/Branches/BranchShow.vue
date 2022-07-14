<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="py-5 border-b border-gray-200">
          <div href="#" class="flex-shrink-0 group block">
            <div class="flex items-center">
              <div>
                <img class="inline-block h-9 w-9 rounded-full" :src="countryFlag" alt="" />
              </div>
              <div class="ml-3">
                <p class="text-2xl font-semibold text-gray-900">{{ companyName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto">
        <BranchForm
            :branch="branchData"
            :branch-id="branchId"
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
import branchService from "@/services/branch.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import BranchForm from '@/views/Branches/BranchForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const canAssign = ref(true)
let branchData = ref({
  "id": "",
  "company_id": "",
  "country_id": "",
  "status": "active",
  "company": {
    "id": "",
    "companyId": "",
    "description": "",
    "status": ""
  },
  "country": {
    "id": "",
    "name": "",
    "capital": "",
    "code_iso": "",
    "code_iso3": "",
    "currency": "",
    "calling_code": "",
    "flag_url": "",
    "status": ""
  }
})

let loading = ref(true)
let branchId = ref('')
let countryFlag = ref(String)
let companyName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Branches', pathName: 'BranchList', isLink: true, current: false },
  { description: 'Show', pathName: 'BranchShow', isLink: false, current: true }
]
onBeforeMount( () => {

  branchId.value = route.params.branchId

  branchService.get(branchId.value).then(x => {
    branchData.value = x.data
    countryFlag.value = x.data.country.flag_url
    companyName.value = x.data.company.description
  }).catch(err => {
  }).finally(() => {
  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
