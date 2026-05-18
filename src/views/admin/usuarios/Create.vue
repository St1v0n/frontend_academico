<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import UsuarioForm from "./Components/UsuarioForm.vue";

import {
  createUsuario
} from "@/services/usuarios.service";

const router = useRouter();

const loading = ref(false);

const guardar = async (form) => {

  try {

    loading.value = true;

    const response =
      await createUsuario(form);

    alert(
      `Usuario creado.\nPassword temporal: ${response.data.tempPassword}`
    );

    router.push("/admin/usuarios");

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
        Registrar Usuario
      </h5>

    </div>

    <div class="card-body">

      <UsuarioForm
        :loading="loading"
        @submit="guardar"
      />

    </div>

  </div>

</div>

</template>