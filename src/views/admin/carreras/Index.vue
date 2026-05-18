<script setup>
import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  getCarreras,
  changeStatusCarrera
} from "@/services/carreras.service";

const carreras = ref([]);

const loading = ref(false);

const search = ref("");

// CARGAR
const loadCarreras = async () => {

  try {

    loading.value = true;

    carreras.value =
      await getCarreras();

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

// CAMBIAR ESTADO
const cambiarEstado = async (id) => {

  if (
    !confirm(
      "¿Cambiar estado?"
    )
  ) return;

  try {

    await changeStatusCarrera(id);

    loadCarreras();

  } catch (error) {

    console.error(error);

  }

};

// FILTRO
const filteredCarreras =
  computed(() => {

    return carreras.value.filter((c) =>

      c.nombre
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        )

    );

  });

onMounted(() => {

  loadCarreras();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="d-flex justify-content-between mb-4">

    <div>

      <h4>
        Carreras
      </h4>

      <p class="text-sm text-secondary">
        Gestión de carreras
      </p>

    </div>

    <router-link
      to="/admin/carreras/create"
      class="btn bg-gradient-primary"
    >
      Nueva carrera
    </router-link>

  </div>

  <!-- BUSCADOR -->
  <div class="mb-3 col-md-4">

    <input
      v-model="search"
      type="text"
      class="form-control"
      placeholder="Buscar carrera..."
    />

  </div>

  <!-- CARD -->
  <div class="card">

    <div class="card-body">

      <!-- LOADING -->
      <div
        v-if="loading"
        class="text-center py-5"
      >

        <div
          class="spinner-border text-primary"
        ></div>

      </div>

      <!-- TABLA -->
      <div
        v-else
        class="table-responsive"
      >

        <table class="table align-items-center">

          <thead>

            <tr>

              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th class="text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="carrera in filteredCarreras"
              :key="carrera.id_carrera"
            >

              <td>
                {{ carrera.id_carrera }}
              </td>

              <td>
                {{ carrera.nombre }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="
                    carrera.estado
                      ? 'bg-gradient-success'
                      : 'bg-gradient-danger'
                  "
                >

                  {{
                    carrera.estado
                      ? 'Activo'
                      : 'Inactivo'
                  }}

                </span>

              </td>

              <td class="text-center">

                <router-link
                  :to="`/admin/carreras/${carrera.id_carrera}/edit`"
                  class="btn btn-sm bg-gradient-warning me-2"
                >
                  Editar
                </router-link>

                <button
                  class="btn btn-sm bg-gradient-danger"
                  @click="
                    cambiarEstado(
                      carrera.id_carrera
                    )
                  "
                >
                  Estado
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

</template>