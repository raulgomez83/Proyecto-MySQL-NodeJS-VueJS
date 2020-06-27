<template>
  <div>
    <vue-headful
      title="Register"
      description="Register page of the application"
    />
    <themenu></themenu>
    <fieldset>
      <form>
        <ul>
          <li>
            <label for="firstname">Firstname:</label>
            <br />
            <input
              type="text"
              name="firstname"
              id="firstname"
              v-model="firstname"
            />
          </li>
          <li>
            <label for="surname">Surname:</label>
            <br />
            <input type="text" name="surname" id="surname" v-model="surname" />
          </li>
          <li>
            <label for="birth">Birthdate:</label>
            <br />
            <input type="date" name="birth" id="birth" v-model="birthdate" />
          </li>
          <li>
            <label for="email">Email:</label>
            <br />
            <input type="email" name="email" id="email" v-model="email" />
          </li>
          <li>
            <label for="username">Username:</label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
            />
          </li>
          <li>
            <label for="password">Password:</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
          </li>
        </ul>
      </form>
      <button
        @click="
          newUser(firstname, surname, email, birthdate, username, password)
        "
      >
        Register
      </button>
    </fieldset>
    <thefooter></thefooter>
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
      require: false,
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
            user_password: self.password,
          })
          .then(function(response) {
            Swal.fire({
              title: "You're register",
              text: "Now, you can enjoy us",
              confirmButtonText: "OK",
            });
            self.emptyFields();
            self.$router.push("/");
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
  },
};
</script>

<style scoped>
label {
  font-size: 1.5rem;
  color: var(--blue);
}
form {
  margin: 2rem;
}
fieldset {
  margin: 3rem;
  border: 2px solid var(--blue);
}
button {
  margin-bottom: 2rem;
}
</style>
