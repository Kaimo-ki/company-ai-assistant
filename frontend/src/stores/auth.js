import { defineStore } from "pinia";
import { api } from "../api.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("designerToken") || null,
    designer: JSON.parse(localStorage.getItem("designer") || "null"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    _persist() {
      if (this.token) localStorage.setItem("designerToken", this.token);
      else localStorage.removeItem("designerToken");
      if (this.designer) localStorage.setItem("designer", JSON.stringify(this.designer));
      else localStorage.removeItem("designer");
    },
    async login(email, password) {
      const { token, designer } = await api.login(email, password);
      this.token = token;
      this.designer = designer;
      this._persist();
    },
    async register(name, email, password) {
      const { token, designer } = await api.register(name, email, password);
      this.token = token;
      this.designer = designer;
      this._persist();
    },
    async logout() {
      try {
        await api.logout();
      } catch (_) {
        // ignore network/expired errors; clear locally regardless
      }
      this.token = null;
      this.designer = null;
      this._persist();
    },
  },
});
