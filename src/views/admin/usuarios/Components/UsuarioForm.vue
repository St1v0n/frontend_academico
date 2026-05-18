<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  modelValue: Object,
  loading: Boolean
});

const emit = defineEmits([
  "submit"
]);

const form = reactive({

  nombres: "",
  apellidos: "",
  ci: "",
  correo: "",
  rol_id: ""

});

// CARGAR DATOS EDIT
watch(() => props.modelValue, (value) => {

  if (value) {

    Object.assign(form, value);

  }

}, {
  immediate: true
});

const submit = () => {

  emit("submit", { ...form });

};
</script>

<template>

<form @submit.prevent="submit">

  <div class="row">

    <!-- NOMBRES -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Nombres
      </label>

      <input
        v-model="form.nombres"
        type="text"
        class="form-control"
        required
      />

    </div>

    <!-- APELLIDOS -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Apellidos
      </label>

      <input
        v-model="form.apellidos"
        type="text"
        class="form-control"
        required
      />

    </div>

    <!-- CI -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        CI
      </label>

      <input
        v-model="form.ci"
        type="text"
        class="form-control"
        required
      />

    </div>

    <!-- CORREO -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Correo
      </label>

      <input
        v-model="form.correo"
        type="email"
        class="form-control"
        required
      />

    </div>

    <!-- ROL -->
    <div class="col-12 mb-3">

      <label class="form-label">
        Rol
      </label>

      <select
        v-model="form.rol_id"
        class="form-select"
        required
      >

        <option value="">
          Seleccionar rol
        </option>

        <option value="1">
          SECRETARIA
        </option>

        <option value="2">
          DOCENTE
        </option>

        <option value="3">
          ESTUDIANTE
        </option>

      </select>

    </div>

  </div>

  <!-- BOTON -->
  <button
    class="btn bg-gradient-primary"
    :disabled="loading"
  >

    <span v-if="loading">
      Guardando...
    </span>

    <span v-else>
      Guardar
    </span>

  </button>

</form>

</template>