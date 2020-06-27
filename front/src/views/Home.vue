<template
  ><div class="Home">
    <themenu class="menu"></themenu>
    <vue-headful title="Home" description="Landing page of the application" />
    <header>
      <div class="words">
        <h1>Load</h1>
        <h1>Watch</h1>
        <h1>Score</h1>
        <h2>No more ordinary presentations</h2>
      </div>
      <div class="image">
        <router-link class="link" :to="{ name: 'Presentations' }"
          >Go to presentations</router-link
        >
      </div>
    </header>
    <div class="top">
      <ul>
        <h2 class="view">#TOP RATING PRESENTATIONS</h2>
        <li v-for="rating in ratings" :key="rating.id">
          <h3>{{ rating.title }}</h3>
          <div v-html="rating.video" class="video"></div>
          <h4>Rating: {{ rating.rating }}⭐️</h4>
        </li>
      </ul>
      <ul>
        <h2 class="view">#TOP VIEWING PRESENTATIONS</h2>
        <li v-for="view in views" :key="view.id">
          <h3>{{ view.title }}</h3>
          <div v-html="view.video" class="video"></div>
          <h4>Views: {{ view.totalviews }}</h4>
        </li>
      </ul>
    </div>
    <about class="about"></about><thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";

import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
import about from "../components/about";

export default {
  name: "Home",
  components: { thefooter, themenu, about },
  data() {
    return {
      views: [],
      ratings: [],
    };
  },
  methods: {
    topsPresentation() {
      const self = this;
      const server = "http://localhost:3004/";
      axios
        .get(server + "presentations/top3")
        .then(function(response) {
          self.ratings = response.data.data.resultRatings;
          self.views = response.data.data.resultViews;
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
header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  min-width: 40vw;
  min-height: 100vh;
  background-image: url("../assets/city.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.words {
  background-color: var(--dark);
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.link {
  font-size: 4rem;
  background-color: var(--dark);
  color: var(--gold);
  padding: 0.3rem 1rem;
  border: 1px solid var(--silk);
  border-radius: 5px;
  box-shadow: 0px 5px 0px var(--gold);
  position: relative;
  top: 0px;
  transition: all ease 0.3s;
}
.link:active {
  box-shadow: 0 3px 0 var(--gold);
  top: 3px;
}
/* ///////////////////////////////TOPS/////////////////////// */
.top {
  margin-top: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top ul {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.top h2 {
  margin-bottom: 2rem;
}
.top li {
  margin: 2rem;
}
.about {
  margin-bottom: 2rem;
}
</style>
