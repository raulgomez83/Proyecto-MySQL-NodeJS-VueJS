<template>
  <div>
    <vue-headful title="Profile" description="Profile page of the application.Only users" />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <header>
      <div class="welcome">
        <h2>Welcome: {{ user.username }}</h2>
        <img :src="user.avatar" alt="user picture" />
      </div>
      <div class="buttons">
        <button @click="userShowEditText()">Update your Profile</button>
        <button @click="userShowEditPassword()">Update your Password</button>
        <button @click="showCreatePresentation()">Upload a Presentation</button>
        <button @click="disableUser()">Unsubscribe</button>
      </div>
    </header>
    <div id="presentationHistory" class="box" v-show="seeHistory">
      <h2 class="yourPresentations">Your presentations</h2>
      <div class="history" v-for="history in histories" :key="history.id">
        <h3>{{ history.title }}</h3>
        <div class="button">
          <button @click="dataEditPresentation(history)">Update</button>
          <button @click="deletePresentation(history)">Delete</button>
        </div>
      </div>
    </div>
    <div class="modal" v-show="seeEdit">
      <div class="modalBox">
        <input type="text" v-model="newFirstname" placeholder="Firstname" />
        <input type="text" v-model="newSurname" placeholder="Surname" />
        <input type="text" v-model="newEmail" placeholder="Email" />
        <br />
        <button @click="updateUser()">Update</button>
        <br />
        <div class="editAvatar">
          <label>If you you want update your avatar</label>
          <input type="file" id="avatar" ref="avatar" @change="handleFileUpload()" />
          <br />
          <button @click="submitFile()">Update Avatar</button>
        </div>
        <button @click="seeEdit = false">Back to profile</button>
      </div>
    </div>
    <div class="modal" v-show="seeEditPassword">
      <div class="modalBox">
        <input type="password" v-model="oldPassword" placeholder="Your old password" />
        <input type="password" v-model="password" placeholder="New password" />
        <input type="password" v-model="passwordRepeat" placeholder="Repeat your new Paswword" />
        <br />
        <button @click="updatePassword()">Update</button>
        <button @click="seeEditPassword = false">Back to profile</button>
      </div>
    </div>
    <div class="modal" v-show="seeCreationPresentation">
      <div class="modalBox">
        <form>
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
        </form>
        <button @click="createNewPresentation()">Upload</button>
        <button @click="seeCreationPresentation = false">Back to profile</button>
      </div>
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
    <thefooter class="footer"></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import { formatDateToDB, showNotHistory } from "../api/helpers";
import { server } from "../api/helpers";

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
      seeHistory: true,
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
      presentation_id: "",
      avatar: ""
    };
  },
  methods: {
    //INITIAL VIEWS FUNCTIONS
    dataUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "user/" + data)
        .then(function(response) {
          const img = response.data.data.avatar;
          self.user = response.data.data;
          if (!!!self.user.avatar) {
            self.user.avatar = server + "uploads/" + "perfil.png";
          } else {
            self.user.avatar = server + "uploads/" + img;
          }
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    userPresentations() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(server + "user/historypresentations/" + data)
        .then(function(response) {
          self.histories = response.data.data;
          if (self.histories.length === 0) {
            const el = document.querySelector(".yourPresentations");
            el.textContent = "You have not upload any presentation yet.";
          }
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    //UPDATE FUNCTIONS
    updateUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put(server + "user/" + data, {
          firstname: self.newFirstname,
          surname: self.newSurname,
          email: self.newEmail
        })
        .then(function(response) {
          self.seeEdit = true;
          Swal.fire(response.data.message);
          location.reload();
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    updatePassword() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put(server + "user/password/" + data, {
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
          Swal.fire(error.response.data.message);
        });
    },
    submitFile() {
      const self = this;
      //enviar el archivo al servidor
      const data = localStorage.getItem("id");
      let formData = new FormData(); //iniciamos el form data
      formData.append("avatar", self.avatar);
      formData.append("firstname", self.user.firstname);
      formData.append("surname", self.user.surname);
      formData.append("email", self.user.email); // añadimos el form data que queremos enviar
      axios
        .put(server + "user/" + data, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          Swal.fire("Your avatar was upload");
          location.reload();
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    //////////////////////////////////////
    disableUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unsubscribe me!"
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
          Swal.fire("Deleted!", "Now you are unsubscribed, we will miss you");
        }
      });
    },
    //PRESENTATIONS FUNCTIONS
    createNewPresentation() {
      this.validatingDataPresentation();
      var self = this;
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
            title: "Congratulations, You have upload a presentation"
          });
          self.emptyFieldsPresentations();
          self.seeCreationPresentation = false;
          location.reload();
        })
        .catch(function(error) {
          Swal.fire(error.response.data.message);
        });
    },
    deletePresentation(history) {
      const self = this;
      const idPresentation = history.presentation_id;
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
            .delete(server + "presentation/" + idPresentation)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              Swal.fire(error.response.data.message);
            });
          Swal.fire("Deleted!", "The presentation has been deleted.");
        }
      });
    },
    updatePresentation() {
      var self = this;
      const idPresentation = self.presentation_id;
      const idToken = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

    //AUXILIARY FUNCTIONS
    userShowEditText() {
      this.seeEdit = true;
      this.newFirstname = this.user.firstname;
      this.newSurname = this.user.surname;
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
      console.log(history);

      this.seeEditPresentation = true;
      this.newTitle = history.title;
      this.newEvent = history.presentation_event;
      this.newCity = history.city;
      this.newCategory = history.category;
      this.newLanguage = history.presentation_language;
      this.newVideo = history.video;
      this.newDatePresentation = history.presentation_date;
      this.presentation_id = history.presentation_id;
    },
    handleFileUpload() {
      this.avatar = this.$refs.avatar.files[0];
    },
    darkMode() {
      document.body.classList.toggle("dark");
    }
  },
  created() {
    this.dataUser();
    this.userPresentations();
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem auto;
}
.welcome {
  border: 5px solid var(--gold);
  box-shadow: 10px 7px 10px var(--blue);
  padding: 4rem;
}
.welcome img {
  width: 10rem;
  margin: 1rem;
}

.buttons button {
  height: 10rem;
  margin: 2rem;
  width: 20rem;
  -webkit-box-reflect: below -50px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
}
.buttons button:hover {
  background-color: var(--gold);
  color: var(--blue);
  transition-duration: 1000;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem;
}
.update {
  display: flex;
  flex-direction: column;
}
h2 {
  padding: 1rem;
  margin: 1rem 0 3rem;
}
#presentationHistory {
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
}
.presentationHistory li {
  font-size: 2rem;
  color: var(--light);
}
.modal li {
  font-size: 1.5rem;
  line-height: 5px;
}
.editAvatar input {
  width: 15rem;
  font-size: 1rem;
}
.history {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 5rem;
}
</style>
