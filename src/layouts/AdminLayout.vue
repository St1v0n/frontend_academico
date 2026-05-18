<script setup>
/* import SidenavList from "@/examples/Sidenav/SidenavList.vue"; */
</script>

<template>

<div class="g-sidenav-show bg-gray-100">

  <!-- SIDEBAR -->

  <!-- CONTENIDO -->
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">

    <!-- NAVBAR TOP -->
    <nav
      class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    >

      <div class="container-fluid py-1 px-3">

        <h6 class="font-weight-bolder mb-0">
          Dashboard
        </h6>

      </div>

    </nav>

    <!-- ROUTER VIEW -->
    <div class="container-fluid py-4">

      <router-view />

    </div>

  </main>

</div>

</template>