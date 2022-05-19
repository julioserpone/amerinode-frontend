<template>
  <div class="h-screen">
    <div class="h-full bg-white">
      <div class="min-h-full flex">
        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img class="h-15 w-auto" src="../img/amerinode-logo-slogan.png" alt="Amerinode Ecuador" />
              <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <div class="mt-8">
              <div class="mt-6">
                <router-view />
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:block relative w-0 flex-1">
          <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutAuth',
  components: {

  },
};
</script>
