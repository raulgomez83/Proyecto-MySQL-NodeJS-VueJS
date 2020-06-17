<template>
  <div>
    <h1>rateIn</h1>
    <nav class="links">
      <router-link :to="{ name: 'About' }">About </router-link>
      <router-link :to="{ name: 'Home' }">Home </router-link>
      <router-link :to="{ name: 'Login' }">Login </router-link>
      <router-link :to="{ name: 'Register' }">Sign Up </router-link>
      <router-link :to="{ name: 'Profile' }">Profile </router-link>
      <router-link :to="{ name: 'Admin' }">Administartion </router-link>
      <router-link :to="{ name: 'Presentations' }">Presentations </router-link>
    </nav>
  </div>
</template>

<script>
export default { name: "themenu" };
</script>

<style></style>
