<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import InscripcionForm
from "./components/InscripcionForm.vue";

import {
  createInscripcion
} from "@/services/inscripciones.service";

const router = useRouter();

const loading = ref(false);

// GUARDAR
const guardar = async (form) => {

  try {

    loading.value = true;

    await createInscripcion(form);

    alert(
      "Inscripción realizada"
    );

    router.push(
      "/admin/inscripciones"
    );

  } catch (error) {

    alert(
      error.response?.data?.message
    );

  } finally {

    loading.value = false;

  }

};
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header">

      <h5>
        Nueva inscripción
      </h5>

    </div>

    <div class="card-body">

      <InscripcionForm
        :loading="loading"
        @submit="guardar"
      />

    </div>

  </div>

</div>

</template>