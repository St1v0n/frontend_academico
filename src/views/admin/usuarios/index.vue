<script setup>
import { ref, onMounted } from "vue";
import { computed } from "vue";

import {
  getUsuarios,
  changeStatusUsuario,
  resetPassword
} from "@/services/usuarios.service";

const usuarios = ref([]);
const loading = ref(false);
const search = ref("");

const loadUsuarios = async () => {

  try {

    loading.value = true;

    usuarios.value = await getUsuarios();

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

const cambiarEstado = async (id) => {

  if (!confirm("¿Cambiar estado del usuario?")) {
    return;
  }

  try {

    await changeStatusUsuario(id);

    loadUsuarios();

  } catch (error) {

    console.error(error);

  }

};
//filtros
const filteredUsuarios = computed(() => {

  return usuarios.value.filter((u) => {

    const text = `
      ${u.nombres}
      ${u.apellidos}
      ${u.correo}
      ${u.ci}
    `.toLowerCase();

    return text.includes(
      search.value.toLowerCase()
    );

  });

});


const resetearPassword = async (id) => {

  if (!confirm("¿Resetear contraseña?")) {
    return;
  }

  try {

    const response =
      await resetPassword(id);

    const data = response.data;

    alert(
      `Contraseña restablecida correctamente\n\n` +
      `Usuario: ${data.nombres} ${data.apellidos}\n` +
      `Contraseña temporal: ${data.tempPassword}`
    );

  } catch (error) {

    console.error(error);

    alert(
      "Error al resetear contraseña"
    );

  }

};

onMounted(() => {

  loadUsuarios();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="row mb-4">

    <div class="col-12 d-flex justify-content-between align-items-center">

      <div>

        <h4 class="mb-0">
          Usuarios
        </h4>

        <p class="text-sm text-secondary">
          Gestión de usuarios del sistema
        </p>

      </div>

      <router-link
        to="/admin/usuarios/create"
        class="btn bg-gradient-primary"
      >
        Nuevo usuario
      </router-link>

    </div>

  </div>
  <div class="row mb-3">

    <div class="col-md-4">

      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Buscar usuario..."
      />

    </div>

  </div>

  <!-- TABLA -->
  <div class="row">

    <div class="col-12">

      <div class="card">

        <div class="card-body">

          <div
            v-if="loading"
            class="text-center py-5"
          >
            <div class="text-center py-5">

              <div
                class="spinner-border text-primary"
                role="status"
              ></div>

            </div>.
          </div>

          <div
            v-else
            class="table-responsive"
          >

            <table class="table align-items-center mb-0">

              <thead>

                <tr>

                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th class="text-center">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr
                  v-for="usuario in filteredUsuarios"
                  :key="usuario.id_usuario"
                >

                  <td>
                    {{ usuario.nombres }}
                    {{ usuario.apellidos }}
                  </td>

                  <td>
                    {{ usuario.correo }}
                  </td>

                  <td>
                    <span class="badge bg-gradient-info">
                      {{ usuario.rol }}
                    </span>
                  </td>

                  <td>

                    <span
                      class="badge"
                      :class="
                        usuario.estado
                          ? 'bg-gradient-success'
                          : 'bg-gradient-danger'
                      "
                    >
                      {{
                        usuario.estado
                          ? 'Activo'
                          : 'Inactivo'
                      }}
                    </span>

                  </td>

                  <td class="text-center">

                    <router-link
                      :to="`/admin/usuarios/${usuario.id_usuario}/edit`"
                      class="btn btn-sm bg-gradient-warning me-2"
                    >
                      Editar
                    </router-link>

                    <button
                      class="btn btn-sm bg-gradient-danger me-2"
                      @click="cambiarEstado(usuario.id_usuario)"
                    >
                      Estado
                    </button>

                    <button
                      class="btn btn-sm bg-gradient-dark"
                      @click="resetearPassword(usuario.id_usuario)"
                    >
                      Reset Password
                    </button>

                  </td>

                </tr>

              </tbody>
              <tr v-if="filteredUsuarios.length === 0">

                <td
                  colspan="5"
                  class="text-center py-4"
                >

                  No se encontraron usuarios

                </td>

              </tr>

            </table>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

</template>