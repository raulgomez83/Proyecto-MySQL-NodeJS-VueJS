<template>
  <div class="admin">
    <vue-headful
      title="Administration"
      description="Administration page of the application.Only for admin"
    />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <div class="buttons" v-show="seeButtons">
      <button @click="showPresentations()">Presentations</button>
      <button @click="showUsers()">Users</button>
    </div>
    <div class="presentations" v-show="seePresentations">
      <h2>All presentations</h2>
      <button v-show="seePresentations" @click="comeBack()">Back</button>
      <form>
        <label for="input">Search by ID:</label>
        <input
          type="search"
          id="searchplace"
          name="search"
          placeholder="Search the presentation..."
          size="50"
          v-model="search"
        />
      </form>
      <ul>
        <li
          v-for="(presentation, index) in filteredPresentations"
          :key="presentation.id"
          class="box"
        >
          <h3>{{ presentation.title }}</h3>
          <p>
            ID presentation:
            <b>{{ presentation.presentation_id }}</b>
          </p>
          <p>Rating: {{ presentation.rating }}</p>
          <p>views: {{ presentation.totalviews }}</p>
          <p>
            User Loader ID:
            <b>{{ presentation.user_id }}</b>
          </p>
          <button @click="dataEditPresentation(index)">Update</button>
          <button @click="deletePresentation(index)">Delete</button>
        </li>
      </ul>
    </div>
    <div class="modal" v-show="seeEditPresentation">
      <div class="modalBox">
        <input type="text" v-model="newTitle" placeholder="title" />
        <input type="date" v-model="newDatePresentation" />
        <input type="text" v-model="newCategory" placeholder="category" />
        <input type="text" v-model="newCity" placeholder="city" />
        <input type="text" v-model="newEvent" placeholder="event" />
        <input type="text" v-model="newLanguage" placeholder="language" />
        <input type="url" v-model="newVideo" placeholder="video" />
        <br />
        <button @click="updatePresentation()">Update</button>
        <button @click="seeEditPresentation = false">Back to presentation</button>
      </div>
    </div>
    <div class="users" v-show="seeUsers">
      <h2>All users</h2>
      <button v-show="seeUsers" @click="comeBack()">Back</button>
      <form>
        <label for="input">Search by ID:</label>
        <input
          type="search"
          id="searchplace"
          name="search"
          placeholder="Search the user..."
          size="50"
          v-model="search"
        />
      </form>
      <ul>
        <li v-for="(user, index) in filteredUsers" :key="user.id" class="box">
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
import { server, token } from "../api/helpers";
import { validateToken } from "../api/helpers";

export default {
  data() {
    return {
      users: [],
      presentations: [],
      presentation: {},
      ratings: [],
      seePresentations: false,
      seeUsers: false,
      seeButtons: true,
      seeEditPresentation: false,
      newTitle: "",
      newDatePresentation: null,
      newEvent: "",
      newVideo: "",
      newCategory: "",
      newCity: "",
      newLanguage: "",
      search: ""
    };
  },
  name: "Admin",
  components: { thefooter, themenu },
  computed: {
    filteredPresentations() {
      if (this.search === "") {
        return this.presentations;
      }
      return this.presentations.filter(presentation =>
        presentation.presentation_id.toString().includes(this.search)
      );
    },
    filteredUsers() {
      if (this.search === "") {
        return this.users;
      }
      return this.users.filter(user =>
        user.user_id.toString().includes(this.search)
      );
    }
  },
  methods: {
    listAllUsers() {
      const self = this;
      validateToken();
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
      validateToken();
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
        .get(server + "presentations")
        .then(function(response) {
          self.presentations = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    updatePresentation() {
      const self = this;
      const idPresentation = self.presentation.presentation_id;
      validateToken();
      axios
        .put(server + "presentation/" + idPresentation, {
          title: self.newTitle,
          presentation_date: self.newDatePresentation,
          presentation_event: self.newEvent,
          city: self.newCity,
          category: self.newCategory,
          presentation_language: self.newLanguage,
          video: self.newVideo
        })
        .then(function(response) {
          self.seeEditPresentation = false;
          Swal.fire({
            title: "Your presentation has been updated"
          });
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    dataEditPresentation(index) {
      this.presentation = this.presentations[index];
      this.seeEditPresentation = true;
      this.newTitle = this.presentation.title;
      this.newEvent = this.presentation.presentation_event;
      this.newCity = this.presentation.city;
      this.newCategory = this.presentation.category;
      this.newLanguage = this.presentation.presentation_language;
      this.newVideo = this.presentation.video;
      this.newDatePresentation = this.presentation.presentation_date;
      this.presentation_id = this.presentation.presentation_id;
    },
    deletePresentation(index) {
      const self = this;
      const id = self.presentations[index].presentation_id;
      validateToken();
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
            .delete(server + "presentation/" + id)
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
    showPresentations() {
      this.seePresentations = true;
      this.seeButtons = false;
      const el = document.querySelector(".admin");
      el.style.background = "var(--light)";
    },
    showUsers() {
      this.seeUsers = true;
      this.seeButtons = false;
      const el = document.querySelector(".admin");
      el.style.background = "var(--light)";
    },
    comeBack() {
      location.reload();
    },
    darkMode() {
      document.body.classList.toggle("dark");
    }
  },

  created() {
    this.listAllUsers();
    this.listAllPresentations();
  }
};
</script>

<style scoped>
.admin {
  background-image: url("../assets/admin.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15rem auto;
  opacity: 0.8;
}
.admin .buttons button {
  font-size: 4rem;
  padding: 3rem;
  height: 20rem;
  width: 30vw;
  -webkit-box-reflect: below -50px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
}

.box {
  background-color: rgba(234, 193, 2, 0.3);
  border: 2px solid var(--blue);
  margin: 1rem auto;
  box-shadow: 2px 2px 2px var(--dark);
  width: 20rem;
}
p {
  font-size: 1.3rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
ul li {
  padding: 1rem;
}
.admin form {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
label {
  font-size: 2rem;
}
input {
  padding: 0.5rem;
  font-size: 1.3rem;
  width: 20rem;
}
</style>
