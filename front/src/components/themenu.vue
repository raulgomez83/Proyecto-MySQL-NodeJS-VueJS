<template>
  <div>
    <h1>rateIn</h1>
    <nav class="links">
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Sign Up</router-link>
      <router-link :to="{ name: 'Profile' }" v-show="seeUserButton">Profile</router-link>
      <router-link :to="{ name: 'Admin' }" v-show="seeAdmin">Administrator</router-link>
      <router-link :to="{ name: 'Presentations' }">Presentations</router-link>
      <button @click="logOutUser()">Logout</button>
    </nav>
  </div>
</template>

<script>
import { logOut, showUserButton, showAdminButton } from "../api/helpers";
export default {
  name: "themenu",
  data() {
    return {
      seeUserButton: false,
      seeAdmin: false
    };
  },
  methods: {
    logOutUser() {
      logOut();
      this.$router.push("/login");
    },
    showUserButtonIn() {
      this.seeUserButton = showUserButton();
    },
    showAdminButtonInMenu() {
      this.seeAdmin = showAdminButton();
    }
  },
  created() {
    this.showUserButtonIn();
    this.showAdminButtonInMenu();
  }
};
</script>

<style></style>
