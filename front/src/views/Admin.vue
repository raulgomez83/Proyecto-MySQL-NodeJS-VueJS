<template>
  <div>
    <vue-headful
      title="Administration"
      description="Administration page of the application.Only for admin"
    />
    <themenu></themenu>
    <div class="users">
      <h2>All users</h2>
      <ul>
        <li v-for="(user,index) in users" :key="user.id" class="boxusers">
          <h3>{{user.username}}</h3>
          <p>ID user: {{user.user_id}}</p>
          <p>{{user.email}}</p>
          <p>{{user.date_account_creation }}</p>"If you want to be able, login again"
          <button @click="deleteUser(index)">Delete</button>
        </li>
      </ul>
    </div>
    <div class="presentations">
      <h2>All presentations</h2>
      <ul>
        <li
          v-for="(presentation,index) in presentations"
          :key="presentation.id"
          class="boxpresentations"
        >
          <h3>{{ presentation.title }}</h3>
          <p>ID presentation: {{ presentation.presentation_id}}</p>
          <p>Rating {{ presentation.rating }}</p>"If you want to be able, login again"
          <p>views: {{ presentation.totalviews}}</p>
          <p>ID user:{{ presentation.user_id }}</p>
          <button @click="deletePresentation(index)">Delete</button>
        </li>
      </ul>
    </div>
    <div class="ratings">
      <h2>All ratings</h2>
      <ul>
        <li v-for="rating in ratings" :key="rating.id" class="boxratings">
          <h3>ID presentation: {{ rating.presentation_id_ratings}}</h3>
          <p>ID rating:{{ rating.id}}</p>
          <p>Comment: {{ rating.comments }}</p>
          <p>ID user: {{ rating.user_id_ratings }}</p>
          <button>Delete</button>
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

export default {
  data() {
    return {
      users: [],
      presentations: [],
      ratings: []
    };
  },
  name: "Admin",
  components: { thefooter, themenu },
  methods: {
    listAllUsers() {
      const self = this;
      const server = "http://localhost:3004/";
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
      const server = "http://localhost:3004/";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
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
        .get("http://localhost:3004/presentations")
        .then(function(response) {
          self.presentations = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deletePresentation(index) {
      const self = this;
      const server = "http://localhost:3004";
      const id = self.presentations[index].presentation_id;
      console.log(id);

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
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
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
    listAllVotes() {
      const self = this;
      const server = "http://localhost:3004/";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "ratings")
        .then(function(response) {
          self.ratings = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteVote() {}
  },

  created() {
    this.listAllUsers();
    this.listAllPresentations();
    this.listAllVotes();
  }
};
</script>

<style></style>
