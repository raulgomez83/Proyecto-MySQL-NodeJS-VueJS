<template>
  <div>
    <div class="footerView">
      <ul class="social">
        <li>
          <img class="facebook" src="../assets/icons/facebook.svg" alt="facebook logo" />
        </li>
        <li>
          <img class="instagram" src="../assets/icons/instagram.svg" alt="instagram logo" />
        </li>
        <li>
          <img class="twitter" src="../assets/icons/twitter.svg" alt="twitter logo" />
        </li>
        <li>
          <img class="linkedin" src="../assets/icons/linkedin.svg" alt="linkedin logo" />
        </li>
        <li>
          <img class="github" src="../assets/icons/github.svg" alt="github logo" />
        </li>
        <li>
          <img class="whas" src="../assets/icons/whatsapp.svg" alt="whatsapp logo" />
        </li>
      </ul>
      <ul class="menu">
        <li>
          <router-link :to="{ name: 'About' }">About</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Register' }">Sign Up</router-link>
        </li>
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
  name: "thefooter"
};
</script>

<style scoped>
img {
  margin: 0.5rem;
}
.facebook {
  max-width: 3rem;
}
.instagram {
  max-width: 3rem;
}
.twitter {
  max-width: 3rem;
}
.github {
  max-width: 3rem;
}
.whas {
  max-width: 3rem;
}
.linkedin {
  max-width: 3rem;
}
.footerView {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  background-color: var(--lightGold);
  color: var(--blue);
  font-size: 1.2rem;
  max-height: 13rem;
}

.social {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.others {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 20px;
}
.menu {
  line-height: 20px;
}
a {
  color: var(--blue);
}
</style>
