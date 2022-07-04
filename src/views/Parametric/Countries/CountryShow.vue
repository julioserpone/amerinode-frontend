<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="py-3 border-b border-gray-200">
          <div href="#" class="flex-shrink-0 group block">
            <div class="flex items-center">
              <div>
                <img class="inline-block h-14 w-14" :src="urlFlag" alt="" />
              </div>
              <div class="ml-3">
                <h1 class="text-2xl font-semibold text-gray-900"> {{ countryName }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto">
        <CountryForm
            :country="countryData"
            :country-id="countryId"
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
import countryService from "@/services/country.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import CountryForm from '@/views/Parametric/Countries/CountryForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const canAssign = ref(true)
let countryData = ref({
  "name": "",
  "capital": "",
  "code_iso": "",
  "code_iso3": "",
  "currency": "",
  "calling_code": "",
  "flag_url": "",
  "timezones": []
})

let loading = ref(true)
let countryId = ref('')
let countryName = ref(String)
let urlFlag = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Countries', pathName: 'CountryList', isLink: true, current: false },
  { description: 'Show', pathName: 'CountryShow', isLink: false, current: true }
]
onBeforeMount( () => {

  countryId.value = route.params.countryId

  countryService.get(countryId.value).then(x => {
    countryData.value = x.data
    countryName.value = x.data.name
    urlFlag.value =x.data.flag_url
  }).catch(err => {
  }).finally(() => {
  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
