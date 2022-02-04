import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Character from "../views/Character.vue";

const routes = [
  { path: "/", redirect: "characters" },
  {
    path: "/characters",
    name: "Characters",
    component: Home
  },
  {
    path: "/characters/:id",
    name: "character",
    component: Character
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
