import { defineStore } from "pinia";
import { crmApi } from "../crm/api";

export const useCrmAuth = defineStore("crmAuth", {
  state: () => ({
    token: localStorage.getItem("crm_token") || null,
    designer: JSON.parse(localStorage.getItem("crm_designer") || "null"),
  }),
  getters: {
    isAuthed: (s) => !!s.token,
  },
  actions: {
    async login(login, password) {
      const data = await crmApi.login(login, password);
      this.token = data.token;
      this.designer = data.designer;
      localStorage.setItem("crm_token", data.token);
      localStorage.setItem("crm_designer", JSON.stringify(data.designer));
    },
    logout() {
      this.token = null;
      this.designer = null;
      localStorage.removeItem("crm_token");
      localStorage.removeItem("crm_designer");
    },
  },
});
