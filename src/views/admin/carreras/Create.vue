<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import CarreraForm
from "./components/CarreraForm.vue";

import {
  createCarrera
} from "@/services/carreras.service";

const router = useRouter();

const loading = ref(false);

const guardar = async (form) => {

  try {

    loading.value = true;

    await createCarrera(form);

    alert("Carrera creada");

    router.push("/admin/carreras");

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
        Registrar Carrera
      </h5>

    </div>

    <div class="card-body">

      <CarreraForm
        :loading="loading"
        @submit="guardar"
      />

    </div>

  </div>

</div>

</template>