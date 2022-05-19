<template>
  <div>
    <form @submit.prevent="login" class="space-y-6">
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
          <input id="remember-me" name="remember-me" type="checkbox" v-model="credentials.rememberMe" class="h-4 w-4 text-amerinode-blue-600 focus:ring-amerinode-blue-500 border-gray-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-amerinode-blue-500"> Forgot your password? </a>
        </div>
      </div>

      <div>
        <LoadingButton :is-loading="isLoading" background-color="bg-amerinode-blue-600">Sign in</LoadingButton>
      </div>
    </form>
  </div>
</template>

<script>

import service from "../../services/auth.service.js"
import LoadingButton from "@/components/LoadingButton.vue";
import {notify} from "notiwind";
import {encryptStorage} from "@/services/http.service";

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
    credentials: {
      email: 'superadmin@domain.com', // 'superadmin@domain.com',
      password: '123456', // '123456',
      rememberMe: false
    }
  }),
  methods: {
    login() {
      if (this.credentials.email !== '' && this.credentials.password !== '') {
        this.isLoading = true;
        //Invoke login service
        service.login(this.credentials).then(x => {
          encryptStorage.setItem('jwt', x.data.token);
          encryptStorage.setItem('user', JSON.stringify(x.data.user));
          console.log('token: '+encryptStorage.getItem('jwt'))  //TO-DO: delete this line
          let fromNav = encryptStorage.getItem('url')

          if (fromNav) {
            encryptStorage.removeItem('url')
            window.location.href = fromNav
          } else {
            this.$router.push({ name: 'Home' })
          }
        }).catch(err => {
          if (err.code !== "ERR_NETWORK") {
            notify({
              group: "top",
              title: "Error",
              text: err.response.data.message,
              type: "error"
            }, 5000)
            this.credentials.password = ''
          }
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
