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
        <ProjectForm
            :project="projectData"
            :project-id="projectId"
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
import projectService from "@/services/project.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import ProjectForm from '@/views/Projects/ProjectForm.vue'

const route = useRoute()
const router = useRouter()
const canEdit = ref(false)
const canAssign = ref(true)
let projectData = ref({
  "id": "",
  "projectId": "",
  "project_type_id": "",
  "branch_id": "",
  "name": "",
  "description": "",
  "status": "",
  "project_type": {
    "id": "",
    "service_type_id": "",
    "description": "",
    "service_type": {
      "id": "",
      "description": "",
    }
  },
  "branch": {
    "id": "",
    "branchId": "",
    "company_id": "",
    "country_id": "",
    "status": "",
    "company": {
      "id": "",
      "companyId": "",
      "description": "",
      "status": "",
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
      "status": "",
    }
  }
})

let loading = ref(true)
let projectId = ref('')
let countryFlag = ref(String)
let companyName = ref("")

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Projects', pathName: 'ProjectList', isLink: true, current: false },
  { description: 'Show', pathName: 'ProjectShow', isLink: false, current: true }
]
onBeforeMount( () => {

  projectId.value = route.params.projectId

  projectService.get(projectId.value).then(x => {
    projectData.value = x.data
    countryFlag.value = x.data.branch.country.flag_url
    companyName.value = x.data.name+' | '+x.data.branch.company.description
  }).catch(err => {
  }).finally(() => {
  })
})

const statusLoading = (data) => {
  loading.value = data
}
</script>
