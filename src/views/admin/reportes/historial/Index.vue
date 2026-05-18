<script setup>

import { ref } from "vue";

import {
  getHistorialEstudiante
} from "@/services/reportes.service";

const estudianteId = ref("");

const historial = ref([]);

const loading = ref(false);

const searchHistorial = async () => {

  try {

    loading.value = true;

    const response =
      await getHistorialEstudiante(
        estudianteId.value
      );

    historial.value =
      response.data;

  } catch (error) {

    alert(
      error.response.data.message
    );

  } finally {

    loading.value = false;

  }

};

const getBadge = (resultado) => {

  if (resultado === "APROBADO") {
    return "bg-success";
  }

  if (resultado === "REPROBADO") {
    return "bg-danger";
  }

  return "bg-warning";

};

</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Historial Académico
      </h5>

    </div>

    <div class="card-body">

      <div class="row">

        <div class="col-md-4">

          <input
            v-model="estudianteId"
            type="number"
            class="form-control"
            placeholder="ID Estudiante"
          />

        </div>

        <div class="col-md-2">

          <button
            class="btn bg-gradient-primary w-100"
            @click="searchHistorial"
            :disabled="loading"
          >

            {{ loading
              ? 'Buscando...'
              : 'Buscar'
            }}

          </button>

        </div>

      </div>

      <div
        class="table-responsive mt-4"
        v-if="historial.length"
      >

        <table class="table">

          <thead>

            <tr>

              <th>Materia</th>
              <th>Sigla</th>
              <th>Semestre</th>
              <th>Nota</th>
              <th>Resultado</th>
              <th>Periodo</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in historial"
              :key="item.sigla"
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
                {{ item.nota_final }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="getBadge(item.resultado)"
                >
                  {{ item.resultado }}
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