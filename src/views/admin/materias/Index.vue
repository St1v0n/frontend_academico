<script setup>
import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  getMaterias,
  changeStatusMateria
} from "@/services/materias.service";

const materias = ref([]);

const loading = ref(false);

const search = ref("");

// CARGAR
const loadMaterias = async () => {

  try {

    loading.value = true;

    materias.value =
      await getMaterias();

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

    await changeStatusMateria(id);

    loadMaterias();

  } catch (error) {

    console.error(error);

  }

};

// FILTRO
const filteredMaterias =
  computed(() => {

    return materias.value.filter((m) => {

      const text = `
        ${m.nombre}
        ${m.sigla}
        ${m.carrera}
        ${m.docente || ""}
      `.toLowerCase();

      return text.includes(
        search.value.toLowerCase()
      );

    });

  });

onMounted(() => {

  loadMaterias();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="d-flex justify-content-between mb-4">

    <div>

      <h4>
        Materias
      </h4>

      <p class="text-sm text-secondary">
        Gestión académica
      </p>

    </div>

    <router-link
      to="/admin/materias/create"
      class="btn bg-gradient-primary"
    >
      Nueva materia
    </router-link>

  </div>

  <!-- BUSCADOR -->
  <div class="mb-3 col-md-4">

    <input
      v-model="search"
      type="text"
      class="form-control"
      placeholder="Buscar materia..."
    />

  </div>

  <!-- TABLA -->
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

      <!-- TABLE -->
      <div
        v-else
        class="table-responsive"
      >

        <table class="table">

          <thead>

            <tr>

              <th>Sigla</th>
              <th>Materia</th>
              <th>Semestre</th>
              <th>Carrera</th>
              <th>Docente</th>
              <th>Estado</th>
              <th class="text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="materia in filteredMaterias"
              :key="materia.id_materia"
            >

              <td>

                <span
                  class="badge bg-gradient-info"
                >

                  {{ materia.sigla }}

                </span>

              </td>

              <td>
                {{ materia.nombre }}
              </td>

              <td>
                {{ materia.semestre }}
              </td>

              <td>
                {{ materia.carrera }}
              </td>

              <td>
                {{ materia.docente || "Sin asignar" }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="
                    materia.estado
                      ? 'bg-gradient-success'
                      : 'bg-gradient-danger'
                  "
                >

                  {{
                    materia.estado
                      ? 'Activo'
                      : 'Inactivo'
                  }}

                </span>

              </td>

              <td class="text-center">

                <router-link
                  :to="`/admin/materias/${materia.id_materia}/edit`"
                  class="btn btn-sm bg-gradient-warning me-2"
                >
                  Editar
                </router-link>

                <button
                  class="btn btn-sm bg-gradient-danger"
                  @click="
                    cambiarEstado(
                      materia.id_materia
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