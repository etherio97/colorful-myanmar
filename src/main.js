import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import config from "../config";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

firebase.initializeApp(config.FIREBASE_CONFIG);

new Vue({
  data: {
    player: null,
  },
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
