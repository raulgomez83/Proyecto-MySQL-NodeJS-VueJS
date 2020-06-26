<template>
  <div class="menu">
    <nav class="links">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Presentations' }">Presentations</router-link>
      <router-link :to="{ name: 'Profile' }" v-show="seeUserButton"
        >Profile</router-link
      >
      <router-link :to="{ name: 'Login' }" v-show="!seeUserButton"
        >Login</router-link
      >
      <router-link :to="{ name: 'Register' }" v-show="!seeUserButton"
        >Sign Up</router-link
      >

      <router-link :to="{ name: 'Admin' }" v-show="seeAdmin"
        >Administrator</router-link
      >
      <router-link :to="{ name: 'About' }">About</router-link>
      <button @click="logOutUser()" v-show="seeAdmin">
        Logout
      </button>
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
      seeAdmin: false,
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
    },
  },
  created() {
    this.showUserButtonIn();
    this.showAdminButtonInMenu();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  background-color: var(--light);
  color: var(--blue);
  font-size: 2rem;
  margin: 1rem;
  font-weight: bold;
}
a.router-link-exact-active {
  color: var(--gold);
}
.menu {
  background: var(--light);
}
.links {
  display: flex;
  justify-content: center;
  margin-right: 5rem;
}

button {
  margin-left: 40rem;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0);
  color: var(--gold);
  border: none;
}
</style>
