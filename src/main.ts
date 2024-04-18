import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(pinia)
  .use(autoAnimatePlugin)
  .mount("#app");
