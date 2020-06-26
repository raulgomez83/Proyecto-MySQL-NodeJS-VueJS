<template>
  <div>
    <vue-headful
      title="Presentations"
      description="Presentations page of the application"
    />
    <themenu class="menu"></themenu>
    <listpresentations
      :presentations="presentations"
      :presentation="presentation"
      :comments="comments"
      :ratings="ratings"
      :seePresentation="seePresentation"
      :seeContact="seeContact"
      :seeVote="seeVote"
      :seeUserButton="seeUserButton"
      :message="message"
      :comment="comment"
      v-on:see="onePresentationView"
      v-on:go="showPresentation"
      v-on:showcontact="seeContactArea"
      v-on:contact="contactUser"
      v-on:closecontact="closeContactPresentation"
      v-on:showvote="showVotePresentation"
      v-on:closevote="closeVotePresentation"
      v-on:vote="votePresentation"
    ></listpresentations
    ><thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
import listpresentations from "../components/presentations";

export default {
  name: "Presentations",
  components: { thefooter, themenu, listpresentations },
  data() {
    return {
      presentations: [],
      presentation: {},
      comments: [],
      ratings: {},
      seePresentation: false,
      seeContact: false,
      correctData: false,
      require: false,
      message: "",
      seeVote: false,
      seeUserButton: false,
      comment: "",
    };
  },

  methods: {
    getPresentations() {
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
    showPresentation(index) {
      const self = this;
      let id = index.presentation_id;
      axios
        .get("http://localhost:3004/presentation/" + id)
        .then(function(response) {
          console.log(response);

          self.presentation = response.data.data.payload;
          self.comments = response.data.data.resultcomments;
          self.ratings = response.data.data.showTotalRatings;
          self.seePresentation = true;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    votePresentation(
      presentation,
      comment,
      ratingInterest,
      ratingDesign,
      ratingTheme,
      ratingCommunication
    ) {
      var self = this;
      const server = "http://localhost:3004/";
      const id = presentation.id;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(server + "presentation/rating/" + id, {
          score_interest: ratingInterest,
          score_design: ratingDesign,
          score_theme_quality: ratingTheme,
          score_comunication: ratingCommunication,
          comments: comment,
        })
        .then(function(response) {
          Swal.fire({
            title: "You vote properly, thanks for participate",
          });
          location.reload();
        })
        .catch(function(error) {
          Swal.fire({
            title: error.response.data.message,
          });
          console.error(error.response.data.message);
        });
    },
    contactUser(message, presentation) {
      this.validatingData(message);
      if (this.correctData === true) {
        const self = this;
        const id = presentation.id;
        const id_user = presentation.user_id;
        const idToken = Number(localStorage.getItem("id"));
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const server = "http://localhost:3004";
        axios
          .post(server + "/presentation/contact/" + id, {
            message: message,
          })
          .then(function(response) {
            self.emptyFieldMessage();
            self.seeContact = false;
            Swal.fire({
              title: "Your email has been send",
            });
          })
          .catch(function(error) {
            console.error(error.response.data.message);
          });
      } else {
        alert("no has rellenado algún campo");
      }
    },
    seeContactArea() {
      this.seeContact = true;
    },
    closeContactPresentation() {
      this.seeContact = false;
    },
    emptyFieldMessage() {
      this.message = "";
    },
    validatingData(message) {
      if (message === "") {
        this.correctData = false;
        this.require = true;
      } else {
        this.correctData = true;
        this.require = false;
      }
    },
    increaseView(id) {
      const self = this;
      console.log(id);

      axios
        .post("http://localhost:3004'/presentation/view/" + id)
        .then(function(response) {})
        .catch(function(error) {
          console.error(error);
        });
    },
    onePresentationView() {
      this.seePresentation = false;
    },
    showVotePresentation() {
      this.seeVote = true;
    },
    closeVotePresentation() {
      this.seeVote = false;
    },
  },
  created() {
    this.getPresentations();
  },
};
</script>

<style scoped>
.comments {
  border: 1px solid grey;
}
.presentation img {
  width: 15rem;
  border: 1px solid grey;
}
</style>
