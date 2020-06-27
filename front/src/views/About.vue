<template>
  <div class="about">
    <vue-headful title="About" description="About page of the application" />
    <themenu></themenu>
    <div class="about">
      <vue-headful title="About" description="Page about of market" />
      <elmenu></elmenu>
      <h2>Hello,this project so hard to made, was created by <br />👇👇👇</h2>
      <img src="../assets/fotomia.jpg" alt="mi foto" />
      <h2>Raúl Gómez</h2>
      <p>
        If you want more recent information , please push
        <a href="www.linkedin.com/in/raulgomezromero">here.</a>
      </p>
      <p class="thanks">
        I would like to thanks some colleagues, specially to
        <b> Isa, David, Brais, Berto, Víctor</b> and the warm and wonderful
        <b>Félix</b>, because withouth our teamwork this project was not the
        same. Maybe would better but not the same.
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
    themenu,
  },
};
</script>

<style>
.about {
  margin: 4rem auto;
}
h1 {
  margin: 2rem;
}
img {
  width: 10rem;
  margin: 2rem;
}
p {
  font-size: 2rem;
  margin-bottom: 2rem;
}
a {
  color: var(--blue);
}
.thanks {
  background-color: var(--blue);
  box-shadow: 5px 5px 5px var(--dark);
  color: var(--light);
  padding: 5rem;
  margin: 4rem;
}
</style>
