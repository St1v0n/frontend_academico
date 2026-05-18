<script setup>
import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  getInscripciones
} from "@/services/inscripciones.service";

const inscripciones = ref([]);

const loading = ref(false);

const search = ref("");

// CARGAR
const loadInscripciones = async () => {

  try {

    loading.value = true;

    inscripciones.value =
      await getInscripciones();

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

// FILTRO
const filteredInscripciones =
  computed(() => {

    return inscripciones.value.filter((i) => {

      const text = `
        ${i.estudiante}
        ${i.materia}
        ${i.sigla}
        ${i.carrera}
        ${i.docente || ""}
      `.toLowerCase();

      return text.includes(
        search.value.toLowerCase()
      );

    });

  });

onMounted(() => {

  loadInscripciones();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="d-flex justify-content-between mb-4">

    <div>

      <h4>
        Inscripciones
      </h4>

      <p class="text-sm text-secondary">
        Gestión académica
      </p>

    </div>

    <router-link
      to="/admin/inscripciones/create"
      class="btn bg-gradient-primary"
    >
      Nueva inscripción
    </router-link>

  </div>

  <!-- BUSCADOR -->
  <div class="col-md-4 mb-3">

    <input
      v-model="search"
      type="text"
      class="form-control"
      placeholder="Buscar inscripción..."
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

        <table class="table align-items-center">

          <thead>

            <tr>

              <th>Estudiante</th>
              <th>Materia</th>
              <th>Carrera</th>
              <th>Docente</th>
              <th>Periodo</th>
              <th>Estado</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in filteredInscripciones"
              :key="item.id_inscripcion"
            >

              <td>

                {{ item.estudiante }}

              </td>

              <td>

                <div>

                  <span
                    class="badge bg-gradient-info me-2"
                  >

                    {{ item.sigla }}

                  </span>

                  {{ item.materia }}

                </div>

              </td>

              <td>

                {{ item.carrera }}

              </td>

              <td>

                {{
                  item.docente ||
                  "Sin docente"
                }}

              </td>

              <td>

                <span
                  class="badge bg-gradient-dark"
                >

                  {{
                    item.gestion
                  }}

                  /

                  {{
                    item.periodo
                  }}

                </span>

              </td>

              <td>

                <span
                  class="badge bg-gradient-success"
                >

                  Activo

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

</template>