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
    children: [
      {
        path: '',
        component: () => import('@/views/Parametric/ParametricGrid.vue'),
        name: 'ParametricPage',
        meta: {
          page: 'ParametricPage'
        },
      },
      {
        path: 'technologies',
        name: 'TechnologyList',
        component: () => import('@/views/Parametric/Technologies/TechnologyListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'technologies/create',
        name: 'TechnologyCreate',
        component: () => import('@/views/Parametric/Technologies/TechnologyCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'technologies/:technologyId(\\d+)',
        name: 'TechnologyShow',
        component: () => import('@/views/Parametric/Technologies/TechnologyShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'technologies/:technologyId(\\d+)/edit',
        name: 'TechnologyEdit',
        component: () => import('@/views/Parametric/Technologies/TechnologyEdit.vue'),
        meta: {
          page: 'ParametricPage'
        },
      },
      {
        path: 'companies',
        name: 'CompanyList',
        component: () => import('@/views/Parametric/Companies/CompanyListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'companies/create',
        name: 'CompanyCreate',
        component: () => import('@/views/Parametric/Companies/CompanyCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'companies/:companyId(\\d+)',
        name: 'CompanyShow',
        component: () => import('@/views/Parametric/Companies/CompanyShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'companies/:companyId(\\d+)/edit',
        name: 'CompanyEdit',
        component: () => import('@/views/Parametric/Companies/CompanyEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'oems',
        name: 'OemList',
        component: () => import('@/views/Parametric/Oems/OemListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'oems/create',
        name: 'OemCreate',
        component: () => import('@/views/Parametric/Oems/OemCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'oems/:oemId(\\d+)',
        name: 'OemShow',
        component: () => import('@/views/Parametric/Oems/OemShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'oems/:oemId(\\d+)/edit',
        name: 'OemEdit',
        component: () => import('@/views/Parametric/Oems/OemEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'statuses',
        name: 'StatusList',
        component: () => import('@/views/Parametric/Statuses/StatusListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'statuses/create',
        name: 'StatusCreate',
        component: () => import('@/views/Parametric/Statuses/StatusCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'statuses/:statusId(\\d+)',
        name: 'StatusShow',
        component: () => import('@/views/Parametric/Statuses/StatusShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'statuses/:statusId(\\d+)/edit',
        name: 'StatusEdit',
        component: () => import('@/views/Parametric/Statuses/StatusEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'countries',
        name: 'CountryList',
        component: () => import('@/views/Parametric/Countries/CountryListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'countries/create',
        name: 'CountryCreate',
        component: () => import('@/views/Parametric/Countries/CountryCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'countries/:countryId(\\d+)',
        name: 'CountryShow',
        component: () => import('@/views/Parametric/Countries/CountryShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'countries/:countryId(\\d+)/edit',
        name: 'CountryEdit',
        component: () => import('@/views/Parametric/Countries/CountryEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'service-types',
        name: 'ServiceTypeList',
        component: () => import('@/views/Parametric/ServiceTypes/ServiceTypeListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'service-types/create',
        name: 'ServiceTypeCreate',
        component: () => import('@/views/Parametric/ServiceTypes/ServiceTypeCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'service-types/:serviceTypeId(\\d+)',
        name: 'ServiceTypeShow',
        component: () => import('@/views/Parametric/ServiceTypes/ServiceTypeShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'service-types/:serviceTypeId(\\d+)/edit',
        name: 'ServiceTypeEdit',
        component: () => import('@/views/Parametric/ServiceTypes/ServiceTypeEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'project-types',
        name: 'ProjectTypeList',
        component: () => import('@/views/Parametric/ProjectTypes/ProjectTypeListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'project-types/create',
        name: 'ProjectTypeCreate',
        component: () => import('@/views/Parametric/ProjectTypes/ProjectTypeCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'project-types/:projectTypeId(\\d+)',
        name: 'ProjectTypeShow',
        component: () => import('@/views/Parametric/ProjectTypes/ProjectTypeShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'project-types/:projectTypeId(\\d+)/edit',
        name: 'ProjectTypeEdit',
        component: () => import('@/views/Parametric/ProjectTypes/ProjectTypeEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'severities',
        name: 'SeverityList',
        component: () => import('@/views/Parametric/Severities/SeverityListPage.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'severities/create',
        name: 'SeverityCreate',
        component: () => import('@/views/Parametric/Severities/SeverityCreate.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'severities/:severityId(\\d+)',
        name: 'SeverityShow',
        component: () => import('@/views/Parametric/Severities/SeverityShow.vue'),
        meta: {
          page: 'ParametricPage'
        }
      },
      {
        path: 'severities/:severityId(\\d+)/edit',
        name: 'SeverityEdit',
        component: () => import('@/views/Parametric/Severities/SeverityEdit.vue'),
        meta: {
          page: 'ParametricPage'
        }
      }
    ]
  },
  {
    path: '/tickets-package',
    name: 'TicketsPackage',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/TicketsPackage/TicketsPackagePage.vue'),
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
      component: () => import('@/views/Tickets/TicketsPage.vue'),
      name: 'TicketsPage',
      meta: {
        page: 'TicketsPage'
      },
    }]
  },
  {
    path: '/manage-sla',
    name: 'ManageSLA',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/ManageSLA/ManageSLAPage.vue'),
      name: 'ManageSLAPage',
      meta: {
        page: 'ManageSLAPage'
      },
    }]
  },
  {
    path: '/branches',
    name: 'Branches',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'BranchList',
        component: () => import('@/views/Branches/BranchListPage.vue'),
        meta: {
          page: 'BranchesPage'
        }
      },
      {
        path: 'create',
        name: 'BranchCreate',
        component: () => import('@/views/Branches/BranchCreate.vue'),
        meta: {
          page: 'BranchesPage'
        }
      },
      {
        path: ':branchId(\\d+)',
        name: 'BranchShow',
        component: () => import('@/views/Branches/BranchShow.vue'),
        meta: {
          page: 'BranchesPage'
        }
      },
      {
        path: ':branchId(\\d+)/edit',
        name: 'BranchEdit',
        component: () => import('@/views/Branches/BranchEdit.vue'),
        meta: {
          page: 'BranchesPage'
        }
      }
    ]
  },
  {
    path: '/projects',
    name: 'Projects',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'ProjectList',
        component: () => import('@/views/Projects/ProjectListPage.vue'),
        meta: {
          page: 'ProjectsPage'
        }
      },
      {
        path: 'create',
        name: 'ProjectCreate',
        component: () => import('@/views/Projects/ProjectCreate.vue'),
        meta: {
          page: 'ProjectsPage'
        }
      },
      {
        path: ':projectId(\\d+)',
        name: 'ProjectShow',
        component: () => import('@/views/Projects/ProjectShow.vue'),
        meta: {
          page: 'ProjectsPage'
        }
      },
      {
        path: ':projectId(\\d+)/edit',
        name: 'ProjectEdit',
        component: () => import('@/views/Projects/ProjectEdit.vue'),
        meta: {
          page: 'ProjectsPage'
        }
      }
    ]
  },
  {
    path: '/reports',
    name: 'Reports',
    component: LayoutAdmin,
    children: [{
      path: '',
      component: () => import('@/views/Reports/ReportsPage.vue'),
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
