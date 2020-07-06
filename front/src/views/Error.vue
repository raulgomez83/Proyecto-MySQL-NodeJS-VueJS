<template>
  <div class="error">
    <vue-headful title="Error" description="Error page of the application" />
    <img src="../assets/error.jpg" alt />
    <div class="text">
      <div class="spinning">
        <spinning></spinning>
      </div>
      <div>
        <h1>WARNING!!!</h1>
        <h2>Not Found</h2>
        <h3>This page doesn't exist</h3>
      </div>
      <div class="spinning">
        <spinning></spinning>
      </div>
    </div>
  </div>
</template>

<script>
import spinning from "../components/spinning";
export default { name: "Error", components: { spinning } };
</script>

<style scoped>
.error {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error h1 {
  color: violet;
  text-shadow: 10px 10px 10px purple;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  background-color: thistle;
  padding: 1rem;
}
h2,
h3 {
  color: violet;
}
.spinning {
  display: flex;
  flex-direction: row;
}
</style>
