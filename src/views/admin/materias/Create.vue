<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import MateriaForm
from "./components/MateriaForm.vue";

import {
  createMateria
} from "@/services/materias.service";

const router = useRouter();

const loading = ref(false);

// GUARDAR
const guardar = async (form) => {

  try {

    loading.value = true;

    await createMateria(form);

    alert(
      "Materia creada correctamente"
    );

    router.push(
      "/admin/materias"
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

    <div class="card-header pb-0">

      <h5>
        Registrar Materia
      </h5>

    </div>

    <div class="card-body">

      <MateriaForm
        :loading="loading"
        @submit="guardar"
      />

    </div>

  </div>

</div>

</template>