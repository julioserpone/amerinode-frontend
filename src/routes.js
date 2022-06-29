import { createRouter, createWebHistory } from 'vue-router'
import { encryptStorage } from "@/services/http.service";
import { notify } from "notiwind";

const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LayoutAdmin = () => import('@/layouts/LayoutAdmin.vue');

const About = () => import('@/views/AboutPage.vue');

let defaultPage = localStorage.getItem('DefaultPage') || 'DashboardPage';

const routes = [
  {
    path: '/',
    name: 'Root',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'HomePage',
        redirect: { name: localStorage.getItem('DefaultPage') || 'DashboardPage' }
      }
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/HomePage.vue'),
      name: 'DashboardPage',
      meta: {
        page: 'DashboardPage'
      }
    }]
  },
  {
    path: '/parametric',
    name: 'Parametric',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/Parametric/ParametricGrid.vue'),
      name: 'ParametricPage',
      meta: {
        page: 'ParametricPage'
      },
    }]
  },
  {
    path: '/tickets-package',
    name: 'TicketsPackagePage',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: About,
      name: 'TicketsPackagePage',
      meta: {
        page: 'TicketsPackagePage'
      },
    }]
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/TicketsPage.vue'),
      name: 'TicketsPage',
      meta: {
        page: 'TicketsPage'
      },
    }]
  },
  {
    path: '/reports',
    name: 'Reports',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: About,
      name: 'ReportsPage',
      meta: {
        page: 'ReportsPage'
      },
    }]
  },
  {
    path: '/users',
    component: LayoutAdmin,
    name: 'User',
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/Users/UserListPage.vue'),
        meta: {
          page: 'UsersPage'
        }
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('@/views/Users/UserCreate.vue'),
        meta: {
          page: 'UsersPage'
        }
      },
      {
        path: ':userId(\\d+)',
        name: 'UserShow',
        component: () => import('@/views/Users/UserShow.vue'),
        meta: {
          page: 'UsersPage'
        }
      },
      {
        path: ':userId(\\d+)/edit',
        name: 'UserEdit',
        component: () => import('@/views/Users/UserEdit.vue'),
        meta: {
          page: 'UsersPage'
        }
      }
    ]
  },
  {
    path: '/roles',
    component: LayoutAdmin,
    name: 'Role',
    children: [
      {
        path: '',
        name: 'RoleList',
        component: () => import('@/views/Roles/RoleListPage.vue'),
        meta: {
          page: 'RolesPage'
        }
      },
      {
        path: 'create',
        name: 'RoleCreate',
        component: () => import('@/views/Roles/RoleCreate.vue'),
        meta: {
          page: 'RolesPage'
        }
      },
      {
        path: ':roleId(\\d+)',
        name: 'RoleShow',
        component: () => import('@/views/Roles/RoleShow.vue'),
        meta: {
          page: 'RolesPage'
        }
      },
      {
        path: ':roleId(\\d+)/edit',
        name: 'RoleEdit',
        component: () => import('@/views/Roles/RoleEdit.vue'),
        meta: {
          page: 'RolesPage'
        }
      }
    ]
  },
  {
    path: '/permissions',
    component: LayoutAdmin,
    name: 'Permission',
    children: [
      {
        path: '',
        name: 'PermissionList',
        component: () => import('@/views/Permissions/PermissionListPage.vue'),
        meta: {
          page: 'PermissionsPage'
        }
      },
      {
        path: 'create',
        name: 'PermissionCreate',
        component: () => import('@/views/Permissions/PermissionCreate.vue'),
        meta: {
          page: 'PermissionsPage'
        }
      },
      {
        path: ':permissionId(\\d+)',
        name: 'PermissionShow',
        component: () => import('@/views/Permissions/PermissionShow.vue'),
        meta: {
          page: 'PermissionsPage'
        }
      },
      {
        path: ':permissionId(\\d+)/edit',
        name: 'PermissionEdit',
        component: () => import('@/views/Permissions/PermissionEdit.vue'),
        meta: {
          page: 'PermissionsPage'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LayoutAuth,
    children: [{
      path: '',
      name: 'LoginPage',
      component: () => import('@/views/Auth/LoginPage.vue')
    }],
  },
  {
    path: '/about',
    name: 'About',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'AboutPage',
      component: About
    }],
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {

  let isAuthenticated = (encryptStorage.getItem('jwt') !== null && encryptStorage.getItem('jwt') !== undefined);
  if (!isAuthenticated && to.name !== 'LoginPage') { next({ name: 'LoginPage' }) }
  else {
    if (isAuthenticated && to.name === 'LoginPage') next({ name: 'HomePage' })
    else {
      if (to.name !== 'LoginPage' && to.name !== 'NotFound') {
        let routeAuthorized = false;
        let navigationItems = encryptStorage.getItem('navigation')
        navigationItems.forEach(function (item) {
          if (item.name === to.meta.page) {
            routeAuthorized = true;
          }
        })
        if (!routeAuthorized) {
          notify({
            group: "top",
            title: "Error",
            text: "You are not authorized to enter the requested route",
            type: "error"
          }, 5000)
          router.push({name: defaultPage }).then()
        }
      }
      next();
    }
  }
})

export default router;
