<template>
  <div>
    <vue-headful
      title="Profile"
      description="Profile page of the application.Only users"
    /><themenu></themenu>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
export default {
  name: "Profile",
  components: { thefooter, themenu },
  methods: {
    dataUser() {},
    updateUser() {},
    UpdatePassword() {},
    disableUser() {},
    showHistories() {},
    createPresentation() {},
  },
};
</script>

<style></style>
