<script setup>

import { ref, computed } from "vue";

import {
  getReporteMateria
} from "@/services/reportes.service";

const search = ref("");

const reportes = ref([]);

const loading = ref(false);

// BUSCAR

const searchReporte = async () => {

  try {

    loading.value = true;

    const response =
      await getReporteMateria(
        search.value
      );

    reportes.value =
      response.data;

  } catch (error) {

    alert(
      error.response.data.message
    );

    reportes.value = [];

  } finally {

    loading.value = false;

  }

};

// PROMEDIO

const promedio = computed(() => {

  if (!reportes.value.length) {
    return 0;
  }

  const total =
    reportes.value.reduce(
      (acc, item) =>
        acc + (item.nota_final || 0),
      0
    );

  return (
    total / reportes.value.length
  ).toFixed(2);

});

// APROBADOS

const aprobados = computed(() => {

  return reportes.value.filter(
    item => item.nota_final >= 51
  ).length;

});

// REPROBADOS

const reprobados = computed(() => {

  return reportes.value.filter(
    item => item.nota_final < 51
  ).length;

});

// BADGE

const getBadge = (nota) => {

  if (nota >= 51) {
    return "bg-success";
  }

  return "bg-danger";

};

</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Reporte por Materia
      </h5>

    </div>

    <div class="card-body">

      <!-- FILTRO -->

      <div class="row">

        <div class="col-md-4">

          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Buscar materia por nombre o ID"
          />

        </div>

        <div class="col-md-2">

          <button
            class="btn bg-gradient-primary w-100"
            @click="searchReporte"
            :disabled="loading"
          >

            {{ loading
              ? "Buscando..."
              : "Buscar"
            }}

          </button>

        </div>

      </div>

      <!-- ESTADISTICAS -->

      <div
        class="row mt-4"
        v-if="reportes.length"
      >

        <div class="col-md-3">

          <div class="card bg-gradient-primary">

            <div class="card-body">

              <h6 class="text-white">
                Inscritos
              </h6>

              <h3 class="text-white">
                {{ reportes.length }}
              </h3>

            </div>

          </div>

        </div>

        <div class="col-md-3">

          <div class="card bg-gradient-success">

            <div class="card-body">

              <h6 class="text-white">
                Aprobados
              </h6>

              <h3 class="text-white">
                {{ aprobados }}
              </h3>

            </div>

          </div>

        </div>

        <div class="col-md-3">

          <div class="card bg-gradient-danger">

            <div class="card-body">

              <h6 class="text-white">
                Reprobados
              </h6>

              <h3 class="text-white">
                {{ reprobados }}
              </h3>

            </div>

          </div>

        </div>

        <div class="col-md-3">

          <div class="card bg-gradient-dark">

            <div class="card-body">

              <h6 class="text-white">
                Promedio
              </h6>

              <h3 class="text-white">
                {{ promedio }}
              </h3>

            </div>

          </div>

        </div>

      </div>

      <!-- TABLA -->

      <div
        class="table-responsive mt-4"
        v-if="reportes.length"
      >

        <table class="table align-items-center">

          <thead>

            <tr>

              <th>Estudiante</th>
              <th>Correo</th>
              <th>Nota</th>
              <th>Estado</th>
              <th>Periodo</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in reportes"
              :key="item.correo"
            >

              <td>
                {{ item.estudiante }}
              </td>

              <td>
                {{ item.correo }}
              </td>

              <td>
                {{ item.nota_final }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="
                    getBadge(item.nota_final)
                  "
                >

                  {{
                    item.nota_final >= 51
                      ? "APROBADO"
                      : "REPROBADO"
                  }}

                </span>

              </td>

              <td>

                {{ item.gestion }}
                /
                {{ item.periodo }}

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

</template>