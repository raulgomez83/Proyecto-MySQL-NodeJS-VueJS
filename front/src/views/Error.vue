<template>
  <div>
    <vue-headful title="Error" description="Error page of the application" />
    <h1>ERROR</h1>
    <h2>Not Found</h2>
    <h3>This page doesn't exist</h3>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
export default { name: "Error", components: { thefooter } };
</script>

<style scoped></style>
