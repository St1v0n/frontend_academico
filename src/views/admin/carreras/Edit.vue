<script setup>
import {
  ref,
  onMounted
} from "vue";

import {
  useRoute,
  useRouter
} from "vue-router";

import CarreraForm
from "./components/CarreraForm.vue";

import {
  getCarrera,
  updateCarrera
} from "@/services/carreras.service";

const route = useRoute();

const router = useRouter();

const loading = ref(false);

const carrera = ref(null);

// CARGAR
const loadCarrera = async () => {

  try {

    loading.value = true;

    carrera.value =
      await getCarrera(
        route.params.id
      );

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

// ACTUALIZAR
const actualizar = async (form) => {

  try {

    loading.value = true;

    await updateCarrera(
      route.params.id,
      form
    );

    alert("Carrera actualizada");

    router.push("/admin/carreras");

  } catch (error) {

    alert(
      error.response?.data?.message
    );

  } finally {

    loading.value = false;

  }

};

onMounted(() => {

  loadCarrera();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header">

      <h5>
        Editar Carrera
      </h5>

    </div>

    <div class="card-body">

      <CarreraForm
        v-if="carrera"
        :model-value="carrera"
        :loading="loading"
        @submit="actualizar"
      />

    </div>

  </div>

</div>

</template>