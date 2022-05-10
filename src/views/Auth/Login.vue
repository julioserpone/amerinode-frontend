<template>
  <div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
        <div class="mt-1">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="credentials.email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
      </div>

      <div class="space-y-1">
        <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
        <div class="mt-1">
          <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="credentials.password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" v-model="credentials.rememberMe" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
        </div>
      </div>

      <div>
        <LoadingButton :is-loading="isLoading">Prueba de boton</LoadingButton>
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import service from "../../services/login.service.js"
import LoadingButton from "@/components/LoadingButton.vue";
//const isLoading = ref(false);

export default {
  components: {
    LoadingButton

  },
  name: 'auth-login',
  metaInfo: {
    title: 'Login'
  },
  data: () => ({
    isLoading: false,
    errorMessage: null,
    credentials: {
      email: 'superadmin@domain.com', // 'superadmin@domain.com',
      password: '123456', // '123456',
      rememberMe: false
    }
  }),
  methods: {
    onSubmit() {
      this.isLoading = true
      setTimeout(() => this.isLoading = false, 10000)
    },
    login() {
      this.error = false;
      if (this.credentials.email !== '' && this.credentials.password !== '') {
        this.isLoading = true;
        service.login(this.credentials).then(x => {
          localStorage.setItem('jwt', x.data.token);
          localStorage.setItem('user', JSON.stringify(x.data.user));
          let fromNav = localStorage.getItem('url')

          if (fromNav) {
            localStorage.removeItem('url')
            window.location.href = fromNav
          } else {
            this.$router.push({ name: 'home' })
          }
        }).catch(() => {
          this.error = true;
          this.errorMessage = 'Credentials are wrong';
          this.credentials.password = ''
        }).finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        })
      }
    }
  }
}
</script>
