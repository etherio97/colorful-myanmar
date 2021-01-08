import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/video/:id",
    component: () => import("../views/Video.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
