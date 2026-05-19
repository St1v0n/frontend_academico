<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const openMenu = ref(null);

const toggleMenu = (menu) => {
  openMenu.value =
    openMenu.value === menu
      ? null
      : menu;
};

const closeAll = () => {
  openMenu.value = null;
};

// LOGOUT
const logoutUser = () => {
  auth.logout(router);
};

// MENUS POR ROL
const menuItems = computed(() => {

  const rol = auth.user?.rol;

  // ADMIN
  if (rol === "SECRETARIA") {

    return [

      {
        title: "Usuarios",
        key: "usuarios",
        icon: "ni ni-single-02",
        items: [
          {
            name: "Listado",
            route: "/admin/usuarios"
          },
          {
            name: "Registrar",
            route: "/admin/usuarios/create"
          }
        ]
      },

      {
        title: "Carreras",
        key: "carreras",
        icon: "ni ni-hat-3",
        items: [
          {
            name: "Listado",
            route: "/admin/carreras"
          },
          {
            name: "Registrar",
            route: "/admin/carreras/create"
          }
        ]
      },

      {
        title: "Materias",
        key: "materias",
        icon: "ni ni-books",
        items: [
          {
            name: "Listado",
            route: "/admin/materias"
          },
          {
            name: "Registrar",
            route: "/admin/materias/create"
          }
        ]
      },

      {
        title: "Inscripciones",
        key: "inscripciones",
        icon: "ni ni-badge",
        items: [
          {
            name: "Nueva inscripción",
            route: "/admin/inscripciones/create"
          },
          {
            name: "Listado",
            route: "/admin/inscripciones"
          }
        ]
      },
      {
        title: "Historial",
        key: "historial",
        icon: "ni ni-archive-2",
        items: [
          {
            name: "Académico",
            route: "/admin/historial"
          }
        ]
      },
      {
        title: "Periodos",
        key: "periodos",
        icon: "ni ni-calendar-grid-58",
        items: [
          {
            name: "Académicos",
            route: "/admin/periodos"
          }
        ]
      },
      {
        title: "Prerrequisitos",
        key: "prerrequisitos",
        icon: "ni ni-check-bold",
        items: [
          {
            name: "Gestión",
            route: "/admin/prerrequisitos"
          }
        ]
      },

      {
        title: "Notas",
        key: "notas",
        icon: "ni ni-paper-diploma",
        items: [
          {
            name: "Registrar notas",
            route: "/docente/notas"
          }
        ]
      },

      {
        title: "Reportes",
        key: "reportes",
        icon: "ni ni-chart-bar-32",
        items: [
          /* {
            name: "Académicos",
            route: "/admin/reportes"
          }, */
          {
            name: "Historial",
            route: "/admin/reportes/historial"
          },

          {
            name: "Por materia",
            route: "/admin/reportes/materia"
          },

          {
            name: "Por carrera",
            route: "/admin/reportes/carrera"
          },

          {
            name: "Por periodo",
            route: "/admin/reportes/periodo"
          }
          
        ]
      }


    ];

  }

  // DOCENTE
  if (rol === "Docente") {

    return [

      {
        title: "Notas",
        key: "notas",
        icon: "ni ni-paper-diploma",
        items: [
          {
            name: "Mis notas",
            route: "/docente/notas"
          }
        ]
      }

    ];

  }

  return [];

});
</script>

<template>

<li class="nav-item">

  <!-- DASHBOARD -->
  <router-link
    to="/dashboard"
    class="nav-link text-dark"
  >
    <div
      class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
    >
      <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
    </div>

    <span class="nav-link-text ms-1">
      Dashboard
    </span>
  </router-link>

  <!-- MENUS -->
  <div
    v-for="menu in menuItems"
    :key="menu.key"
    class="nav-item"
  >

    <!-- TITULO -->
    <a
      href="#"
      class="nav-link text-dark d-flex justify-content-between align-items-center"
      @click.prevent="toggleMenu(menu.key)"
    >

      <div class="d-flex align-items-center">

        <div
          class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
        >
          <i
            :class="menu.icon"
            class="text-primary text-sm opacity-10"
          ></i>
        </div>

        <span class="nav-link-text ms-1">
          {{ menu.title }}
        </span>

      </div>

      <i
        class="ni"
        :class="
          openMenu === menu.key
            ? 'ni-bold-up'
            : 'ni-bold-down'
        "
      ></i>

    </a>

    <!-- SUBMENU -->
    <div
      v-show="openMenu === menu.key"
      class="ms-4"
    >

      <router-link
        v-for="item in menu.items"
        :key="item.route"
        :to="item.route"
        class="nav-link text-sm"
        @click="closeAll"
      >

        <span class="sidenav-mini-icon">
          •
        </span>

        <span class="sidenav-normal">
          {{ item.name }}
        </span>

      </router-link>

    </div>

  </div>

  <!-- USUARIO -->
  <div class="mt-4 px-3">

    <div
      class="card card-body border shadow-sm"
    >

      <div class="d-flex align-items-center">

        <div
          class="avatar avatar-sm bg-gradient-primary me-3"
        >
          <span class="text-white fw-bold">
            {{ auth.user?.nombres?.charAt(0) }}
          </span>
        </div>

        <div>

          <h6 class="mb-0 text-sm">
            {{ auth.user?.nombres }}
          </h6>

          <p class="text-xs text-secondary mb-0">
            {{ auth.user?.rol }}
          </p>

        </div>

      </div>

      <button
        class="btn btn-outline-danger btn-sm mt-3"
        @click="logoutUser"
      >
        Cerrar sesión
      </button>

    </div>

  </div>

</li>

</template>

<style scoped>

.nav-link {
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(94, 114, 228, 0.08);
}

</style>