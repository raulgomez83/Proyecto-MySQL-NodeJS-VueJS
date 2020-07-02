<template>
  <div class="menu">
    <nav class="links">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Presentations' }">Presentations</router-link>
      <router-link :to="{ name: 'Profile' }" v-show="seeUserButtonProfile">Profile</router-link>
      <router-link :to="{ name: 'Login' }" v-show="!seeUserButton">Login</router-link>
      <router-link :to="{ name: 'Register' }" v-show="!seeUserButton">Sign Up</router-link>
      <router-link :to="{ name: 'Admin' }" v-show="seeAdmin">Administrator</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </nav>
    <div class="extra">
      <button @click="logOutUser()" v-show="seeUserButton || seeAdmin">Logout</button>
      <button @click="darkEvent()">🌓</button>
    </div>
  </div>
</template>

<script>
import {
  logOut,
  showUserButton,
  showAdminButton,
  isLoggin
} from "../api/helpers";

export default {
  name: "themenu",
  data() {
    return {
      seeUserButton: false,
      seeUserButtonProfile: false,
      seeAdmin: false
    };
  },
  methods: {
    logOutUser() {
      logOut();
      this.$router.push("/login");
    },
    showUserButtonIn() {
      this.seeUserButton = isLoggin();
    },
    showAdminButtonInMenu() {
      this.seeAdmin = showAdminButton();
    },
    showUserButtonProfile() {
      this.seeUserButtonProfile = showUserButton();
    },
    darkEvent() {
      this.$emit("dark");
    }
  },
  created() {
    this.showUserButtonIn();
    this.showAdminButtonInMenu();
    this.showUserButtonProfile();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--dark);
  font-size: 2rem;
  margin: 1rem;
  font-weight: bold;
}
a.router-link-exact-active {
  color: var(--gold);
}
.menu {
  background: var(--lightBlue);
  display: flex;
  justify-content: space-between;
  z-index: 10;
  width: 100%;
}
.links {
  display: flex;
  justify-content: center;
}

button {
  margin: 1rem;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0);
  color: var(--dark);
  border: none;
  width: 6rem;
}
</style>
