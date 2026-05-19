import { defineStore } from "pinia";
import api from "@/boot/axios";

export const useAuthStore = defineStore("auth", {

  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    errorMessage: null,
  }),

  getters: {

    isAuthenticated: (state) => !!state.token,

    userRole: (state) => state.user?.rol || null,

    isSecretaria: (state) =>
      state.user?.rol === "SECRETARIA",

    isDocente: (state) =>
      state.user?.rol === "DOCENTE",

    isEstudiante: (state) =>
      state.user?.rol === "ESTUDIANTE",

  },

  actions: {

    async login(correo, password, router) {

      try {

        const response = await api.post("/auth/login", {
          correo,
          password,
        });

        const { token, user } = response.data;

        this.token = token;
        this.user = user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // REDIRECCIÓN SEGÚN ROL
        if (user.rol === "SECRETARIA") {

          router.push("/admin/dashboard");

        }

        else if (user.rol === "DOCENTE") {

          router.push("/docente/dashboard");

        }

        else if (user.rol === "ESTUDIANTE") {

          router.push("/estudiante/programacion");

        }

        else {

          router.push("/signin");

        }

        return true;

      } catch (error) {

        this.errorMessage =
          error.response?.data?.message ||
          "Error al iniciar sesión";

        return false;

      }

    },

    logout(router) {

      this.token = null;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/signin");

    }

  }

});