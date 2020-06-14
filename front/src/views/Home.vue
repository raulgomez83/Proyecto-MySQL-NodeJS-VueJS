<template>
  <div>
    <vue-headful title="Home" description="Landing page of the application" />
    <themenu></themenu>
    <div class="medio">
      <form>
        <input
          type="search"
          id="searchplace"
          name="search"
          placeholder="Search the presentation..."
          size="50"
        />
        <button>Search</button>
      </form>
      <ul>
        <li class="load">Load!</li>
        <li class="watch">Watch!</li>
        <li class="score">Score!</li>
      </ul>
      <p>No more ordinary presentations</p>
    </div>
    <div>
      <h2>TOP Rating Presentations</h2>
      <ul class="topRating">
        <li v-for="rating in ratings" :key="rating.id">
          <h3>{{ rating.title }}</h3>
          <div v-html="rating.video" class="video"></div>
          <p>{{ rating.rating }}</p>
        </li>
      </ul>
      <h2>TOP Viewing Presentations</h2>
      <ul class="topViews">
        <li v-for="view in views" :key="view.id">
          <h3>{{ view.title }}</h3>
          <div v-html="view.video" class="video"></div>
          <p>{{ view.totalviews }}</p>
        </li>
      </ul>
      <h2>Last Presentations</h2>
      <ul class="last">
        <li v-for="last in lasts" :key="last.id">
          <h3>{{ last.title }}</h3>
          <div v-html="last.video" class="video"></div>
          <p>{{ last.rating }}</p>
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
  name: "Home",
  components: { thefooter, themenu },
  data() {
    return {
      lasts: [],
      views: [],
      ratings: [],
    };
  },
  methods: {
    search() {},
    topsPresentation() {
      const self = this;

      axios
        .get("http://localhost:3004/presentations/top3")
        .then(function(response) {
          self.ratings = response.data.data.resultRatings;
          self.views = response.data.data.resultViews;
          self.lasts = response.data.data.resultLast;
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
  created() {
    this.topsPresentation();
  },
};
</script>
<style scoped>
.last,
.topViews,
.topRating {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
