<script setup>
import {
  ref,
  onMounted
} from "vue";

import {

  getPeriodos,
  createPeriodo,
  activatePeriodo

} from "@/services/periodos.service";

import PeriodoForm
from "./components/PeriodoForm.vue";

const periodos = ref([]);

const loading = ref(false);

// CARGAR
const loadPeriodos =
  async () => {

    try {

      loading.value = true;

      periodos.value =
        await getPeriodos();

    } catch (error) {

      console.error(error);

    } finally {

      loading.value = false;

    }

  };

// CREAR
const savePeriodo =
  async (form) => {

    try {

      await createPeriodo(form);

      await loadPeriodos();

      alert(
        "Periodo creado correctamente"
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

// ACTIVAR
const activar =
  async (id) => {

    try {

      await activatePeriodo(id);

      await loadPeriodos();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

onMounted(() => {

  loadPeriodos();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="mb-4">

    <h4>
      Periodos Académicos
    </h4>

  </div>

  <!-- FORM -->
  <div class="card mb-4">

    <div class="card-body">

      <PeriodoForm
        @submit="savePeriodo"
      />

    </div>

  </div>

  <!-- TABLA -->
  <div class="card">

    <div class="card-body">

      <div
        class="table-responsive"
      >

        <table class="table">

          <thead>

            <tr>

              <th>Gestión</th>
              <th>Periodo</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in periodos"
              :key="item.id_periodo"
            >

              <td>
                {{ item.gestion }}
              </td>

              <td>
                {{ item.periodo }}
              </td>

              <td>
                {{ item.fecha_inicio }}
              </td>

              <td>
                {{ item.fecha_fin }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="
                    item.activo
                      ? 'bg-gradient-success'
                      : 'bg-gradient-secondary'
                  "
                >

                  {{
                    item.activo
                      ? "ACTIVO"
                      : "INACTIVO"
                  }}

                </span>

              </td>

              <td>

                <button
                  v-if="!item.activo"
                  class="btn btn-sm bg-gradient-primary"
                  @click="
                    activar(
                      item.id_periodo
                    )
                  "
                >

                  Activar

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