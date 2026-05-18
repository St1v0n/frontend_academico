<script setup>
import {
  reactive,
  ref,
  onMounted
} from "vue";

import {
  getEstudiantes
} from "@/services/estudiantes.service";

import {
  getMaterias
} from "@/services/materias.service";

defineProps({
  loading: Boolean
});

const emit = defineEmits([
  "submit"
]);

const estudiantes = ref([]);

const materias = ref([]);

const form = reactive({

  estudiante_id: "",
  materia_id: ""

});

// CARGAR
const loadData = async () => {

  estudiantes.value =
    await getEstudiantes();

  materias.value =
    await getMaterias();

};

const submit = () => {

  emit("submit", { ...form });

};

onMounted(() => {

  loadData();

});
</script>

<template>

<form @submit.prevent="submit">

  <!-- ESTUDIANTE -->
  <div class="mb-3">

    <label class="form-label">
      Estudiante
    </label>

    <select
      v-model="form.estudiante_id"
      class="form-select"
      required
    >

      <option value="">
        Seleccionar estudiante
      </option>

      <option
        v-for="estudiante in estudiantes"
        :key="estudiante.id_usuario"
        :value="estudiante.id_usuario"
      >

        {{
          estudiante.nombres
        }}

        {{
          estudiante.apellidos
        }}

      </option>

    </select>

  </div>

  <!-- MATERIA -->
  <div class="mb-3">

    <label class="form-label">
      Materia
    </label>

    <select
      v-model="form.materia_id"
      class="form-select"
      required
    >

      <option value="">
        Seleccionar materia
      </option>

      <option
        v-for="materia in materias"
        :key="materia.id_materia"
        :value="materia.id_materia"
      >

        {{
          materia.sigla
        }}

        -

        {{
          materia.nombre
        }}

      </option>

    </select>

  </div>

  <button
    class="btn bg-gradient-primary"
    :disabled="loading"
  >

    <span v-if="loading">
      Inscribiendo...
    </span>

    <span v-else>
      Inscribir
    </span>

  </button>

</form>

</template>