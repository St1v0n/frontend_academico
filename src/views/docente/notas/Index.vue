<script setup>
import {
  ref,
  onMounted
} from "vue";

import {

  getNotasDocente,
  registerNota

} from "@/services/notas.service";

const notas = ref([]);

const loading = ref(false);

// CARGAR
const loadNotas =
  async () => {

    try {

      loading.value = true;

      notas.value =
        await getNotasDocente();

    } catch (error) {

      console.error(error);

    } finally {

      loading.value = false;

    }

  };

// GUARDAR
const guardarNota =
  async (item) => {

    try {

      await registerNota(
        item.id_inscripcion,
        item.nota_final
      );

      alert(
        "Nota registrada correctamente"
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

onMounted(() => {

  loadNotas();

});
</script>

<template>

<div class="container-fluid py-4">

  <!-- HEADER -->
  <div class="mb-4">

    <h4>
      Registro de Notas
    </h4>

    <p class="text-sm text-secondary">
      Gestión académica docente
    </p>

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

        <table class="table align-items-center">

          <thead>

            <tr>

              <th>Estudiante</th>
              <th>Materia</th>
              <th>Periodo</th>
              <th>Nota</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in notas"
              :key="item.id_inscripcion"
            >

              <td>

                {{ item.estudiante }}

              </td>

              <td>

                <span
                  class="badge bg-gradient-info me-2"
                >

                  {{ item.sigla }}

                </span>

                {{ item.materia }}

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

              <td width="150">

                <input
                  v-model="item.nota_final"
                  type="number"
                  min="0"
                  max="100"
                  class="form-control"
                />

              </td>

              <td>

                <button
                  class="btn bg-gradient-primary btn-sm"
                  @click="guardarNota(item)"
                >

                  Guardar

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