import { createRouter, createWebHashHistory } from "vue-router";
import ThemeColor from "../views/ThemeColor.vue";
import ThemeImg from "../views/ThemeImg.vue";
import SetCalendar from "../views/SetCalendar.vue";
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
  {
    path: "/setcalendar",
    name: "SetCalendar",
    component: SetCalendar,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
