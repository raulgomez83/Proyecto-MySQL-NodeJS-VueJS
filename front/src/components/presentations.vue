<template>
  <div>
    <div class="presentations" v-show="!seePresentation">
      <header>
        <form autocomplete="off">
          <label for="input">Search by city, event, category or language:</label>
          <input
            type="search"
            id="searchplace"
            name="search"
            placeholder="Search the presentation..."
            size="50"
            v-model="search"
          />
        </form>
      </header>
      <h2>Presentations</h2>
      <ul>
        <li
          class="box"
          v-for="(presentation, index) in filteredPresentations"
          :key="presentation.id"
        >
          <h3>{{ presentation.title }}</h3>
          <div class="boxpresentation">
            <h4>{{ presentation.city }} 🌍</h4>
            <h4>{{ presentation.presentation_event }} 🏢</h4>
            <h4>{{ presentation.category }} 💡</h4>
            <h4>{{ presentation.presentation_language }} 🎧</h4>
            <div class="button">
              <button class="startButton" @click="showPresentationEvent(index)">See</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="presentation" v-if="seePresentation">
      <button class="backPresentations" @click="seePresentationEvent()">Back to presentations</button>
      <h2>{{ presentation.title }}</h2>
      <div id="video" class="box">
        <videoPlayer size="large" :videoSource="presentation.video"></videoPlayer>
        <div class="data">
          <h3 class="rating">Rating: {{ presentation.rating }} ⭐️ ({{ ratings.totalratings }})</h3>
          <h3 class="view">{{ presentation.totalviews }} Views 👀</h3>
        </div>
      </div>
      <div class="about">
        <h2>About the presentation</h2>
        <p class="description">
          The presentation was made in
          <b>{{ presentation.city }}</b> at
          <b>{{ presentation.presentation_date }}</b>
          , in
          <b>{{ presentation.presentation_language }}</b> , during the
          <b>{{ presentation.presentation_event }}</b> event in the
          <b>{{ presentation.category }}</b>
          category.
        </p>
        <div class="user" v-show="seeUserButton">
          <button @click="seeVoteEvent">Vote this presentation</button>
          <div class="contact">
            <p>
              If you find this presentation
              <b>interesting</b> , you can
              <b>send an email</b> to the user that
              update it.
            </p>
            <button @click="contactUserEvent(presentation)">Contact to the user</button>
            <div class="modal" v-show="seeContact">
              <div class="modalBox">
                <textarea
                  name="contact"
                  class="contactTextArea"
                  cols="14"
                  rows="4"
                  v-model="message"
                ></textarea>
                <br />
                <button
                  class="contactbutton"
                  @click="contactUserEmailEvent(message, presentation)"
                >Contact</button>
                <button class="contactbutton" @click="closeContactEvent()">Back</button>
              </div>
            </div>
          </div>
          <div id="vote" class="modal" v-show="seeVote">
            <div class="modalBox">
              <button class="cerrar" @click="closeVoteEvent()">x</button>
              <fieldset>
                <form autocomplete="off">
                  <label for>Interest</label>
                  <star-rating
                    @rating-selected="ratingInterest = $event"
                    :ratingInterest="ratingInterest"
                  ></star-rating>
                  <label for>Design</label>
                  <star-rating
                    @rating-selected="ratingDesign = $event"
                    :ratingDesign="ratingDesign"
                  ></star-rating>
                  <label for>Theme Quality</label>
                  <star-rating @rating-selected="ratingTheme = $event" :ratingTheme="ratingTheme"></star-rating>
                  <label for>Communication</label>
                  <star-rating
                    @rating-selected="ratingCommunication = $event"
                    :ratingCommunication="ratingCommunication"
                  ></star-rating>
                  <label for>Comments</label>
                  <br />
                  <textarea name="comments" class="comments" cols="20" rows="10" v-model="comment"></textarea>
                </form>
                <button @click="voteEvent(presentation, comment)">Vote</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <h3>Comments</h3>
      <div class="box" id="comments">
        <ul>
          <li v-for="comment in comments" :key="comment.id" class="comments">
            <h4>{{ comment.username }}</h4>
            <p class="showComments">{{ comment.comments }}</p>
          </li>
          <hr />
        </ul>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { showUserButton } from "../api/helpers";
import { dateFilter } from "vue-date-fns";
import videoPlayer from "./videoPlayer";

export default {
  name: "listpresentations",
  components: {
    videoPlayer
  },
  props: {
    presentations: Array,
    presentation: Object,
    comments: Array,
    ratings: Object,
    seePresentation: Boolean,
    seeContact: Boolean,
    seeVote: Boolean,
    id: Number
    /* width: String,
    height: String, */
  },
  data() {
    return {
      message: "",
      ratingInterest: 0,
      ratingTheme: 0,
      ratingDesign: 0,
      ratingCommunication: 0,
      comment: "",
      search: "",
      seeUserButton: false,
      width: "",
      height: ""
    };
  },
  computed: {
    filteredPresentations() {
      if (this.search === "") {
        return this.presentations;
      }
      return this.presentations.filter(
        presentation =>
          presentation.title
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          presentation.presentation_event
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          presentation.category
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          presentation.city.toLowerCase().includes(this.search.toLowerCase()) ||
          presentation.presentation_language
            .toLowerCase()
            .includes(this.search.toLowerCase())
      );
    }
  },
  filters: {
    date: dateFilter
  },
  methods: {
    showPresentationEvent(index) {
      let data = this.presentations[index];
      this.$emit("go", data);
    },
    seePresentationEvent() {
      this.$emit("see");
    },
    closeVoteEvent() {
      this.$emit("closevote");
    },
    seeVoteEvent() {
      this.$emit("showvote");
    },
    voteEvent(
      presentation,
      comment,
      ratingInterest,
      ratingDesign,
      ratingTheme,
      ratingCommunication
    ) {
      this.$emit(
        "vote",
        presentation,
        comment,
        this.ratingInterest,
        this.ratingDesign,
        this.ratingTheme,
        this.ratingCommunication
      );
    },
    contactUserEvent() {
      this.$emit("showcontact");
    },
    contactUserEmailEvent(message, presentation) {
      this.$emit("contact", this.message, presentation);
    },
    closeContactEvent() {
      this.$emit("closecontact");
    },
    showUserButtonIn() {
      this.seeUserButton = showUserButton();
    }
  },
  created() {
    this.showUserButtonIn();
  }
};
</script>

<style scoped>
.presentations {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-shadow: 5px 3px 5px var(--dark);
}

.presentations form {
  background-image: url("../assets/lista.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 50rem;
  height: 30rem;
  display: flex;
  justify-content: start;
  margin: 2rem;
}
.presentations label {
  font-size: 2.5rem;
  color: var(--light);
  font-weight: bold;
  margin-top: 2rem;
  -webkit-text-stroke: 1px var(--dark);
}
input {
  margin: 1rem;
  height: 3rem;
  width: 30rem;
  font-size: 1.5rem;
  background: var(--light);
  border: 3px solid var(--blue);
  color: var(--blue);
  opacity: 0.9;
}
h2 {
  margin-top: 2rem;
}
.presentations ul {
  width: 100%;
}
.presentations li {
  margin-bottom: 3rem;
}
.boxpresentation {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  border-top: 0.5px solid var(--blue);
}

.boxpresentation button {
  width: 8rem;
  height: 2rem;
  background-color: var(--blue);
  color: var(--gold);
}

/* ////////////////////SINGLE PRESENTATION/////////////////////////////// */
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.backPresentations {
  color: var(--blue);
  background-color: var(--light);
}
#video {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60rem;
  width: 94rem;
  margin: 1rem;
  padding: 2rem;
  border: 3px solid var(--gold);
}

.data {
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.about p {
  font-size: 1.5rem;
}
.presentation .rating,
.presentation .view {
  font-size: 2rem;
}
#comments {
  text-align: start;
  overflow-y: scroll;
  width: 70rem;
  height: 20rem;
  line-height: 25px;
  padding: 1rem;
}
.comments {
  border-bottom: 0.1px dashed grey;
  padding: 0.5rem;
}
.comments p {
  font-size: 1rem;
}
.comments h4 {
  margin-top: 0.3rem;
  font-size: 1.5rem;
}
hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px var(--blue) inset;
}
</style>
