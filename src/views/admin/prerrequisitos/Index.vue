<script setup>
import {
  ref,
  onMounted
} from "vue";

import {

  getPrerrequisitos,
  createPrerrequisito,
  deletePrerrequisito

} from "@/services/prerrequisitos.service";

import {
  getMaterias
} from "@/services/materias.service";

const prerrequisitos =
  ref([]);

const materias =
  ref([]);

const form = ref({

  materia_id: "",
  materia_prerrequisito_id: ""

});

// CARGAR
const loadData =
  async () => {

    prerrequisitos.value =
      await getPrerrequisitos();

    materias.value =
      await getMaterias();

  };

// CREAR
const save =
  async () => {

    try {

      await createPrerrequisito(
        form.value
      );

      form.value = {

        materia_id: "",
        materia_prerrequisito_id: ""

      };

      await loadData();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

// ELIMINAR
const remove =
  async (id) => {

    if (
      !confirm(
        "¿Eliminar prerrequisito?"
      )
    ) {
      return;
    }

    await deletePrerrequisito(id);

    await loadData();

  };

onMounted(() => {

  loadData();

});
</script>

<template>

<div class="container-fluid py-4">

  <div class="mb-4">

    <h4>
      Prerrequisitos
    </h4>

  </div>

  <!-- FORM -->
  <div class="card mb-4">

    <div class="card-body">

      <div class="row">

        <div class="col-md-5">

          <label>
            Materia
          </label>

          <select
            v-model="form.materia_id"
            class="form-control"
          >

            <option value="">
              Seleccionar
            </option>

            <option
              v-for="m in materias"
              :key="m.id_materia"
              :value="m.id_materia"
            >

              {{
                m.sigla
              }}

              -

              {{
                m.nombre
              }}

            </option>

          </select>

        </div>

        <div class="col-md-5">

          <label>
            Prerrequisito
          </label>

          <select
            v-model="
              form.materia_prerrequisito_id
            "
            class="form-control"
          >

            <option value="">
              Seleccionar
            </option>

            <option
              v-for="m in materias"
              :key="m.id_materia"
              :value="m.id_materia"
            >

              {{
                m.sigla
              }}

              -

              {{
                m.nombre
              }}

            </option>

          </select>

        </div>

        <div
          class="col-md-2 d-flex align-items-end"
        >

          <button
            class="btn bg-gradient-primary w-100"
            @click="save"
          >

            Guardar

          </button>

        </div>

      </div>

    </div>

  </div>

  <!-- TABLA -->
  <div class="card">

    <div class="card-body">

      <div class="table-responsive">

        <table class="table">

          <thead>

            <tr>

              <th>Materia</th>
              <th>Prerrequisito</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="item in prerrequisitos"
              :key="item.id_prerrequisito"
            >

              <td>

                <span
                  class="badge bg-gradient-info me-2"
                >

                  {{ item.sigla }}

                </span>

                {{ item.materia }}

              </td>

              <td>

                <span
                  class="badge bg-gradient-warning me-2"
                >

                  {{
                    item.prerrequisito_sigla
                  }}

                </span>

                {{
                  item.prerrequisito
                }}

              </td>

              <td>

                <button
                  class="btn btn-sm btn-danger"
                  @click="
                    remove(
                      item.id_prerrequisito
                    )
                  "
                >

                  Eliminar

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