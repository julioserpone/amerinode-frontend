<template>
  <main>
    <loading-content :is-loading="loading" />
    <div v-show="!loading" class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto">
        <breadcrumbs :trace-route="trace" />
        <div class="pb-5 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900 pt-4">{{ projectTypeName }}</h1>
        </div>
      </div>
      <div class="mx-auto">
        <ProjectTypeForm
            :project-type="projectTypeData"
            :project-type-id="projectTypeId"
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
import projectTypeService from "@/services/project_type.service";
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import ProjectTypeForm from '@/views/Parametric/ProjectTypes/ProjectTypeForm.vue'

const route = useRoute()
const router = useRouter()
const canAssign = ref(true)
let projectTypeData = ref({
  "id": "",
  "service_type_id": "",
  "description": "",
  "status": "",
  "service_type": {
    "id": "",
    "description": "",
    "status": ""
  }
})

let loading = ref(true)
let projectTypeId = ref('')
let projectTypeName = ref(String)

//for breadcrumbs
let trace = [
  { description: 'Home', pathName: 'HomePage', isLink: true, current: false },
  { description: 'Parametric', pathName: 'ParametricPage', isLink: true, current: false },
  { description: 'Project types', pathName: 'ProjectTypeList', isLink: true, current: false },
  { description: 'Edit', pathName: 'ProjectTypeEdit', isLink: false, current: true }
]
onBeforeMount( () => {

  projectTypeId.value = route.params.projectTypeId

  projectTypeService.edit(projectTypeId.value).then(x => {
    projectTypeData.value = x.data
    projectTypeName.value = x.data.description
  }).catch(err => {

  }).finally(() => {

  })
})
const saveData = (event) => {
  let data = {
    'project_type': event.project_type,
    'service_type': event.service_type,
    'status': event.status
  }
  projectTypeService.save(projectTypeId.value, data).then(x => {
    notify({
      group: "top",
      title: "Update",
      text: x.data,
      type: "success"
    }, 5000)
    router.push({ name: "ProjectTypeList" })
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
