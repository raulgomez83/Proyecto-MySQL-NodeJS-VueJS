<template>
  <div>
    <vue-headful title="Presentations" description="Presentations page of the application" />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <listpresentations
      :presentations="presentations"
      :presentation="presentation"
      :comments="comments"
      :ratings="ratings"
      :seePresentation="seePresentation"
      :seeContact="seeContact"
      :seeVote="seeVote"
      :message="message"
      :comment="comment"
      v-on:see="onePresentationView"
      v-on:go="increaseView"
      v-on:showcontact="seeContactArea"
      v-on:contact="contactUser"
      v-on:closecontact="closeContactPresentation"
      v-on:showvote="showVotePresentation"
      v-on:closevote="closeVotePresentation"
      v-on:vote="votePresentation"
    ></listpresentations>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
import listpresentations from "../components/presentations";
import { server } from "../api/helpers";

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
      comment: ""
    };
  },
  methods: {
    getPresentations() {
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
    showPresentation(id) {
      const self = this;
      axios
        .get(server + "presentation/" + id)
        .then(function(response) {
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
      const id = presentation.id;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(server + "presentation/rating/" + id, {
          score_interest: ratingInterest,
          score_design: ratingDesign,
          score_theme_quality: ratingTheme,
          score_comunication: ratingCommunication,
          comments: comment
        })
        .then(function(response) {
          Swal.fire({
            title: "You vote properly, thanks for participate"
          });
          location.reload();
        })
        .catch(function(error) {
          Swal.fire({
            title: error.response.data.message
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
        axios
          .post(server + "presentation/contact/" + id, {
            message: message
          })
          .then(function(response) {
            self.emptyFieldMessage();
            self.seeContact = false;
            Swal.fire({
              title: "Your email has been sent"
            });
          })
          .catch(function(error) {
            Swal.fire(error.response.data.message);
          });
      } else {
        Swal.fire("You would write a message");
      }
    },
    increaseView(index) {
      const self = this;
      let id = index.presentation_id;
      axios
        .post(server + "presentation/view/" + id)
        .then(function(response) {
          self.showPresentation(id);
        })
        .catch(function(error) {
          console.error(error);
        });
    },

    ////////////////////AUXILIARY FUNCTIONS///////////////////
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
    onePresentationView() {
      this.seePresentation = false;
    },
    showVotePresentation() {
      this.seeVote = true;
    },
    closeVotePresentation() {
      this.seeVote = false;
    },
    darkMode() {
      document.body.classList.toggle("dark");
    }
  },
  created() {
    this.getPresentations();
  }
};
</script>

<style scoped></style>
