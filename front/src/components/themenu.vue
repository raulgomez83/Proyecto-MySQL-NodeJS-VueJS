<template>
  <div>
    <h1>rateIn</h1>
    <nav class="links">
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Sign Up</router-link>
      <router-link :to="{ name: 'Profile' }" v-show="seeProfile">Profile</router-link>
      <router-link :to="{ name: 'Admin' }">Administration</router-link>
      <router-link :to="{ name: 'Presentations' }">Presentations</router-link>
      <button @click="logOutUser()">Logout</button>
    </nav>
  </div>
</template>

<script>
import { logOut, showProfileButton } from "../api/helpers";
export default {
  name: "themenu",
  data() {
    return {
      seeProfile: false
    };
  },
  methods: {
    logOutUser() {
      logOut();
      this.$router.push("/login");
    },
    showProfileButtonInMenu() {
      this.seeProfile = showProfileButton();
    }
  },
  created() {
    this.showProfileButtonInMenu();
  }
};
</script>

<style></style>
