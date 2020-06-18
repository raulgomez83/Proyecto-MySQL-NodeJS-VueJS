<template>
  <div>
    <div class="footer">
      <ul class="social">
        <li><a href="facebook.com" class="facebook">facebook</a></li>
        <li><a href="instagram.com" class="instagram">instagram</a></li>
        <li><a href="twitter.com" class="twitter">twitter</a></li>
        <li><a href="linkedin.com" class="linkedin">linkedin</a></li>
      </ul>
      <ul class="menu">
        <li><router-link :to="{ name: 'About' }">About </router-link></li>
        <li><router-link :to="{ name: 'Home' }">Home </router-link></li>
        <li><router-link :to="{ name: 'Login' }">Login </router-link></li>
        <li><router-link :to="{ name: 'Register' }">Sign Up </router-link></li>
        <li>
          <router-link :to="{ name: 'Presentations' }"
            >Presentations
          </router-link>
        </li>
      </ul>
      <ul class="others">
        <li>Careers</li>
        <li>Contact</li>
        <li>FAQs</li>
        <li>Privacy</li>
        <li>Cookies</li>
      </ul>
    </div>
    <p>Copyright by rateIn 2020</p>
  </div>
</template>

<script>
export default {
  name: "thefooter",
};
</script>

<style>
.footer {
  display: flex;
  justify-content: space-evenly;
}
.social {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.others {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
