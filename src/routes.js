import { createRouter, createWebHistory } from 'vue-router'
import {encryptStorage} from "@/services/http.service";
import {notify} from "notiwind";

const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LayoutAdmin = () => import('@/layouts/LayoutAdmin.vue');

const HomePage = () => import('@/views/HomePage.vue');
const UserListPage = () => import('@/views/Users/UserListPage.vue');
const About = () => import('@/views/AboutPage.vue');
const Login = () => import('@/views/Auth/LoginPage.vue');

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
      },
      {
        path: '/dashboard',
        name: 'DashboardPage',
        component: HomePage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/parametric',
        name: 'ParametricPage',
        component: About,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/tickets-package',
        name: 'TicketsPackagePage',
        component: About,
        meta: {
          requiresAuth: true
        },
      },{
        path: '/users',
        name: 'UsersPage',
        component: UserListPage,
        meta: {
          requiresAuth: true
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LayoutAuth,
    children: [{
      path: '',
      name: 'LoginPage',
      component: Login,
      meta: {
        requiresAuth: false
      },
    }],
  },
  {
    path: '/about',
    name: 'About',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'AboutPage',
      component: About,
      meta: {
        requiresAuth: true
      },
    }],
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      requiresAuth: false
    },
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
          if (item.name === to.name) {
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
