import { createRouter, createWebHistory } from 'vue-router'

const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LayoutAdmin = () => import('@/layouts/LayoutAdmin.vue');

const HomePage = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Login = () => import('@/views/Auth/Login.vue');

const routes = [
  {
    path: '/',
    name: 'root',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'home',
      component: HomePage,
    }],
  },
  {
    path: '/login',
    name: 'login',
    component: LayoutAuth,
    children: [{
      path: '',
      name: 'login-page',
      component: Login,
    }],
  },
  {
    path: '/about',
    name: 'about',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'about-page',
      component: About,
    }],
  },
  {
    path: '/:path(.*)',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
