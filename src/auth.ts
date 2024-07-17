// src/auth.ts
import { ref } from "vue";

export const isAuthenticated = ref(false);

export const login = () => {
  isAuthenticated.value = true;
};

export const logout = () => {
  isAuthenticated.value = false;
};
