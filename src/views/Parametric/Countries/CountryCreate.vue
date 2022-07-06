<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">New country</h1>
        </div>
      </div>
      <div class="mx-auto">
        <CountryForm
            :country="countryData"
            :country-id="countryId"
            :assign-list="canAssign"
            :mode-edit="false"
            :new-register="true"
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
import CountryForm from '@/views/Parametric/Countries/CountryForm.vue'
import countryService from "@/services/country.service"
import {notify} from "notiwind"
import {useRouter} from "vue-router"

const router = useRouter()
const canAssign = ref(false)
let loading = ref(true)
let countryId = ref('')
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

let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Companies', pathName: 'CountryList', isLink: true, current: false },
  { description: 'Create', pathName: 'CountryCreate', isLink: false, current: true }
]
const saveData = (event) => {
  let data = {
    'country': event.country,
    'status': event.status
  }
  countryService.save(0, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "CountryList" })
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
