import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router.ts";
import { isAuthenticated } from "./auth.ts";

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: "/login" });
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
