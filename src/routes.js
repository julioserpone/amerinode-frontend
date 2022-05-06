import { createRouter, createWebHistory } from 'vue-router'

const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LayoutAdmin = () => import('@/layouts/LayoutAdmin.vue');

const HomePage = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Login = () => import('@/views/Auth/Login.vue');

const routes = [
  {
    path: '/',
    name: 'Root',
    component: LayoutAdmin,
    children: [{
      path: '',
      name: 'Home',
      component: HomePage,
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
    }],
  },
  {
    path: '/:path(.*)',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
