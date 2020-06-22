<template>
  <div>
    <div class="presentation" v-show="seePresentation">
      <h2>{{ presentation.title }}</h2>
      <div v-html="presentation.video" class="video"></div>
      <p>
        This presentation was made in {{ presentation.city }} at
        {{ presentation.presentation_date }}, using
        {{ presentation.presentation_language }}, during the
        {{ presentation.presentation_event }} event in the
        {{ presentation.category }} category
      </p>
      <p>Rating: {{ presentation.rating }} ({{ ratings.totalratings }})</p>
      <p>Views: {{ presentation.totalviews }}</p>
      <div class="comments">
        <p v-for="comment in comments" :key="comment.id">
          {{ comment.comments }}
        </p>
      </div>
      <div class="vote" v-show="seeVote">
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
      <button @click="seeVoteEvent">
        Vote this presentation
      </button>
      <div class="contact">
        <p>
          If you find this presentation interesting,you can send an email to the
          user that update it.
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
          <button @click="contactUserEmailEvent(message, presentation)">
            Contact
          </button>
        </div>
      </div>
      <br />
      <button @click="seePresentationEvent">Back to presentations</button>
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
          <button @click="showPresentationEvent(index)">Go</button>
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
    };
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
    showUserButtonIn() {
      this.seeUserButton = showUserButton();
    },
  },
  created() {
    this.showUserButtonIn();
  },
};
</script>

<style></style>
