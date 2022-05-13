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
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/vue/outline'

//global declare for layoutAdmin
const sidebarOpen = ref(false)

//event that listens to child components (navbar and sidebar)
const changeSideBar = (val) => {
  sidebarOpen.value = val
}

const navigationItems = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/logout' },
]

</script>
