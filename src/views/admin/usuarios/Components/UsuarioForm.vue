<script setup>
import {
  reactive,
  watch,
  ref,
  computed,
  onMounted
} from "vue";

import {
  getCarreras
} from "@/services/carreras.service";

const props = defineProps({
  modelValue: Object,
  loading: Boolean
});

const emit = defineEmits([
  "submit"
]);

const carreras = ref([]);

// FORM
const form = reactive({

  nombres: "",
  apellidos: "",
  ci: "",
  correo: "",
  rol_id: "",
  carrera_id: ""

});

// CARGAR CARRERAS
const loadCarreras = async () => {

  try {

    const response =
      await getCarreras();

    carreras.value = response;

  } catch (error) {

    console.log(error);

  }

};

// VALIDAR SI ES ESTUDIANTE
const isEstudiante = computed(() => {

  return Number(form.rol_id) === 2;

});

// CARGAR DATOS EDIT
watch(() => props.modelValue, (value) => {

  if (value) {

    Object.assign(form, value);

  }

}, {
  immediate: true
});

// LIMPIAR CARRERA SI NO ES ESTUDIANTE
watch(() => form.rol_id, (value) => {

  if (Number(value) !== 2) {

    form.carrera_id = "";

  }

});

// SUBMIT
const submit = () => {

  emit("submit", {
    ...form,
    rol_id: Number(form.rol_id),
    carrera_id:
      form.carrera_id
        ? Number(form.carrera_id)
        : null
  });

};

onMounted(() => {

  loadCarreras();

});
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
    <div class="col-md-6 mb-3">

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
          ESTUDIANTE
        </option>

        <option value="3">
          DOCENTE
        </option>

      </select>

    </div>

    <!-- CARRERA -->
    <div
      v-if="isEstudiante"
      class="col-md-6 mb-3"
    >

      <label class="form-label">
        Carrera
      </label>

      <select
        v-model.number="form.carrera_id"
        class="form-select"
        required
      >

        <option value="">
          Seleccionar carrera
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