import HomeView from "@/pages/HomeView.vue";
import NotFoundView from "@/pages/NotFoundView.vue";
import SuratView from "@/pages/SuratView.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/surat/:id", name: "Surat", component: SuratView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
