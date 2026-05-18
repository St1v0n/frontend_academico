<script setup>
import {
  ref,
  onMounted
} from "vue";

import {
  useRoute,
  useRouter
} from "vue-router";

import MateriaForm
from "./components/MateriaForm.vue";

import {
  getMateria,
  updateMateria
} from "@/services/materias.service";

const route = useRoute();

const router = useRouter();

const loading = ref(false);

const materia = ref(null);

// CARGAR
const loadMateria = async () => {

  try {

    loading.value = true;

    materia.value =
      await getMateria(
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

    await updateMateria(
      route.params.id,
      form
    );

    alert(
      "Materia actualizada"
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

onMounted(() => {

  loadMateria();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Editar Materia
      </h5>

    </div>

    <div class="card-body">

      <MateriaForm
        v-if="materia"
        :model-value="materia"
        :loading="loading"
        @submit="actualizar"
      />

    </div>

  </div>

</div>

</template>