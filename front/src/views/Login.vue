<template>
  <div>
    <vue-headful title="Login" description="Login page of the application" />
    <div class="login">
      <fieldset>
        <h2>Login</h2>
        <form>
          <input type="username" placeholder="Username" v-model="username" />
          <br />
          <input type="password" placeholder="password" v-model="password" />
          <br />
          <button>Login</button>
          <p>
            If already you are not register click
            <router-link :to="{ name: 'Register' }">Here.</router-link>
          </p>
        </form>
      </fieldset>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
export default {
  name: "Login",
  components: { thefooter },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {},
    recoveryPassword() {},
    activeUser() {},
  },
};
</script>

<style></style>
