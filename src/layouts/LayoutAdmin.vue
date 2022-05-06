<template>
  <div class="row">
    <div class="column">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutAdmin',
  components: {

  },
  created () { console.log('created: layout admin static') },
  destroyed () { console.log('destroyed: layout admin static') }
}
</script>
