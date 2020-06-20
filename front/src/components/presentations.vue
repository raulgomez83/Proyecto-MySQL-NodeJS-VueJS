<template>
  <div>
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
          If you find this presentation interesting,you can send an email to the
          user that update it.
        </p>
        <button @click="contactUserEvent(presentation)">
          Contact to the user</button
        ><br />
        <div v-show="seeContact">
          <textarea
            name="contact"
            class="contactTextArea"
            cols="30"
            rows="5"
            v-model="message"
          ></textarea
          ><br /><button @click="contactUserEmailEvent(message, presentation)">
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
export default {
  name: "listpresentations",
  props: {
    presentations: Array,
    presentation: Object,
    comments: Array,
    seePresentation: Boolean,
    seeContact: Boolean,
    id: Number,
  },
  data() {
    return { message: "" };
  },
  methods: {
    showPresentationEvent(index) {
      let data = this.presentations[index];
      this.$emit("go", data);
    } /*
    votePresentationEvent(index) {
      let data = this.presentations[index].id;
      this.$emit("vote", data);
    }, */,
    seePresentationEvent() {
      this.$emit("see");
    },
    contactUserEvent() {
      this.$emit("showcontact");
    },
    contactUserEmailEvent(message, presentation) {
      this.$emit("contact", this.message, presentation);
    },
  },
};
</script>

<style></style>
