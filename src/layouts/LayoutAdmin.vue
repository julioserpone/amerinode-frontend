<template>
  <div>
    <SideBar :navigation="navigationItems" :sidebar-is-open="sidebarOpen" @sideBarOpen="changeSideBar" />
    <div class="md:pl-64 flex flex-col flex-1">
      <!-- navbar with search field-->
      <NavBar :user-navigation="userNavigation" :sidebar-is-open="sidebarOpen" @sideBarOpen="changeSideBar" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import {encryptStorage} from "@/services/http.service";

import {
  ChartSquareBarIcon,
  TicketIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  TableIcon,
  KeyIcon,
  FolderOpenIcon,
  UserGroupIcon,
  DocumentReportIcon,
  UsersIcon
} from '@heroicons/vue/outline'

//global declare for layoutAdmin
const sidebarOpen = ref(false)

//event that listens to child components (navbar and sidebar)
const changeSideBar = (val) => {
  sidebarOpen.value = val
}
let navigationItems = encryptStorage.getItem('navigation')

onBeforeMount(() => {
  //heroicons type target assignment for menu items
  navigationItems.forEach(function (item) {
    switch (item.icon) {
      case 'ChartSquareBarIcon':
        item.icon = ChartSquareBarIcon
        break;
      case 'TicketIcon':
        item.icon = TicketIcon
        break
      case 'BriefcaseIcon':
        item.icon = BriefcaseIcon
        break;
      case 'PresentationChartLineIcon':
        item.icon = PresentationChartLineIcon
        break;
      case 'TableIcon':
        item.icon = TableIcon
        break;
      case 'KeyIcon':
        item.icon = KeyIcon
        break;
      case 'FolderOpenIcon':
        item.icon = FolderOpenIcon
        break;
      case 'UserGroupIcon':
        item.icon = UserGroupIcon
        break;
      case 'DocumentReportIcon':
        item.icon = DocumentReportIcon
        break;
      case 'UsersIcon':
        item.icon = UsersIcon
        break;
    }
    item.current = false;
  })
})

const userNavigation = [
  { name: 'Your Profile', href: 'profile', page: 'ProfilePage' },
  { name: 'Settings', href: 'setting', page: 'SettingsPage' },
  { name: 'Sign out', href: 'logout', page: 'Logout' },
]

</script>
