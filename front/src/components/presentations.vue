<template>
  <div>
    <div class="presentations" v-show="!seePresentation">
      <ul>
        <h2>Presentations</h2>
        <form>
          <label for="input"
            >Search by city, event, category or language:</label
          >
          <input
            type="search"
            id="searchplace"
            name="search"
            placeholder="Search the presentation..."
            size="50"
            v-model="search"
          />
        </form>
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
              <button class="startButton" @click="showPresentationEvent(index)">
                See
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="presentation" v-show="seePresentation">
      <button class="backPresentations" @click="seePresentationEvent()">
        Back to presentations
      </button>
      <h2>{{ presentation.title }}</h2>
      <div id="video" class="box">
        <div v-html="presentation.video"></div>
        <div class="data">
          <h3 class="rating">
            Rating: {{ presentation.rating }} 🌟 ({{ ratings.totalratings }})
          </h3>
          <h3 class="view">{{ presentation.totalviews }} Views</h3>
        </div>
      </div>
      <div class="about">
        <h2>About the presentation</h2>
        <p class="description">
          The presentation was made in <b>{{ presentation.city }}</b> at
          <b>{{ presentation.presentation_date }}</b>
          , using <b>{{ presentation.presentation_language }}</b> , during the
          <b> {{ presentation.presentation_event }}</b> event in the
          <b>{{ presentation.category }}</b>
          category.
        </p>
        <div class="user" v-show="seeUserButton">
          <button @click="seeVoteEvent">
            Vote this presentation
          </button>
          <div class="contact">
            <p>
              If you find this presentation <b>interesting</b> , you can
              <b>send an email</b> to the user that update it.
            </p>
            <button @click="contactUserEvent(presentation)">
              Contact to the user
            </button>
            <div class="modal" v-show="seeContact">
              <div class="modalBox">
                <textarea
                  name="contact"
                  class="contactTextArea"
                  cols="30"
                  rows="5"
                  v-model="message"
                ></textarea>
                <br />
                <button
                  class="contactbutton"
                  @click="contactUserEmailEvent(message, presentation)"
                >
                  Contact</button
                ><button class="contactbutton" @click="closeContactEvent()">
                  Back
                </button>
              </div>
            </div>
          </div>
          <div id="vote" class="modal" v-show="seeVote">
            <div class="modalBox">
              <button class="cerrar" @click="closeVoteEvent()">x</button>
              <fieldset>
                <form>
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
                  <star-rating
                    @rating-selected="ratingTheme = $event"
                    :ratingTheme="ratingTheme"
                  ></star-rating>
                  <label for>Communication</label>
                  <star-rating
                    @rating-selected="ratingCommunication = $event"
                    :ratingCommunication="ratingCommunication"
                  ></star-rating>
                  <label for>Comments</label>
                  <br />
                  <textarea
                    name="comments"
                    id="comments"
                    cols="30"
                    rows="10"
                    v-model="comment"
                  ></textarea>
                </form>
                <button @click="voteEvent(presentation, comment)">Vote</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="box" id="comments">
        <ul v-for="comment in comments" :key="comment.id">
          <li class="comments">
            <h4>{{ comment.username }}</h4>
            <p>{{ comment.comments }}</p>
          </li>
        </ul>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { showUserButton } from "../api/helpers";
import { dateFilter } from "vue-date-fns";

export default {
  name: "listpresentations",
  props: {
    presentations: Array,
    presentation: Object,
    comments: Array,
    ratings: Object,
    seePresentation: Boolean,
    seeContact: Boolean,
    seeVote: Boolean,
    id: Number,
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
    };
  },
  computed: {
    filteredPresentations() {
      if (!this.search) {
        return this.presentations;
      }
      return this.presentations.filter(
        (presentation) =>
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
    },
  },
  filters: {
    date: dateFilter,
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
    },
  },
  created() {
    this.showUserButtonIn();
  },
};
</script>

<style scoped>
.presentations {
  padding: 2rem;
  margin: 1rem;
}
.presentations label {
  font-size: 1.5rem;
  color: var(--dark);
}
input {
  margin: 1rem;
  height: 3rem;
  width: 30rem;
  font-size: 1.5rem;
  background: var(--light);
  border: 3px solid var(--blue);
  color: var(--blue);
}
.box {
  margin: 2rem auto;
}
h3 {
  padding: 0.5rem;
}
.boxpresentation {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  border-top: 0.5px solid var(--dark);
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
  background-color: var(--gold);
}
#video {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40rem;
  width: 70rem;
  margin: 1rem;
  padding: 2rem;
}
.data {
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.about p {
  margin: 1rem;
}
.presentation .rating,
.presentation .view {
  font-size: 2rem;
}

.main {
  max-width: 80vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#comments .box {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow-y: scroll;
  margin-bottom: 3rem;
  box-shadow: 5px 5px 5px var(--dark);
}
.comments {
  margin: 1rem;
}
</style>
