<template>
  <div class="about">
    <vue-headful title="About" description="About page of the application" />
    <themenu></themenu>
    <div class="about">
      <vue-headful title="About" description="Page about of market" />
      <elmenu></elmenu>
      <h1>Hello,this super-project was created by me, Raúl Gómez</h1>
      <img src="../assets/fotomia.jpg" alt="mi foto" />
      <p>
        If you want more recent information push
        <a
          href="https://linkedin.com/in/raúl-gómez-romero-1bb4a753"
        >here.</a>
      </p>
      <elfooter></elfooter>
    </div>
    <thefooter></thefooter>
  </div>
</template>

<script>
import thefooter from "../components/thefooter";
import themenu from "../components/themenu";
export default {
  components: {
    thefooter,
    themenu
  }
};
</script>

<style></style>
