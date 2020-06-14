<template>
  <div>
    <vue-headful
      title="Register"
      description="Register page of the application"
    />
    <form>
      <fieldset>
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
      </fieldset>
      <button
        @click="
          newUser(firstname, surname, email, birthdate, username, password)
        "
      >
        Crear
      </button>
    </form>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
import axios from "axios";
export default {
  name: "Register",
  components: { thefooter },
  data() {
    return {
      firstname: "",
      surname: "",
      email: "",
      birthdate: "",
      username: "",
      password: "",
    };
  },
  methods: {
    newUser(firstname, surname, email, birthdate, username, password) {
      var self = this;
      axios
        .post("http://localhost:3004/user", {
          firstname: self.firstname,
          surname: self.surname,
          email: self.email,
          birthdate: self.birthdate,
          username: self.username,
          user_password: self.password,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
