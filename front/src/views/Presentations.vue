<template>
  <div>
    <vue-headful
      title="Presentations"
      description="Presentations page of the application"
    /><themenu></themenu>
    <div class="presentation" v-show="seePresentation">
      <p>{{ presentation.title }}</p>
      <p>{{ presentation.presentation_date }}</p>
      <div v-html="presentation.video" class="video"></div>
      <p>{{ presentation.category }}</p>
      <p>{{ presentation.city }}</p>
      <p>{{ presentation.presentation_language }}</p>
      <p>{{ presentation.rating }}</p>
      <p>{{ presentation.totalviews }}</p>
      <div class="comments">
        <p v-for="comment in comments" :key="comment.id">
          {{ comment.comments }}
        </p>
      </div>
      <button>Vote</button>
      <div class="contact">
        <p>
          If you find this presentation interesting you can contact with the
          user that update it
        </p>
        <button>Contact</button>
      </div>
      <button>Update</button>
      <button>Delete</button>
      <br />
      <button @click="seePresentation = false">Back to presentations</button>
    </div>
    <div class="presentations" v-show="!seePresentation">
      <h2>All presentations</h2>
      <ul>
        <li
          v-for="(presentation, index) in presentations"
          :key="presentation.id"
          class="boxpresentation"
        >
          <h3>{{ presentation.title }}</h3>
          <p>{{ presentation.city }}</p>
          <p>{{ presentation.presentation_event }}</p>
          <p>{{ presentation.category }}</p>
          <p>{{ presentation.presentation_language }}</p>
          <button @click="showPresentation(index)">Go</button>
        </li>
      </ul>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";

import thefooter from "../components/thefooter";
import themenu from "../components/themenu";

export default {
  name: "Presentations",
  components: { thefooter, themenu },
  data() {
    return {
      presentations: [],
      presentation: {},
      comments: [],
      seePresentation: false,
      id: "",
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
      let data = self.presentations[index].presentation_id;
      self.id = data;
      axios
        .get("http://localhost:3004/presentation/" + data)
        .then(function(response) {
          console.log(response);
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
