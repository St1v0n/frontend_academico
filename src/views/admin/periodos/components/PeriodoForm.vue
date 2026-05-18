<script setup>
import {
  reactive,
  watch
} from "vue";

const props =
  defineProps({

    form: Object,
    editing: Boolean

  });

const emit =
  defineEmits([
    "submit"
  ]);

const localForm =
  reactive({

    gestion: "",
    periodo: "",
    fecha_inicio: "",
    fecha_fin: "",
    activo: false

  });

// EDITAR
watch(
  () => props.form,
  (value) => {

    if (value) {

      Object.assign(
        localForm,
        value
      );

    }

  },
  {
    immediate: true
  }
);

const submitForm =
  () => {

    emit(
      "submit",
      localForm
    );

  };
</script>

<template>

<form @submit.prevent="submitForm">

  <div class="row">

    <div class="col-md-6 mb-3">

      <label>
        Gestión
      </label>

      <input
        v-model="localForm.gestion"
        type="number"
        class="form-control"
        required
      />

    </div>

    <div class="col-md-6 mb-3">

      <label>
        Periodo
      </label>

      <select
        v-model="localForm.periodo"
        class="form-control"
        required
      >

        <option value="1">
          1
        </option>

        <option value="2">
          2
        </option>

      </select>

    </div>

    <div class="col-md-6 mb-3">

      <label>
        Fecha inicio
      </label>

      <input
        v-model="localForm.fecha_inicio"
        type="date"
        class="form-control"
        required
      />

    </div>

    <div class="col-md-6 mb-3">

      <label>
        Fecha fin
      </label>

      <input
        v-model="localForm.fecha_fin"
        type="date"
        class="form-control"
        required
      />

    </div>

    <div class="col-12 mb-3">

      <div class="form-check">

        <input
          v-model="localForm.activo"
          type="checkbox"
          class="form-check-input"
        />

        <label class="form-check-label">
          Activar periodo
        </label>

      </div>

    </div>

  </div>

  <button
    class="btn bg-gradient-primary"
  >

    {{
      editing
        ? "Actualizar"
        : "Registrar"
    }}

  </button>

</form>

</template>