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
        <li v-for="user in users" :key="user.id" class="boxusers">
          <h3>{{user.username}}</h3>
          <p>ID user: {{user.user_id}}</p>
          <p>{{user.email}}</p>
          <p>{{user.date_account_creation }}</p>
          <button>Delete</button>
        </li>
      </ul>
    </div>
    <div class="presentations">
      <h2>All presentations</h2>
      <ul>
        <li v-for="presentation in presentations" :key="presentation.id" class="boxpresentations">
          <h3>{{ presentation.title }}</h3>
          <p>ID presentation: {{ presentation.presentation_id}}</p>
          <p>Rating {{ presentation.rating }}</p>
          <p>views: {{ presentation.totalviews}}</p>
          <p>ID user:{{ presentation.user_id }}</p>
          <button>Delete</button>
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
    deleteUser() {},
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

    listAllVotes() {
      const self = this;
      const server = "http://localhost:3004/";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "ratings")
        .then(function(response) {
          console.log(response);
          self.ratings = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },

  created() {
    this.listAllUsers();
    this.listAllPresentations();
    this.listAllVotes();
  }
};
</script>

<style></style>
