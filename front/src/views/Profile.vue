<template>
  <div>
    <vue-headful title="Profile" description="Profile page of the application.Only users" />
    <themenu></themenu>
    <div>
      <div class="welcome">
        <h2>Welcome {{ user.username }}</h2>
        <img :src="user.avatar" alt="user picture" />
      </div>
      <div>
        <ul class="userdata">
          <li class="name">{{ user.firstname }}</li>
          <li class="surname">{{ user.surname }}</li>
          <li class="date">{{ user.birthdate }}</li>
          <li class="mail">{{ user.email }}</li>
        </ul>
      </div>
      <div class="presentationHistory">
        <ul v-for="history in histories" :key="history.id">
          <li>{{ history.title }}</li>
          <button @click="deletePresentation(history)">Delete</button>
          <button @click="dataEditPresentation(history)">Update</button>
        </ul>
      </div>
      <div class="buttons">
        <button @click="userShowEditText()">Update your profile</button>
        <button @click="showCreatePresentation()">Upload a Presentation</button>
        <button @click="userShowEditPassword()">Update your Password</button>
        <button @click="disableUser()">Disable you</button>
      </div>
    </div>
    <div class="edit" v-show="seeEdit">
      <p>UPDATE</p>
      <input type="text" v-model="newFirstname" placeholder="Firstname" />
      <input type="text" v-model="newSurname" placeholder="Surname" />
      <input type="text" v-model="newBirthdate" placeholder="YYYY/MM/DD" />
      <input type="text" v-model="newEmail" placeholder="Email" />
      <input type="file" />
      <br />
      <button @click="updateUser()">Update</button>
      <button @click="seeEdit = false">Back to profile</button>
    </div>
    <div class="password" v-show="seeEditPassword">
      <input type="password" v-model="oldPassword" placeholder="Your old password" />
      <input type="password" v-model="password" placeholder="New password" />
      <input type="password" v-model="passwordRepeat" placeholder="Repeat your new Paswword" />
      <br />
      <button @click="updatePassword()">Update</button>
      <button @click="seeEditPassword = false">Back to profile</button>
    </div>
    <div class="newPresentation" v-show="seeCreationPresentation">
      <h1>Upload your presentation</h1>
      <form>
        <fieldset>
          <ul>
            <li>
              <label for="title">Title:</label>
              <br />
              <input type="text" name="title" id="title" v-model="title" />
            </li>
            <li>
              <label for="date">Date:</label>
              <br />
              <input type="date" name="date" id="date" v-model="date" />
            </li>
            <li>
              <label for="event">Event:</label>
              <br />
              <input type="text" name="event" id="event" v-model="event" />
            </li>
            <li>
              <label for="city">City:</label>
              <br />
              <input type="text" name="city" id="city" v-model="city" />
            </li>
            <li>
              <label for="category">Category:</label>
              <br />
              <input type="text" name="category" id="category" v-model="category" />
            </li>
            <li>
              <label for="language">Language:</label>
              <br />
              <input type="text" name="language" id="language" v-model="language" />
            </li>
            <li>
              <label for="video">Video:</label>
              <br />
              <input type="url" name="video" id="video" v-model="video" />
            </li>
          </ul>
        </fieldset>
      </form>
      <button @click="createNewPresentation()">Upload</button>
      <button @click="seeCreationPresentation = false">Back to profile</button>
    </div>
    <div class="edit" v-show="seeEditPresentation">
      <p>UPDATE</p>
      <fieldset>
        <input type="text" v-model="newTitle" placeholder="title" />
        <input type="date" v-model="newDatePresentation" />
        <input type="text" v-model="newCategory" placeholder="category" />
        <input type="text" v-model="newCity" placeholder="city" />
        <input type="text" v-model="newEvent" placeholder="event" />
        <input type="text" v-model="newLanguage" placeholder="language" />
        <input type="url" v-model="newVideo" placeholder="video" />
      </fieldset>
      <button @click="updatePresentation()">Update</button>
      <button @click="seeEditPresentation = false">Back to presentation</button>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import { formatDateToDB } from "../api/helpers";

import thefooter from "../components/thefooter";
import themenu from "../components/themenu";

export default {
  name: "Profile",
  components: { thefooter, themenu },
  data() {
    return {
      title: "",
      date: "",
      event: "",
      city: "",
      category: "",
      language: "",
      video: "",
      user: {},
      histories: [],
      ratings: [],
      seeEdit: false,
      newFirstname: "",
      newSurname: "",
      newBirthdate: null,
      newEmail: "",
      oldPassword: "",
      password: "",
      passwordRepeat: "",
      seeCreationPresentation: false,
      seeEditPassword: false,
      seeEditPresentation: false,
      correctData: false,
      require: false,
      id: null,
      newTitle: "",
      newDatePresentation: null,
      newEvent: "",
      newVideo: "",
      newCategory: "",
      newCity: "",
      newLanguage: "",
      presentation_id: ""
    };
  },
  methods: {
    //INITIAL VIEWS FUNCTIONS
    dataUser() {
      const self = this;
      const server = "http://localhost:3004/";
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "user/" + data)
        .then(function(response) {
          const img = response.data.data.avatar;
          self.user = response.data.data;
          self.user.avatar = server + "uploads/" + img;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    userPresentations() {
      const self = this;
      const server = "http://localhost:3004/";
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get(server + "user/historypresentations/" + data)
        .then(function(response) {
          self.histories = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.error);
        });
    },
    //UPDATE FUNCTIONS
    updateUser() {
      const self = this;
      const server = "http://localhost:3004/";
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put(server + "user/" + data, {
          firstname: self.newFirstname,
          surname: self.newSurname,
          birthdate: self.newBirthdate,
          email: self.newEmail
        })
        .then(function(response) {
          self.seeEdit = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    updatePassword() {
      const self = this;
      const server = "http://localhost:3004/";
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put(server + "/user/password/" + data, {
          oldPassword: self.oldPassword,
          newPassword: self.password,
          newPasswordRepeat: self.passwordRepeat
        })
        .then(function(response) {
          Swal.fire({
            title: "Your password has been updated"
          });
          self.emptyFiledsPassword();
          self.seeEditPassword = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    //////////////////////////////////////
    disableUser() {
      const self = this;
      const server = "http://localhost:3004/";
      const data = localStorage.getItem("id");
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
            .put(server + "user/disable/" + data)
            .then(function(response) {
              localStorage.removeItem("id");
              localStorage.removeItem("username");
              localStorage.removeItem("role");
              localStorage.removeItem("token");
              axios.defaults.headers.common["Authorization"] = "";
              self.$router.push("/");
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire("Deleted!", "Your presentation has been deleted.");
        }
      });
    },
    //PRESENTATIONS FUNCTIONS
    createNewPresentation() {
      this.validatingDataPresentation();
      var self = this;
      const server = "http://localhost:3004/";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(server + "presentation", {
          title: self.title,
          presentation_date: self.date,
          presentation_event: self.event,
          city: self.city,
          category: self.category,
          presentation_language: self.language,
          video: self.video
        })
        .then(function(response) {
          Swal.fire({
            title: "Congratulations,you upload a presentation"
          });
          self.emptyFieldsPresentations();
          self.seeCreationPresentation = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deletePresentation(history) {
      const self = this;
      const idPresentation = history.presentation_id;
      const idToken = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const server = "http://localhost:3004";
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
            .delete(server + "/presentation/" + idPresentation)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire(
            "Disable!",
            "Your user has been disabled.",
            "If you want to be able, login again"
          );
        }
      });
    },
    updatePresentation() {
      var self = this;
      const idPresentation = self.presentation_id;
      const idToken = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const server = "http://localhost:3004";
      axios
        .put(server + "/presentation/" + idPresentation, {
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
          console.error(error.response.data.message);
        });
    },

    //AUXILIAR FUNCTIONS
    userShowEditText() {
      this.seeEdit = true;
      this.newFirstname = this.user.firstname;
      this.newSurname = this.user.surname;
      this.newBirthdate = this.user.birthdate;
      this.newEmail = this.user.email;
    },
    userShowEditPassword() {
      this.seeEditPassword = true;
      this.password = "";
      this.passwordRepeat = "";
    },
    validatingDataPresentation() {
      if (
        this.title === "" ||
        this.date === "" ||
        this.event === "" ||
        this.category === "" ||
        this.language === "" ||
        this.video === ""
      ) {
        this.correctData = false;
        this.require = true;
      } else {
        this.correctData = true;
        this.require = false;
      }
    },
    emptyFieldsPresentations() {
      this.title = "";
      this.date = "";
      this.event = "";
      this.category = "";
      this.language = "";
      this.video = "";
    },
    emptyFiledsPassword() {
      this.oldPassword = "";
    },
    showCreatePresentation() {
      this.seeCreationPresentation = true;
    },
    dataEditPresentation(history) {
      this.seeEditPresentation = true;
      this.newTitle = history.title;
      this.newEvent = history.presentation_event;
      this.newCity = history.city;
      this.newCategory = history.category;
      this.newLanguage = history.presentation_language;
      this.newVideo = history.video;
      this.newDatePresentation = history.presentation_date;
      this.presentation_id = history.presentation_id;
    }
  },
  created() {
    this.dataUser();
    this.userPresentations();
  }
};
</script>

<style scoped>
img {
  max-width: 10rem;
}
</style>
