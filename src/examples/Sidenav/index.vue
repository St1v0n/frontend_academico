<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import SidenavList from "./SidenavList.vue";

import logo from "@/assets/img/LOGO.png";

const store = useStore();

const isRTL = computed(() => store.state.isRTL);

const layout = computed(() => store.state.layout);

const sidebarType = computed(() => store.state.sidebarType);

const darkMode = computed(() => store.state.darkMode);
</script>

<template>

<aside
  v-show="layout === 'default'"
  class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
  :class="[
    sidebarType,
    isRTL ? 'me-3 rotate-caret' : 'ms-3'
  ]"
  id="sidenav-main"
>

  <!-- LOGO -->
  <div class="sidenav-header">

    <router-link
      class="navbar-brand m-0 d-flex align-items-center"
      to="/admin/dashboard"
    >

      <img
        :src="logo"
        class="navbar-brand-img h-100"
        alt="main_logo"
      />

      <span
        class="ms-2 font-weight-bold"
        :class="darkMode ? 'text-white' : 'text-dark'"
      >
        Sistema Académico
      </span>

    </router-link>

  </div>

  <hr class="horizontal dark mt-0" />

  <!-- MENU -->
  <div
    class="collapse navbar-collapse w-auto h-auto"
    id="sidenav-collapse-main"
  >

    <ul class="navbar-nav">

      <SidenavList />

    </ul>

  </div>

</aside>

</template>