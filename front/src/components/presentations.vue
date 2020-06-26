<template>
  <div>
    <button @click="seePresentationEvent()">Back to presentations</button>
    <div class="presentation" v-show="seePresentation">
      <h2>{{ presentation.title }}</h2>
      <div class="video">
        <div v-html="presentation.video"></div>
        <div class="data">
          <p class="rating">
            Rating: {{ presentation.rating }} 🌟 ({{ ratings.totalratings }})
          </p>
          <p class="view">{{ presentation.totalviews }} views</p>
        </div>
      </div>
      <div class="about">
        <h3>About the presentation</h3>
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
              If you find this presentation interesting,you can send an email to
              the user that update it.
            </p>
            <button @click="contactUserEvent(presentation)">
              Contact to the user
            </button>
            <div v-show="seeContact">
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
      <div class="comments">
        <ul v-for="comment in comments" :key="comment.id">
          <li>
            <h4>{{ comment.username }}</h4>
            <p>{{ comment.comments }}</p>
          </li>
        </ul>
      </div>

      <br />
    </div>
    <div class="presentations" v-show="!seePresentation">
      <ul>
        <h2>Presentations</h2>
        <form>
          <label for="input">Search by city, event, category or language</label
          ><br />
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
          class="
          listpresentation"
          v-for="(presentation, index) in filteredPresentations"
          :key="presentation.id"
        >
          <h3>{{ presentation.title }}</h3>
          <div class="boxpresentation">
            <p>{{ presentation.city }} 🌍</p>
            <p>{{ presentation.presentation_event }} 🏢</p>
            <p>{{ presentation.category }} 💡</p>
            <p>{{ presentation.presentation_language }} 🎧</p>
            <div class="button">
              <button class="startButton" @click="showPresentationEvent(index)">
                See
              </button>
            </div>
          </div>
        </li>
      </ul>
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
    seeUserButton: false,
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
          presentation.city.toLowerCase().includes(this.search) ||
          presentation.presentation_language.toLowerCase().includes(this.search)
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
.listpresentation {
  border: 1px solid var(--blue);
  box-shadow: 5px 5px grey;
}

h2 {
  font-size: 4rem;
  color: var(--blue);
  margin: 3rem;
  -webkit-text-stroke: 1px var(--dark);
}
label {
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
.boxpresentation {
  display: flex;
  background: var(--gold);
  justify-content: center;
  align-items: baseline;
  padding: 0.5rem;
  font-size: 1.3rem;
}
h3 {
  text-align: center;
  font-size: 3rem;
}
h4 {
  color: var(--gold);
}
.boxpresentation p {
  width: 80vw;
  text-align: left;
  font-weight: bold;
}
.boxpresentation .startButton {
  width: 8rem;
  height: 2rem;
  background-color: var(--blue);
  color: var(--light);
  font-style: italic;
  font-size: 1.2rem;
  border: 1px solid var(--silk);
  border-radius: 5px;
  box-shadow: 0px 5px 0px var(--blue);
  position: relative;
  top: 0px;
  transition: all ease 0.3s;
}
.startButton:active {
  box-shadow: 0 3px 0 var(--gold);
  top: 3px;
}
.listpresentation {
  margin: 2rem;
  background: var(--light);
}
/* ////////////////////SINGLE/////////////////////////////// */
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: var(--blue);
  box-shadow: 5px 5px 5px var(--dark);
  color: var(--gold);
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
.presentation .description {
  font-size: 1.5rem;
  margin: 2rem;
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
.comments {
  background: var(--blue);
  color: var(--light);
  font-size: 1.5rem;
  height: 25rem;
  width: 95rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow-y: scroll;
  margin-bottom: 3rem;
  box-shadow: 5px 5px 5px var(--dark);
}

.comments li {
  margin-top: 0.5rem;
}
button {
  background-color: var(--gold);
  color: var(--blue);
  box-shadow: 2px 2px 2px var(--blue);
}
/* ////////////////////////////////VENTANA DE VOTAR!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

fieldset {
  border: none;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
textarea {
  background-color: var(--light);
  font-size: 1.4rem;
  color: var(--blue);
}

/* /////////////////////////////////////////////CONTACT//////////////////////////
 */
.contact p {
  font-size: 1.5rem;
}
.contactbutton {
  width: 8rem;
}
</style>
