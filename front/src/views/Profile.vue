<template>
  <div>
    <vue-headful
      title="Profile"
      description="Profile page of the application.Only users"
    /><themenu></themenu>
    <div>
      <div class="welcome">
        <h2>Welcome {{ user.username }}</h2>
        <img :src="user.avatar" alt="user picture" />
      </div>
      <div v-show="!seeEdit">
        <ul class="userdata">
          <li class="name">{{ user.firstname }}</li>
          <li class="surname">{{ user.surname }}</li>
          <li class="date">{{ user.birthdate }}</li>
          <li class="mail">{{ user.email }}</li>
        </ul>
      </div>
      <!-- <presentations :presentations="presentations"></presentations> -->
      <div class="buttons">
        <button @click="userShowEditText()">Update your profile</button>
        <button @click="presentationShowUpload()">Upload a Presentation</button>
        <button @click="userShowEditPassword()">Update your Password</button>
        <button @click="disableUser()">Disable you</button>
      </div>
    </div>
    <div class="edit" v-show="seeEdit">
      <p>UPDATE</p>
      <input type="text" v-model="newFirstname" placeholder="Firstname" />
      <input type="text" v-model="newSurname" placeholder="Surname" />
      <input type="date" v-model="newBirthdate" />
      <input type="text" v-model="newEmail" placeholder="Email" />
      <input type="file" />
      <br />
      <button @click="updateUser()">Update</button>
      <button @click="seeEdit = false">Back to profile</button>
    </div>
    <div class="password" v-show="seeEditPassword">
      <input
        type="text"
        v-model="oldPassword"
        placeholder="Your old password"
      />
      <input type="text" v-model="password" placeholder="New password" />
      <input
        type="text"
        v-model="passwordRepeat"
        placeholder="Repeat your new Paswword"
      />
      <button @click="updatePassword()">Update Password</button>
    </div>
    <div class="newPresentation" v-show="seePresentationUpload">
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
              <input
                type="text"
                name="category"
                id="category"
                v-model="category"
              />
            </li>
            <li>
              <label for="language">Language:</label>
              <br />
              <input
                type="text"
                name="language"
                id="language"
                v-model="language"
              />
            </li>
            <li>
              <label for="video">Video:</label>
              <br />
              <input type="url" name="video" id="video" v-model="video" />
            </li>
          </ul>
        </fieldset>
      </form>
      <button @click="createPresentation()">Upload</button>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import { logOut } from "../api/helpers";
import presentations from "../components/presentations";
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";

export default {
  name: "Profile",
  components: { thefooter, themenu, presentations },
  data() {
    return {
      /*  presentations: [], */
      title: "",
      date: "",
      event: "",
      city: "",
      category: "",
      language: "",
      video: "",
      user: {},
      seeEdit: false,
      newFirstname: "",
      newSurname: "",
      newBirthdate: null,
      newEmail: "",
      oldPassword: "",
      password: "",
      passwordRepeat: "",
      seePresentationUpload: false,
      seeEditPresentation: false,
      seeEditPassword: false,
      correctData: false,
      require: false,
    };
  },
  methods: {
    dataUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3004/user/" + data)
        .then(function(response) {
          const img = response.data.data.avatar;
          self.user = response.data.data;
          self.user.avatar = "http://localhost:3004/uploads/" + img;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    updateUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3004/user/" + data, {
          firstname: self.newFirstname,
          surname: self.newSurname,
          birthdate: self.newBirthdate,
          email: self.newEmail,
        })
        .then(function(response) {
          self.seeEdit = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    userShowEditText() {
      this.seeEdit = true;
      this.newFirstname = this.user.firstname;
      this.newSurname = this.user.surname;
      this.newBirthdate = this.user.newBirthday;
      this.newEmail = this.user.email;
    },
    userShowEditPassword() {
      this.seeEditPassword = true;
      this.password = "";
      this.passwordRepeat = "";
    },
    updatePassword() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3004/user/password/" + data, {
          oldPassword: self.oldPassword,
          newPassword: self.password,
          newPasswordRepeat: self.passwordRepeat,
        })
        .then(function(response) {
          self.seeEditPassword = false;
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    disableUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return logOut();
      axios
        .put("http://localhost:3004/user/disable/" + data)
        .then(function(response) {
          self.$router.push("/");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    showHistories() {},
    presentationShowUpload() {
      this.seePresentationUpload = true;
    },
    createPresentation() {
      this.validatingData();
      if (this.correctData === true) {
        var self = this;

        axios
          .post("http://localhost:3004/presentation", {
            title: self.title,
            presentation_date: self.date,
            presentation_event: self.event,
            city: self.city,
            category: self.category,
            presentation_language: self.language,
            video: self.video,
          })
          .then(function(response) {
            self.emptyFields();
            self.seePresentationUpload = false;
            console.log(response);
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        alert("Some field is empty");
      }
    },
    validatingData() {
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
    emptyFields() {
      this.title = "";
      this.date = "";
      this.event = "";
      this.category = "";
      this.language = "";
      this.video = "";
    },
    showPresentations() {},
    updatePresentation() {
      var self = this;
      axios
        .post("http://localhost:3004/presentation", {
          title: self.title,
          date: self.date,
          event: self.event,
          city: self.city,
          category: self.category,
          language: self.language,
          video: self.video,
        })
        .then(function(response) {
          this.seePresentation = true;
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
  created() {
    this.dataUser();
  },
};
</script>

<style scoped>
img {
  max-width: 10rem;
}
</style>
