<script setup>
import { ref, onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";

import UsuarioForm from "./Components/UsuarioForm.vue";

import {
  getUsuario,
  updateUsuario
} from "@/services/usuarios.service";

const route = useRoute();

const router = useRouter();

const loading = ref(false);

const usuario = ref(null);

// CARGAR USUARIO
const loadUsuario = async () => {

  try {

    loading.value = true;

    usuario.value = await getUsuario(
      route.params.id
    );

  } catch (error) {

    console.error(error);

    alert("Error al cargar usuario");

  } finally {

    loading.value = false;

  }

};

// ACTUALIZAR
const actualizar = async (form) => {

  try {

    loading.value = true;

    await updateUsuario(
      route.params.id,
      form
    );

    alert("Usuario actualizado");

    router.push("/admin/usuarios");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message
    );

  } finally {

    loading.value = false;

  }

};

onMounted(() => {

  loadUsuario();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Editar Usuario
      </h5>

    </div>

    <div class="card-body">

      <div
        v-if="loading && !usuario"
        class="text-center py-5"
      >
        Cargando...
      </div>

      <UsuarioForm
        v-else
        :model-value="usuario"
        :loading="loading"
        @submit="actualizar"
      />

    </div>

  </div>

</div>

</template>