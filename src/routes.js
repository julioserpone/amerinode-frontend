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
    component: () => import('@/views/NotFound.vue'),
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
  let isAuthenticated = (localStorage.getItem('jwt') !== null);
  //console.log(to, from, 'isAuthenticated: '+isAuthenticated)

  if (!isAuthenticated && to.name !== 'LoginPage') { next({ name: 'LoginPage' }) }
  else {
    if (to.name === 'LoginPage' && isAuthenticated) next({ name: 'Home' })
    else next();
  }
})

export default router;