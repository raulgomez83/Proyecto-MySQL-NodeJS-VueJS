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
          <button @click="login(username, password)">Login</button>
          <p>
            Are you not register already? click
            <router-link :to="{ name: 'Register' }">Enjoy Us.</router-link>
          </p>
        </form>
        <p>
          Did you make a big mistake and disable your account? Don't worry
          <button @click="seeRecoverAccount = true">Come back</button>
        </p>
        <p>
          Forgot your password? It happens
          <button @click="showRecoverPassword()">Recover it</button>
        </p>
      </fieldset>
    </div>
    <div class="reactivateAccount" v-show="seeReactivateAccount">
      <fieldset>
        <form>
          <h2>Recovery your account</h2>
          <input type="email" placeholder="email" v-model="email" />
          <br />
          <input type="password" placeholder="password" v-model="password" />
        </form>
        <button @click="reactivateAccount()">Recovery</button>
      </fieldset>
    </div>
    <div class="recoverPassword" v-show="seeRecoverPassword">
      <fieldset>
        <form>
          <label for="text">Give us your email if you don't forgot it </label>
          <input
            type="email"
            placeholder="Write your email..."
            v-model="email"
          />
        </form>
        <button @click="recoverPassword()">Send</button>
      </fieldset>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import thefooter from "../components/thefooter";
export default {
  name: "Login",
  components: { thefooter },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      seeReactivateAccount: false,
      seeRecoverPassword: false,
    };
  },
  methods: {
    login(username, password) {
      const self = this;
      axios
        .post("http://localhost:3004/users/login", {
          username: self.username,
          password: self.password,
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          self.$router.push("/");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    recoverPassword(email, password) {
      const self = this;
      axios
        .put("http://localhost:3004/user/recovery", {
          email: self.email,
        })
        .then(function(response) {
          console.log(response);
          self.seeRecoverPassword = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    showRecoverPassword() {
      this.seeRecoverPassword = true;
    },
    reactiveUser() {},
  },
};
</script>

<style></style>
