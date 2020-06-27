<template>
  <div>
    <div class="footerView">
      <ul class="social">
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Twitter</li>
        <li>Linkedin</li>
      </ul>
      <ul class="menu">
        <li><router-link :to="{ name: 'About' }">About </router-link></li>
        <li><router-link :to="{ name: 'Home' }">Home </router-link></li>
        <li><router-link :to="{ name: 'Login' }">Login </router-link></li>
        <li><router-link :to="{ name: 'Register' }">Sign Up </router-link></li>
        <li></li>
      </ul>
      <ul class="others">
        <li>Careers</li>
        <li>Contact</li>
        <li>FAQs</li>
        <li>Privacy</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "thefooter",
};
</script>

<style scoped>
.footerView {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  background-color: var(--gold);
  color: var(--blue);
  font-size: 1.2rem;
  max-height: 13rem;
  min-width: 100%;
}

.footer .social {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.others {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

a {
  color: var(--blue);
}
</style>
