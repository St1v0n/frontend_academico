<script setup>
import {
  reactive,
  watch,
  ref,
  onMounted
} from "vue";

import {
  getCarreras
} from "@/services/carreras.service";

import {
  getDocentes
} from "@/services/docentes.service";

const props = defineProps({
  modelValue: Object,
  loading: Boolean
});

const emit = defineEmits([
  "submit"
]);

const carreras = ref([]);

const docentes = ref([]);

const form = reactive({

  nombre: "",
  sigla: "",
  semestre: "",
  carrera_id: "",
  docente_id: ""

});

// CARGAR DATOS
const loadData = async () => {

  carreras.value =
    await getCarreras();

  docentes.value =
    await getDocentes();

};

// EDIT
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

onMounted(() => {

  loadData();

});
</script>

<template>

<form @submit.prevent="submit">

  <div class="row">

    <!-- NOMBRE -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Nombre
      </label>

      <input
        v-model="form.nombre"
        type="text"
        class="form-control"
        required
      />

    </div>

    <!-- SIGLA -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Sigla
      </label>

      <input
        v-model="form.sigla"
        type="text"
        class="form-control"
        required
      />

    </div>

    <!-- SEMESTRE -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Semestre
      </label>

      <input
        v-model="form.semestre"
        type="number"
        class="form-control"
        required
      />

    </div>

    <!-- CARRERA -->
    <div class="col-md-6 mb-3">

      <label class="form-label">
        Carrera
      </label>

      <select
        v-model="form.carrera_id"
        class="form-select"
        required
      >

        <option value="">
          Seleccionar carrera
        </option>

        <option
          v-for="carrera in carreras"
          :key="carrera.id_carrera"
          :value="carrera.id_carrera"
        >

          {{ carrera.nombre }}

        </option>

      </select>

    </div>

    <!-- DOCENTE -->
    <div class="col-12 mb-3">

      <label class="form-label">
        Docente
      </label>

      <select
        v-model="form.docente_id"
        class="form-select"
      >

        <option value="">
          Sin asignar
        </option>

        <option
          v-for="docente in docentes"
          :key="docente.id_usuario"
          :value="docente.id_usuario"
        >

          {{
            docente.nombres
          }}

          {{
            docente.apellidos
          }}

        </option>

      </select>

    </div>

  </div>

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