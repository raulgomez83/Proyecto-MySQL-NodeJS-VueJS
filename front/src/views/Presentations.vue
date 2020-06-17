<template>
  <div>
    <vue-headful
      title="Presentations"
      description="Presentations page of the application"
    /><themenu></themenu>
    <listpresentations
      :presentations="presentations"
      :presentation="presentation"
      :comments="comments"
      :seePresentation="seePresentation"
      :id="id"
      v-on:go="showPresentation"
    ></listpresentations>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";

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
      seePresentation: false,
      id: null,
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
      let data = index.presentation_id;
      self.id = data;
      axios
        .get("http://localhost:3004/presentation/" + data)
        .then(function(response) {
          self.presentation = response.data.data.payload;
          self.comments = response.data.data.resultcomments;
          self.seePresentation = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deletePresentation(index) {},
    searchPresentation() {},
    contactUser() {},
    updatePresentation() {},
    /* increaseView(id) {
      const self = this;
      console.log(id);

      axios
        .post("http://localhost:3004'/presentation/view/" + id)
        .then(function(response) {})
        .catch(function(error) {
          console.error(error);
        });
    }, */
    votePresentation() {},
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
