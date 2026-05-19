<script setup>
import {
  ref,
  onMounted
} from "vue";

import {
  getMateriasDisponibles,
  createInscripcion
} from "@/services/inscripciones.service";

const materias = ref([]);

const loading = ref(false);

const loadMaterias = async () => {

  try {

    loading.value = true;

    const response =
      await getMateriasDisponibles();

    materias.value =
      response.data;

  } catch (error) {

    console.log(error);

  } finally {

    loading.value = false;

  }

};

const inscribirse = async (
  materiaId
) => {

  try {

    await createInscripcion({
      materia_id: materiaId
    });

    alert(
      "Inscripción realizada correctamente"
    );

    loadMaterias();

  } catch (error) {

    alert(
      error.response.data.message
    );

  }

};

onMounted(() => {

  loadMaterias();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="card">

    <div class="card-header pb-0">

      <h5>
        Programación Académica
      </h5>

    </div>

    <div class="card-body">

      <!-- LOADING -->

      <div
        v-if="loading"
        class="text-center py-4"
      >

        Cargando...

      </div>

      <!-- TABLA -->

      <div
        v-else
        class="table-responsive"
      >

        <table class="table align-items-center">

          <thead>

            <tr>

              <th>Materia</th>
              <th>Sigla</th>
              <th>Semestre</th>
              <th>Estado</th>
              <th>Acción</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="m in materias"
              :key="m.id_materia"
            >

              <td>
                {{ m.nombre }}
              </td>

              <td>
                {{ m.sigla }}
              </td>

              <td>
                {{ m.semestre }}
              </td>

              <!-- ESTADO -->

              <td>

                <!-- APROBADA -->

                <span
                  v-if="
                    m.estado ===
                    'APROBADA'
                  "
                  class="badge bg-gradient-success"
                >

                  APROBADA

                </span>

                <!-- DISPONIBLE -->

                <span
                  v-else-if="
                    m.estado ===
                    'DISPONIBLE'
                  "
                  class="badge bg-gradient-info"
                >

                  DISPONIBLE

                </span>

                <!-- BLOQUEADA -->

                <span
                  v-else
                  class="badge bg-gradient-danger"
                >

                  BLOQUEADA

                </span>

              </td>

              <!-- BOTON -->

              <td>

                <button
                  v-if="
                    m.estado ===
                    'DISPONIBLE'
                  "
                  class="btn bg-gradient-primary btn-sm mb-0"
                  @click="
                    inscribirse(
                      m.id_materia
                    )
                  "
                >

                  Inscribirse

                </button>

                <span
                  v-else-if="
                    m.estado ===
                    'APROBADA'
                  "
                  class="text-success"
                >

                  Ya aprobada

                </span>

                <span
                  v-else
                  class="text-danger"
                >

                  Prerrequisitos pendientes

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