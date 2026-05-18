<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import Configurator from "@/examples/Configurator.vue";

const store = useStore();
const route = useRoute();

// Props del layout
const isNavFixed = computed(() => store.state.isNavFixed);
const darkMode = computed(() => store.state.darkMode);
const isAbsolute = computed(() => store.state.isAbsolute);
const showSidenav = computed(() => store.state.showSidenav);
const showNavbar = computed(() => store.state.showNavbar);
const showFooter = computed(() => store.state.showFooter);
const showConfig = computed(() => store.state.showConfig);
const hideConfigButton = computed(() => store.state.hideConfigButton);
const toggleConfigurator = () => store.commit("toggleConfigurator");

const navClasses = computed(() => {
  return {
    "position-sticky bg-white left-auto top-2 z-index-sticky":
      isNavFixed.value && !darkMode.value,
    "position-sticky bg-default left-auto top-2 z-index-sticky":
      isNavFixed.value && darkMode.value,
    "position-absolute px-4 mx-0 w-100 z-index-2": isAbsolute.value,
    "px-0 mx-4": !isAbsolute.value,
  };
});

// Verificamos si la ruta es "presentacion"
const noLayout = computed(() => route.meta.layout === "none");
</script>

<template>
  <!-- 🔹 Ruta Presentación: pantalla completa -->
  <router-view v-if="noLayout" />

  <!-- 🔹 Otras rutas: layout normal con sidenav -->
  <template v-else>
    <div class="g-sidenav-show bg-gray-100">
      <sidenav v-if="showSidenav" />

      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <navbar :class="[navClasses]" v-if="showNavbar" />

        <router-view />

        <app-footer v-show="showFooter" />

        <configurator
          :toggle="toggleConfigurator"
          :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
        />
      </main>
    </div>
  </template>
</template>
