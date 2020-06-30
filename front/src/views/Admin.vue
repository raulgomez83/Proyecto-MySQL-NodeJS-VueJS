<template>
  <div class="admin">
    <vue-headful
      title="Administration"
      description="Administration page of the application.Only for admin"
    />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <div class="presentations">
      <h2>All presentations</h2>
      <ul>
        <li
          v-for="(presentation, index) in presentations"
          :key="presentation.id"
          class="box"
        >
          <h3>{{ presentation.title }}</h3>
          <p>ID presentation: {{ presentation.presentation_id }}</p>
          <p>Rating {{ presentation.rating }}</p>
          "If you want to be able, login again"
          <p>views: {{ presentation.totalviews }}</p>
          <p>ID user:{{ presentation.user_id }}</p>
          <button @click="deletePresentation(index)">Delete</button>
        </li>
      </ul>
    </div>
    <div class="users">
      <h2>All users</h2>
      <ul>
        <li v-for="(user, index) in users" :key="user.id" class="box">
          <h3>{{ user.username }}</h3>
          <p>ID user: {{ user.user_id }}</p>
          <p>{{ user.email }}</p>
          <p>{{ user.date_account_creation }}</p>
          <button @click="deleteUser(index)">Delete</button>
        </li>
      </ul>
    </div>

    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
import { server } from "../api/helpers";

export default {
  data() {
    return {
      users: [],
      presentations: [],
      ratings: [],
    };
  },
  name: "Admin",
  components: { thefooter, themenu },
  methods: {
    listAllUsers() {
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "users")
        .then(function(response) {
          self.users = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteUser(index) {
      const self = this;
      let id = self.users[index].user_id;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(server + "user/delete/" + id)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire("Deleted!", "User has been deleted.");
        }
      });
    },
    listAllPresentations() {
      const self = this;
      axios
        .get(server + "presentations")
        .then(function(response) {
          self.presentations = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deletePresentation(index) {
      const self = this;
      const id = self.presentations[index].presentation_id;
      const idToken = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(server + "/presentation/" + id)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire("Deleted!", "The presentation has been deleted.");
        }
      });
    },
    darkMode() {
      document.body.classList.toggle("dark");
    },
  },

  created() {
    this.listAllUsers();
    this.listAllPresentations();
  },
};
</script>

<style scoped>
.presentations .box {
  background-color: var(--lightBlue);
}
.box {
  border: 2px solid var(--blue);
  margin: 1rem;
  box-shadow: 2px 2px 2px var(--dark);
}

ul {
  display: flex;
  flex-wrap: wrap;
}
</style>
