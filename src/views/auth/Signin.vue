<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const correo = ref("");
const password = ref("");

const loading = ref(false);
const errorMessage = ref("");

const loginUser = async () => {

  loading.value = true;
  errorMessage.value = "";

  const success = await authStore.login(
    correo.value,
    password.value,
    router
  );

  if (!success) {
    errorMessage.value = authStore.errorMessage;
  }

  loading.value = false;
};
</script>

<template>

<div class="container-fluid">
  <div class="row min-vh-100">

    <!-- LADO IZQUIERDO -->
    <div class="col-lg-6 d-flex justify-content-center align-items-center">

      <div class="w-75">

        <h2 class="mb-2 fw-bold">
          Sistema Académico
        </h2>

        <p class="text-muted mb-4">
          Inicia sesión para continuar
        </p>

        <form @submit.prevent="loginUser">

          <!-- CORREO -->
          <div class="mb-3">
            <label class="form-label">
              Correo
            </label>

            <input
              v-model="correo"
              type="email"
              class="form-control form-control-lg"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <!-- PASSWORD -->
          <div class="mb-3">

            <label class="form-label">
              Contraseña
            </label>

            <input
              v-model="password"
              type="password"
              class="form-control form-control-lg"
              placeholder="********"
              required
            />

          </div>

          <!-- ERROR -->
          <div
            v-if="errorMessage"
            class="alert alert-danger"
          >
            {{ errorMessage }}
          </div>

          <!-- BOTON -->
          <button
            class="btn bg-gradient-primary w-100"
            :disabled="loading"
          >

            <span v-if="loading">
              Ingresando...
            </span>

            <span v-else>
              Iniciar Sesión
            </span>

          </button>

        </form>

      </div>

    </div>

    <!-- LADO DERECHO -->
    <div
      class="col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-gradient-primary"
    >

      <div class="text-center text-white px-5">

        <h1 class="fw-bold">
          Plataforma Académica
        </h1>

        <p class="mt-3">
          Gestiona estudiantes, materias,
          notas e inscripciones.
        </p>

      </div>

    </div>

  </div>
</div>

</template>