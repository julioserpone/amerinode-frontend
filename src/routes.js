import { createRouter, createWebHistory } from 'vue-router'
import {encryptStorage} from "@/services/http.service";

const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LayoutAdmin = () => import('@/layouts/LayoutAdmin.vue');

const HomePage = () => import('@/views/HomePage.vue');
const About = () => import('@/views/AboutPage.vue');
const Login = () => import('@/views/Auth/LoginPage.vue');

const routes = [
  {
    path: '/',
    name: 'Root',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'Home',
      component: HomePage,
      meta: {
        authRequired: true
      },
    }],
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
        authRequired: false
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
        authRequired: true
      },
    }],
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      authRequired: false
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
    if (to.name === 'LoginPage' && isAuthenticated) next({ name: 'Home' })
    else next();
  }
})

export default router;
