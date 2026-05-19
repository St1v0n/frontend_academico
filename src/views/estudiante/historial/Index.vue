<script setup>
import { ref, onMounted, computed } from "vue";

import { useAuthStore } from "@/store/auth";

import {
  getHistorial
} from "@/services/inscripciones.service";

const auth = useAuthStore();

const historial = ref([]);

const loading = ref(false);

// CARGAR HISTORIAL
const loadHistorial = async () => {

  try {

    loading.value = true;

    const response =
      await getHistorial(
        auth.user.id
      );

    historial.value = response || [];

  } catch (error) {

    console.log(error);

    historial.value = [];

  } finally {

    loading.value = false;

  }

};

// RESUMEN
const aprobadas = computed(() => {

  return historial.value.filter(
    item =>
      item.estado_academico ===
      "APROBADO"
  ).length;

});

const reprobadas = computed(() => {

  return historial.value.filter(
    item =>
      item.estado_academico ===
      "REPROBADO"
  ).length;

});

const pendientes = computed(() => {

  return historial.value.filter(
    item =>
      item.estado_academico ===
      "PENDIENTE"
  ).length;

});

const promedio = computed(() => {

  const notas =
    historial.value.filter(
      item =>
        item.nota_final !== null
    );

  if (!notas.length) return 0;

  const suma =
    notas.reduce(
      (acc, item) =>
        acc + Number(item.nota_final),
      0
    );

  return (
    suma / notas.length
  ).toFixed(2);

});

onMounted(() => {

  loadHistorial();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- TITULO -->
  <div class="row mb-4">

    <div class="col-12">

      <div class="card">

        <div class="card-body">

          <h4 class="mb-1">
            Mi Historial Académico
          </h4>

          <p class="text-sm text-secondary mb-0">
            Consulta tus materias cursadas,
            notas y estado académico.
          </p>

        </div>

      </div>

    </div>

  </div>

  <!-- RESUMEN -->
  <div class="row mb-4">

    <div class="col-md-3 mb-3">

      <div class="card">

        <div class="card-body">

          <h6 class="text-success">
            Aprobadas
          </h6>

          <h3>
            {{ aprobadas }}
          </h3>

        </div>

      </div>

    </div>

    <div class="col-md-3 mb-3">

      <div class="card">

        <div class="card-body">

          <h6 class="text-danger">
            Reprobadas
          </h6>

          <h3>
            {{ reprobadas }}
          </h3>

        </div>

      </div>

    </div>

    <div class="col-md-3 mb-3">

      <div class="card">

        <div class="card-body">

          <h6 class="text-warning">
            Pendientes
          </h6>

          <h3>
            {{ pendientes }}
          </h3>

        </div>

      </div>

    </div>

    <div class="col-md-3 mb-3">

      <div class="card">

        <div class="card-body">

          <h6 class="text-primary">
            Promedio
          </h6>

          <h3>
            {{ promedio }}
          </h3>

        </div>

      </div>

    </div>

  </div>

  <!-- TABLA -->
  <div class="row">

    <div class="col-12">

      <div class="card">

        <div class="card-header pb-0">

          <h5>
            Historial de Materias
          </h5>

        </div>

        <div class="card-body px-0 pt-0 pb-2">

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
            v-else-if="historial.length"
            class="table-responsive"
          >

            <table
              class="table align-items-center mb-0"
            >

              <thead>

                <tr>

                  <th>Materia</th>
                  <th>Sigla</th>
                  <th>Semestre</th>
                  <th>Gestión</th>
                  <th>Periodo</th>
                  <th>Nota</th>
                  <th>Estado</th>

                </tr>

              </thead>

              <tbody>

                <tr
                  v-for="item in historial"
                  :key="item.id_inscripcion"
                >

                  <td>
                    {{ item.materia }}
                  </td>

                  <td>
                    {{ item.sigla }}
                  </td>

                  <td>
                    {{ item.semestre }}
                  </td>

                  <td>
                    {{ item.gestion }}
                  </td>

                  <td>
                    {{ item.periodo }}
                  </td>

                  <td>

                    <span
                      v-if="
                        item.nota_final !== null
                      "
                    >
                      {{ item.nota_final }}
                    </span>

                    <span
                      v-else
                      class="text-secondary"
                    >
                      Sin nota
                    </span>

                  </td>

                  <td>

                    <span
                      v-if="
                        item.estado_academico ===
                        'APROBADO'
                      "
                      class="badge bg-success"
                    >
                      APROBADO
                    </span>

                    <span
                      v-else-if="
                        item.estado_academico ===
                        'REPROBADO'
                      "
                      class="badge bg-danger"
                    >
                      REPROBADO
                    </span>

                    <span
                      v-else
                      class="badge bg-warning"
                    >
                      PENDIENTE
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <!-- VACIO -->
          <div
            v-else
            class="text-center py-5"
          >

            <h6 class="text-secondary">
              No tienes historial académico
            </h6>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

</template>