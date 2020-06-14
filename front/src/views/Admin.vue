<template>
  <div>
    <vue-headful
      title="Administration"
      description="Administration page of the application.Only for admin"
    /><themenu></themenu>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
export default {
  name: "Admin",
  methods: { deleteUser() {}, listAllUsers() {}, listAllVotes() {} },
  components: { thefooter, themenu },
};
</script>

<style></style>
