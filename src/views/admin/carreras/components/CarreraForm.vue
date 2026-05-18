<script setup>
import {
  reactive,
  watch
} from "vue";

const props = defineProps({
  modelValue: Object,
  loading: Boolean
});

const emit = defineEmits([
  "submit"
]);

const form = reactive({

  nombre: ""

});

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
</script>

<template>

<form @submit.prevent="submit">

  <div class="mb-3">

    <label class="form-label">
      Nombre carrera
    </label>

    <input
      v-model="form.nombre"
      type="text"
      class="form-control"
      required
    />

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