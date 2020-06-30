import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueHeadful from "vue-headful";
import StarRating from "vue-star-rating";
import VueI18n from "vue-i18n";

Vue.component("star-rating", StarRating);
Vue.component("vue-headful", vueHeadful);
Vue.use(VueI18n);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
