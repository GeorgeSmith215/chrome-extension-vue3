import { createRouter, createWebHashHistory } from "vue-router";
import ThemeColor from "../views/ThemeColor.vue";
import ThemeImg from "../views/ThemeImg.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/themecolor",
    name: "ThemeColor",
    component: ThemeColor,
  },
  {
    path: "/themeimg",
    name: "ThemeImg",
    component: ThemeImg,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
