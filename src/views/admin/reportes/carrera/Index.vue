<script setup>
import { ref, onMounted } from "vue";

import {
  getCarreras
} from "@/services/carreras.service";

import {
  getReporteCarrera
} from "@/services/reportes.service";

const carreras = ref([]);
const carreraId = ref("");

const reporte = ref([]);
const buscado = ref(false);

const loadCarreras = async () => {

  try {

    const response =
      await getCarreras();

    carreras.value = response;

  } catch (error) {

    console.log(error);

  }

};

const generarReporte = async () => {

  buscado.value = true;

  if (!carreraId.value) return;

  try {

    const response =
      await getReporteCarrera(
        carreraId.value
      );

    reporte.value = response;

  } catch (error) {

    reporte.value = [];

    console.log(error);

  }

};

onMounted(() => {

  loadCarreras();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Reporte por Carrera
      </h5>

    </div>

    <div class="card-body">

      <div class="row">

        <div class="col-md-6">

          <label class="form-label">
            Carrera
          </label>

          <select
            v-model="carreraId"
            class="form-select"
          >

            <option value="">
              Seleccione
            </option>

            <option
              v-for="c in carreras"
              :key="c.id_carrera"
              :value="c.id_carrera"
            >
              {{ c.nombre }}
            </option>

          </select>

        </div>

        <div class="col-md-3 d-flex align-items-end">

          <button
            class="btn bg-gradient-primary w-100"
            @click="generarReporte"
          >
            Generar
          </button>

        </div>

      </div>

      <!-- TABLA -->
      <div
        v-if="reporte && reporte.length"
        class="table-responsive mt-4"
      >

        <table class="table align-items-center mb-0">

          <thead>

            <tr>

              <th>Materia</th>
              <th>Sigla</th>
              <th>Estudiante</th>
              <th>Periodo</th>
              <th>Nota</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in reporte"
              :key="item.estudiante"
            >

              <td>
                {{ item.materia }}
              </td>

              <td>
                {{ item.sigla }}
              </td>

              <td>
                {{ item.estudiante }}
              </td>

              <td>
                {{ item.gestion }}/{{ item.periodo }}
              </td>

              <td>
                {{ item.nota_final }}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <!-- ALERTA -->
      <div
        v-else-if="buscado"
        class="alert alert-warning mt-4"
      >
        No existen inscritos para esta carrera
      </div>

    </div>

  </div>

</div>

</template>