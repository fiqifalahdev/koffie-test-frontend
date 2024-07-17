import { createMemoryHistory, createRouter } from "vue-router";

import RegisterPage from "@/components/RegisterPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  { path: "/", component: HelloWorld, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
