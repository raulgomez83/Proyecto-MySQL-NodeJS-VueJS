<template>
  <div class="login">
    <vue-headful title="Login" description="Login page of the application" />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <fieldset>
      <div class="up">
        <h2>Login</h2>
        <form>
          <input type="username" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <br />
        </form>
        <button @click="login(username, password)">Login</button>
      </div>
      <p class="enjoy">
        Are you not register already? Click
        <router-link :to="{ name: 'Register' }">Enjoy Us.</router-link>
      </p>
      <p>Did you make a big mistake and unsubscribed yourself? Don't worry!</p>
      <button @click="showReactivateUser()">Come back with us</button>
      <p>Have you forgot your password? It happens!</p>
      <button @click="showRecoverPassword()">Recover it</button>
    </fieldset>
    <div class="modal" v-show="seeReactivateAccount">
      <button class="cerrar" @click="closeReactivate()">x</button>
      <fieldset class="modalBox">
        <form>
          <h2>Reactivate your account</h2>
          <input type="text" placeholder="username" v-model="usernameRecover" />
          <br />
          <input type="password" placeholder="password" v-model="passwordRecover" />
        </form>
        <button @click="reactivateUser()">Recover</button>
      </fieldset>
    </div>
    <div class="modal" v-show="seeRecoverPassword">
      <button class="cerrar" @click="closeRecover()">x</button>
      <fieldset class="modalBox">
        <form>
          <label for="text">Give us your email if you don't forgot it</label>
          <input type="email" placeholder="Write your email..." v-model="email" />
        </form>
        <button @click="recoverPassword()">Send</button>
      </fieldset>
    </div>
    <thefooter class="footer"></thefooter>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
import { server } from "../api/helpers";
export default {
  name: "Login",
  components: { thefooter, themenu },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      usernameRecover: "",
      passwordRecover: "",
      seeReactivateAccount: false,
      seeRecoverPassword: false
    };
  },
  methods: {
    login(username, password) {
      const self = this;
      axios
        .post(server + "users/login", {
          username: self.username,
          password: self.password
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data.id);
          self.$router.push("/");
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    recoverPassword(email) {
      const self = this;
      axios
        .put(server + "user/recovery", {
          email: self.email
        })
        .then(function(response) {
          Swal.fire("We send you an email to recover your password");
          self.seeRecoverPassword = false;
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    reactivateUser() {
      const self = this;
      axios
        .put(server + "user/reactivate", {
          username: self.usernameRecover,
          password: self.passwordRecover
        })
        .then(function(response) {
          self.seeReactivateAccount = false;
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    /////////////////AUXILIARY FUNCTIONS///////////////
    showRecoverPassword() {
      this.seeRecoverPassword = true;
    },
    showReactivateUser() {
      this.seeReactivateAccount = true;
    },
    closeRecover() {
      this.seeRecoverPassword = false;
    },
    closeReactivate() {
      this.seeReactivateAccount = false;
    },
    darkMode() {
      document.body.classList.toggle("dark");
    }
  }
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
fieldset {
  background: var(--light);
  padding: 1rem;
  opacity: 0.9;
  margin: 5rem auto;
}

h2 {
  font-size: 3rem;
  color: var(--blue);
}

p {
  font-size: 2rem;
}
a {
  color: var(--blue);
}

fieldset form .modalBox {
  margin: 3rem;
}
.footer {
  min-width: 100%;
}
</style>
