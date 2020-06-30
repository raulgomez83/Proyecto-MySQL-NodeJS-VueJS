<template>
  <div class="about">
    <vue-headful title="About" description="About page of the application" />
    <themenu class="menu" v-on:dark="darkMode"></themenu>
    <div class="about">
      <vue-headful title="About" description="Page about of market" />
      <h2>
        This project so hard to made, was created using MySQL, NodeJS , VueJS
        <br />by 👇👇👇
      </h2>
      <img src="../assets/fotomia.jpg" alt="mi foto" />
      <h2>Raúl Gómez</h2>
      <p>
        If you want more recent information , please push
        <a
          href="www.linkedin.com/in/raulgomezromero"
        >here.</a>
      </p>
      <p class="thanks">
        I would like to thank to some colleagues like
        <b>Isa, David, Brais, Berto, Víctor</b> and specially to
        <b>Félix</b>,
        because without our teamwork this project wouldn't be the same. Maybe
        would be better, but for sure, not the same.
      </p>
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
  },
  methods: {
    darkMode() {
      document.body.classList.toggle("dark");
    }
  }
};
</script>

<style>
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
