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
          <button @click="showReactivateUser()">Come back</button>
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
          <h2>Reactivate your account</h2>
          <input type="text" placeholder="username" v-model="usernameRecover" />
          <br />
          <input
            type="password"
            placeholder="password"
            v-model="passwordRecover"
          />
        </form>
        <button @click="reactivateUser()">Recover</button>
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
      usernameRecover: "",
      passwordRecover: "",
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
    recoverPassword(email) {
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
          console.error(error.response.data.message);
        });
    },
    showRecoverPassword() {
      this.seeRecoverPassword = true;
    },
    reactivateUser() {
      const self = this;
      console.log(self.usernameRecover, self.passwordRecover);

      axios
        .put("http://localhost:3004/user/reactivate", {
          username: self.usernameRecover,
          password: self.passwordRecover,
        })
        .then(function(response) {
          console.log("holi");

          console.log(response);
          self.seeReactivateAccount = false;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showReactivateUser() {
      this.seeReactivateAccount = true;
    },
  },
};
</script>

<style></style>
