<script setup>
import {
  ref
} from "vue";

import {
  getHistorial
} from "@/services/historial.service";

const estudianteId = ref("");

const historial = ref([]);

const loading = ref(false);

// BUSCAR
const buscarHistorial =
  async () => {

    try {

      loading.value = true;

      historial.value =
        await getHistorial(
          estudianteId.value
        );

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    } finally {

      loading.value = false;

    }

  };

// PROMEDIO
const promedio = () => {

  const notas =
    historial.value.filter(
      h => h.nota_final !== null
    );

  if (!notas.length) {
    return 0;
  }

  const total =
    notas.reduce(
      (acc, item) =>
        acc + item.nota_final,
      0
    );

  return (
    total / notas.length
  ).toFixed(2);

};
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="mb-4">

    <h4>
      Historial Académico
    </h4>

    <p class="text-sm text-secondary">
      Kardex universitario
    </p>

  </div>

  <!-- BUSCADOR -->
  <div class="card mb-4">

    <div class="card-body">

      <div class="row">

        <div class="col-md-4">

          <input
            v-model="estudianteId"
            type="number"
            class="form-control"
            placeholder="ID estudiante"
          />

        </div>

        <div class="col-md-2">

          <button
            class="btn bg-gradient-primary w-100"
            @click="buscarHistorial"
          >

            Buscar

          </button>

        </div>

      </div>

    </div>

  </div>

  <!-- PROMEDIO -->
  <div
    v-if="historial.length"
    class="card mb-4"
  >

    <div class="card-body">

      <h5>

        Promedio General:

        <span class="text-primary">

          {{ promedio() }}

        </span>

      </h5>

    </div>

  </div>

  <!-- TABLA -->
  <div class="card">

    <div class="card-body">

      <div
        v-if="loading"
        class="text-center py-5"
      >

        <div
          class="spinner-border text-primary"
        ></div>

      </div>

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

                {{ item.sigla }}

              </td>

              <td>

                {{ item.materia }}

              </td>

              <td>

                {{ item.semestre }}

              </td>

              <td>

                {{
                  item.gestion
                }}

                /

                {{
                  item.periodo
                }}

              </td>

              <td>

                {{
                  item.nota_final ??
                  "-"
                }}

              </td>

              <td>

                <span
                  class="badge"
                  :class="{

                    'bg-gradient-success':
                    item.estado_academico
                    === 'APROBADO',

                    'bg-gradient-danger':
                    item.estado_academico
                    === 'REPROBADO',

                    'bg-gradient-warning':
                    item.estado_academico
                    === 'PENDIENTE'

                  }"
                >

                  {{
                    item.estado_academico
                  }}

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