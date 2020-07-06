<template>
  <div class="reg">
    <vue-headful title="Register" description="Register page of the application" />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <fieldset>
      <form autocomplete="off">
        <ul>
          <h2>Sign Up</h2>
          <li>
            <label for="firstname">Firstname:</label>
            <input type="text" name="firstname" id="firstname" v-model="firstname" />
          </li>
          <li>
            <label for="surname">Surname:</label>
            <input type="text" name="surname" id="surname" v-model="surname" />
          </li>
          <li>
            <label for="birth">Birthdate:</label>
            <input type="date" name="birth" id="birth" v-model="birthdate" />
          </li>
          <li>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" v-model="email" />
          </li>
          <li>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" v-model="username" />
          </li>
          <li>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" v-model="password" />
          </li>
        </ul>
      </form>
      <button
        @click="
          newUser(firstname, surname, email, birthdate, username, password)
        "
      >Register</button>
    </fieldset>
    <thefooter class="footer"></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";

import axios from "axios";
import Swal from "sweetalert2";
import server from "../api/helpers";

export default {
  name: "Register",
  components: { thefooter, themenu },
  data() {
    return {
      firstname: "",
      surname: "",
      email: "",
      birthdate: "",
      username: "",
      password: "",
      correctData: false,
      require: false
    };
  },
  methods: {
    newUser(firstname, surname, email, birthdate, username, password) {
      this.validatingData();
      if (this.correctData === true) {
        const self = this;
        const server = "http://localhost:3004/";
        axios
          .post(server + "user", {
            firstname: self.firstname,
            surname: self.surname,
            email: self.email,
            birthdate: self.birthdate,
            username: self.username,
            user_password: self.password
          })
          .then(function(response) {
            Swal.fire({
              title: "You're register, you can enjoy us",
              text: "Check your email to validate your account",
              confirmButtonText: "OK"
            });
            self.emptyFields();
            self.$router.push("/login");
          })
          .catch(function(error) {
            Swal.fire(error.response.data.message);
          });
      } else {
        Swal.fire("All fields must be written");
      }
    },
    validatingData() {
      if (
        this.firstname === "" ||
        this.surname === "" ||
        this.email === "" ||
        this.birthdate === "" ||
        this.username === "" ||
        this.user_password === ""
      ) {
        this.correctData = false;
        this.require = true;
      } else {
        this.correctData = true;
        this.require = false;
      }
    },
    emptyFields() {
      this.firstname = "";
      this.surname = "";
      this.email = "";
      this.birthdate = "";
      this.username = "";
      this.user_password = "";
    },
    darkMode() {
      document.body.classList.toggle("dark");
    }
  }
};
</script>

<style scoped>
.reg {
  background-image: url("../assets/register.jpg");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
label {
  color: var(--blue);
}

fieldset {
  border: 2px solid var(--blue);
  background-color: var(--light);
  opacity: 0.9;
  padding: 1rem;
  margin: 11rem auto;
  width: 30%;
}

form ul li {
  display: flex;
  flex-direction: column;
  line-height: 1px;
  margin-top: 1rem;
}
button {
  margin-bottom: 2rem;
}
.footer {
  min-width: 100%;
}
</style>
