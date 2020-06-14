<template>
  <div>
    <h1>Upload your presentation</h1>
    <form>
      <fieldset>
        <ul>
          <li>
            <label for="title">Title:</label>
            <br />
            <input type="text" name="title" id="title" v-model="title" />
          </li>
          <li>
            <label for="date">Date:</label>
            <br />
            <input type="date" name="date" id="date" v-model="date" />
          </li>
          <li>
            <label for="event">Event:</label>
            <br />
            <input type="text" name="event" id="event" v-model="event" />
          </li>
          <li>
            <label for="city">City:</label>
            <br />
            <input type="text" name="city" id="city" v-model="city" />
          </li>
          <li>
            <label for="category">Category:</label>
            <br />
            <input
              type="text"
              name="category"
              id="category"
              v-model="category"
            />
          </li>
          <li>
            <label for="language">Language:</label>
            <br />
            <input
              type="text"
              name="language"
              id="language"
              v-model="language"
            />
          </li>
          <li>
            <label for="video">Video:</label>
            <br />
            <input type="url" name="video" id="video" v-model="video" />
          </li>
        </ul>
      </fieldset>
      <button @click="newPresentation()">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewPresentation",
  data() {
    return {
      title: "",
      date: "",
      event: "",
      city: "",
      category: "",
      language: "",
      video: "",
    };
  },
  methods: {
    newPresentation() {
      var self = this;
      axios
        .post("http://localhost:3004/presentation", {
          title: self.title,
          date: self.date,
          event: self.event,
          city: self.city,
          category: self.category,
          language: self.language,
          video: self.video,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
