<template
  ><div class="Home">
    <themenu class="menu" v-on:dark="darkMode"></themenu> </themenu>
    <vue-headful title="Home" description="Landing page of the application" />
    <header>
      <div class="words">
        <h1>Load</h1>
        <h1>Watch</h1>
        <h1>Score</h1>
        <h2>No Ordinary Presentations</h2>
      </div>
      <div class="image">
        <router-link class="link" :to="{ name: 'Presentations' }"
          >Go to Presentations</router-link
        >
      </div>
    </header>
    <div class="top">
       <h2 class="view">LAST PRESENTATIONS</h2>
      <ul>
        <li v-for="last in lasts" :key="last.id">
          <h3>{{ last.title }}</h3>
          <!-- <div v-html="view.video" class="video"></div> -->
          <videoPlayer size="small" :videoSource="last.video"></videoPlayer>
        </li>
      </ul>
      <h2 class="view">  TOP RATING PRESENTATIONS</h2>
      <ul>
        <li v-for="rating in ratings" :key="rating.id">
          <h3>{{ rating.title }}</h3>
          <videoPlayer size="small" :videoSource="rating.video"></videoPlayer>
          <!--     <div v-html="rating.video" class="video"></div> -->
          <h4>Rating: {{ rating.rating }} ⭐️</h4>
        </li>
      </ul>
      <h2 class="view"> TOP VIEW PRESENTATIONS</h2>
      <ul>
        <li v-for="view in views" :key="view.id">
          <h3>{{ view.title }}</h3>
          <!-- <div v-html="view.video" class="video"></div> -->
          <videoPlayer size="small" :videoSource="view.video"></videoPlayer>
          <h4>Views: {{ view.totalviews }} 👀</h4>
        </li>
      </ul>
    </div>
    <about class="about"></about>
    <thefooter></thefooter>
  </div>
</template>

<script>
import axios from "axios";

import thefooter from "../components/thefooter";
import videoPlayer from "../components/videoPlayer";
import themenu from "../components/themenu";
import about from "../components/about";
import { server } from "../api/helpers";
import { formatDateToDB } from "../api/helpers";

export default {
  name: "Home",
  components: { thefooter, themenu, about, videoPlayer },
  data() {
    return {
      views: [],
      ratings: [],
      lasts:[],
    };
  },
  methods: {
    topsPresentation() {
      const self = this;
      axios
        .get(server + "presentations/top3")
        .then(function(response) { 
          self.ratings = response.data.data.resultRatings;
          self.views = response.data.data.resultViews;
          self.lasts=response.data.data.resultLast
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    darkMode() {
      document.body.classList.toggle("dark");
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
  background-color: #373736;
  height: 100vh;
  width: 55vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.link {
  font-size: 3rem;
  width: 40rem;
  height: 5rem;
  background-color: var(--dark);
  color: var(--gold);
  border: 1px solid var(--silk);
  border-radius: 5px;
  box-shadow: 0px 5px 0px var(--gold);
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.top ul {
  display: flex;
 justify-content: space-between;
 
}

.top li {
  margin: 1rem;
}
.about {
  margin-bottom: 2rem;
}


@keyframes cambio {
	0% {margin-left: 0;}
	33% {margin-left: 0;}

	33% {margin-left: -200%;}
	66% {margin-left: -200%;}
	
	66% {margin-left: -300%;}
	100% {margin-left: -300%;}
}

</style>
