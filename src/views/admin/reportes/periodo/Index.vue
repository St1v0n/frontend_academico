<script setup>
import { ref, onMounted } from "vue";

import {
  getPeriodos
} from "@/services/periodos.service";

import {
  getReportePeriodo
} from "@/services/reportes.service";

const periodos = ref([]);
const periodoId = ref("");

const reporte = ref([]);

const loadPeriodos = async () => {

  const response =
    await getPeriodos();

  periodos.value =
    response.data;

};

const generarReporte = async () => {

  if (!periodoId.value) return;

  const response =
    await getReportePeriodo(
      periodoId.value
    );

  reporte.value =
    response.data;

};

onMounted(() => {

  loadPeriodos();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header">

      <h5>
        Reporte por Periodo
      </h5>

    </div>

    <div class="card-body">

      <div class="row">

        <div class="col-md-6">

          <label>
            Periodo
          </label>

          <select
            v-model="periodoId"
            class="form-control"
          >

            <option value="">
              Seleccione
            </option>

            <option
              v-for="p in periodos"
              :key="p.id_periodo"
              :value="p.id_periodo"
            >
              {{ p.gestion }}/{{ p.periodo }}
            </option>

          </select>

        </div>

        <div class="col-md-3 d-flex align-items-end">

          <button
            class="btn bg-gradient-primary"
            @click="generarReporte"
          >
            Generar
          </button>

        </div>

      </div>

      <div
        v-if="reporte.length"
        class="table-responsive mt-4"
      >

        <table class="table">

          <thead>

            <tr>

              <th>Carrera</th>
              <th>Materia</th>
              <th>Estudiante</th>
              <th>Nota</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in reporte"
              :key="item.estudiante"
            >

              <td>
                {{ item.carrera }}
              </td>

              <td>
                {{ item.materia }}
              </td>

              <td>
                {{ item.estudiante }}
              </td>

              <td>
                {{ item.nota_final }}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>

</template>